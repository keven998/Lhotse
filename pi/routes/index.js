var express = require('express');
var router = express.Router();
var async = require('async');
var urlApi = require('../url_api');
var plans = require('../model/plans');
var request = require('request')
var model = require('../model/sup_model.js');


router.get('/', function(req, res) {
    async.parallel({
        newRoute: function(callback) {
            model.setUrl(urlApi.apiHost+urlApi.newRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        },
        editorRoute: function(callback) {
            model.setUrl(urlApi.apiHost+urlApi.editorRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        },
        mustgoRoute: function(callback) {
            model.setUrl(urlApi.apiHost+urlApi.mustgoRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        },
        popRoute: function(callback) {
            model.setUrl(urlApi.apiHost+urlApi.popRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        },
    }, 
    function(err, results) {
        results.newRoute = JSON.parse(results.newRoute);
        results.editorRoute = JSON.parse(results.editorRoute);
        results.mustgoRoute = JSON.parse(results.mustgoRoute);
        results.popRoute = JSON.parse(results.popRoute);
        res.render('index', {
            newRoute: results.newRoute.result,
            editorRoute: results.editorRoute.result,
            mustgoRoute: results.mustgoRoute.result,
            popRoute: results.popRoute.result,
            user_info: req.session.user_info,
        });
    });
});

/* 
    router for viewspot
    logic : first, use viewspot name to get viewspot id,
            then, use the id to get the routelist.
    tips : fromLoc should be captured for copying route  

*/
router.get('/route/include/', function(req, res) {
    var fromLocName = req.query.fromName;
    var arrLocName = req.query.arrName;
    var queryFromName = urlApi.searchCityIdByName + decodeURIComponent(fromLocName);
    var queryArrName = urlApi.apiHost + urlApi.searchViewspotIdByName + decodeURIComponent(arrLocName) + "&sort=desc";
    async.parallel({
        from: function(callback) {
            model.setUrl(encodeURI(queryFromName));
            model.getdata(req, function(data){
                data = JSON.parse(data);
                var id = selectCityId(data.result);
                callback(null, id);
            });
        },
        spotId: function(callback) {
            model.setUrl(encodeURI(queryArrName));
            model.getdata(req, function(data){
                data = JSON.parse(data);
                var id = data.result[0]['_id'];
                callback(null, id);
            });
        },
    },
    function(err, results) {
        var fromId = results.from;
        var spotId = results.spotId;
        var indexGoUrl = urlApi.apiHost + urlApi.searchRouteIncludeViewspot + spotId + "&tag=&minDays=0&maxDays=99";
        model.setUrl(encodeURI(indexGoUrl));
        model.getdata(null, function(data){
            data = JSON.parse(data);
            res.render('plans', {
                plans : data.result,
                fromName : fromLocName,
                arriveId : spotId,
                fromId : fromId,  // 用于配置“复制路线”的url
                arriveName : arrLocName,
                user_info: req.session.user_info,
            });
        });
    });
});


//router for city
router.get('/route/city/', function(req, res) {
    var fromLocName = req.query.fromName;
    var arrLocName = req.query.arrName;
    var queryFromName = urlApi.searchCityIdByName + fromLocName;
    var queryArrName = urlApi.searchCityIdByName + arrLocName;
    async.parallel({
        from: function(callback) {
            model.setUrl(encodeURI(queryFromName));
            model.getdata(req, function(data){
                data = JSON.parse(data);
                var id = selectCityId(data.result);
                callback(null, id);
            });
        },
        arrive: function(callback) {
            model.setUrl(encodeURI(queryArrName));
            model.getdata(req, function(data){
                data = JSON.parse(data);
                var id = selectCityId(data.result);
                callback(null, id);
            });
        },
    },
    function(err, results) {
        var fromId = results.from;
        console.log(fromLocName);
        var arriveId = results.arrive;
        var indexGoUrl = urlApi.apiHost + urlApi.getRouteList + "?loc=" + arriveId + "&fromLoc=" + fromId + "&tag=&minDays=0&maxDays=99";
        model.setUrl(encodeURI(indexGoUrl));
        model.getdata(null, function(data){
            data = JSON.parse(data);
            res.render('plans', {
                plans : data.result,
                fromName : fromLocName,
                arriveId : arriveId,
                fromId : fromId,  // 用于配置“复制路线”的url
                arriveName : arrLocName,
                user_info: req.session.user_info,
            });
        });
    });
});


router.get('/download/', function(req, res) {
    res.render('download', {user_info: req.session.user_info});
}); 


router.get('/target/', function(req, res){
    async.parallel({
        hotCities: function(callback) {
            model.setUrl(urlApi.apiHost+urlApi.hotCities);
            model.getdata(req, function(data){
                data = JSON.parse(data);
                callback(null, data);
            });
        },
        hotViews: function(callback) {
            model.setUrl(urlApi.apiHost+urlApi.hotViews);
            model.getdata(req, function(data){
                data = JSON.parse(data);
                callback(null, data);
            });
        },
    },
    function(err, results) {
        var cityList = new Array(),
            viewList = new Array(),
            page_size = 8;

        for (var i = 0; i < page_size; i++){
            var city = results.hotCities.result.loc[i],
                cityName = city.name,
                cityAbbr = cityName;
            if (cityName.substr(6,1) != "")
                cityAbbr = cityName.substr(4)+'...';
            cityList.push({
                id: city._id,
                abbr: cityAbbr,
                name: cityName,
                img: city.imageList[0],
            });
        }
        for (var i = 0; i < page_size; i++){
            var view = results.hotViews.result[i],
                viewName = view.name,
                viewAbbr = viewName;
            if (viewName.substr(6,1) != "")
                viewAbbr = viewName.substr(0,5)+'...';
            viewList.push({
                id: view._id,
                abbr: viewAbbr,
                name: viewName,
                img: view.imageList[0],
            });
        }
        // get fromLoc from cookies
        var fromLoc = req.cookies.fromLoc;
        res.render('target', {
            fromLoc : fromLoc,
            hotCities:  cityList,
            hotViews:   viewList,
            user_info: req.session.user_info,
        });
    });
});

//  联想功能
router.get('/suggestion', function(req, res){
    var tempInput = req.query.input;
    var type = req.query.type;
    var requestUrl = '';
    // 如果未有输入则推送空
    if (tempInput == "") {
        res.json();
    }
    else {
        if(type === "from"){
            requestUrl = suggestionUrl(tempInput, 0, 0, 1, 0);
        }
        // to : vs and loc 
        else {
            requestUrl = suggestionUrl(tempInput, 0, 0, 1, 1);
        }
    }
    model.setUrl(encodeURI(requestUrl));
    model.getdata(null, function(data) {
      var result = JSON.parse(data).result;
      var suggestionArray = new Array();
      for (type in result) {
        var arrData = result[type];
        for (var i = 0; i < arrData.length; i++) {
          var tempName = {type: type, name: arrData[i].name};
          suggestionArray.push(tempName);
        }
      }
      res.json(suggestionArray);
    });
});

/* 
    suggestion switch
    e.x.    suggestionUrl("北", 0, 0, 1, 0)    loc suggsetion ON
            suggestionUrl("北", 0, 0, 1, 1)    loc and vs suggsetion ON

*/
var suggestionUrl = function (input, restaurant, hotel, loc, vs) {
    // set default value, don't give suggestion
    restaurant = restaurant || 0;
    hotel = hotel || 0;
    loc = loc || 0;
    vs = vs || 0;
    input = input || 0;

    var requestUrl = urlApi.apiHost + urlApi.inputSuggestion;
    var querys = {
        restaurant : restaurant,
        hotel : hotel,
        loc : loc,
        vs : vs,
        word : input,
    };

    var queryStr = '';
    for (var query in querys) {
        queryStr += '&' + query + '=' + querys[query];
    }

    return requestUrl + '?' + queryStr;
}


// 输入一个城市名字后，会得到一个列表，level = 1 是省会和level = 2是市
// 通常选取【市】作为出发地
var selectCityId = function(result) {
  var cityId = "";
  for (var i = 0; i < result.length; i++) {
    var tempCity = result[i];
    if (tempCity.level == 2) {
      cityId = tempCity._id;
      break;
    } 
  }
  return cityId;
}

module.exports = router;
