var express = require('express');
var router = express.Router();
var async = require('async');
var urlApi = require('../url_api');
var plans = require('../model/plans');
var request = require('request')
var model = require('../model/sup_model.js');
var left_nav_data = require('../conf/country_nav');
var map_data = require('../conf/map_data');
var config = require('../conf/system');
var zone = require('../conf/zone');
var utils = require( "../common/utils");
var route_filters = require('../conf/route_filters');
var _    = require('underscore');

var Error = [
    'Error fromLoc!',
    'Error arriveLoc!'
];


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
            user_info: utils.get_user_info(req, res),
            config: config
        });
    });
});


router.get('/route', function(req, res) {
    var fromLocName = req.query.fromName;
    /*get locId*/
    var queryFromName = urlApi.apiHost + urlApi.searchCityIdByName + decodeURIComponent(fromLocName);
    if (req.query[zone.type.viewspot] != undefined){
        var poiType = zone.type.viewspot,
            arrLocName = req.query[zone.type.viewspot],
            queryArrName = urlApi.apiHost + urlApi.searchViewspotIdByName + decodeURIComponent(arrLocName) + "&sort=desc";
    }else if (req.query[zone.type.locality] != undefined){
        var poiType = zone.type.locality,
            arrLocName = req.query[zone.type.locality],
            queryArrName = urlApi.apiHost + urlApi.searchCityIdByName + arrLocName;
    }else{
        console.log("No destination!");
    }

    async.parallel({
        from: function(callback) {
            model.setUrl(encodeURI(queryFromName));
            model.getdata(null, function(data){
               callback(null, getIdFromName(data,0));
            });
        },
        arrive: function(callback) {
            model.setUrl(encodeURI(queryArrName));
            model.getdata(null, function(data){
               callback(null, getIdFromName(data,1));
            });
        }
    },
    function(err, results) {
        var fromId = results.from;
        var arriveId = results.arrive;
        var indexGoUrl;
        if(poiType == zone.type.viewspot){
            indexGoUrl = urlApi.apiHost + urlApi.searchRouteIncludeViewspot + arriveId + "&tag=&minDays=0&maxDays=99";
        }else{
            indexGoUrl = urlApi.apiHost + urlApi.getRouteList + "?loc=" + arriveId + "&fromLoc=" + fromId + "&tag=&minDays=0&maxDays=99";
        }
        model.setUrl(encodeURI(indexGoUrl));
        model.getdata(null, function(data){
            data = JSON.parse(data);
            res.render('route', {
                plans: data.result || [],
                fromName: fromLocName,
                arriveId: arriveId,
                fromId: fromId,  // 用于配置“复制路线”的url
                arriveName: arrLocName,
                user_info: utils.get_user_info(req, res),
                config: config,
                route_filters: route_filters
            });
        });
    });
});

router.get('/download/', function(req, res) {
    res.render('download', {user_info: utils.get_user_info(req, res), config: config});
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
            left_nav_data: left_nav_data,
            map_data: map_data,
            user_info: utils.get_user_info(req, res),
            config: config,
            zone : zone,
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
        if(utils.checkApiRequestState(data)){
            console.log(data);
            var result = JSON.parse(data).result;
            var suggestionArray = new Array();
            for (type in result) {
                var arrData = result[type],
                    len = arrData.length;
                for (var i = 0; i < len; i++) {
                    var tempName = {
                        type: type,
                        name: arrData[i].name
                    };
                    suggestionArray.push(tempName);
                }
            }
            res.json(suggestionArray);
        }else{
            console.log("Suggestion return the error or there's no data!");
            res.json(null);
        }
    });
});

/*
    suggestion switch
    e.x.    suggestionUrl("北", 0, 0, 1, 0)    loc suggsetion ON
            suggestionUrl("北", 0, 0, 1, 1)    loc and vs suggsetion ON

*/
var suggestionUrl = function (input, restaurant, hotel, loc, vs) {
    // set default value, don't give suggestion
    var restaurant = restaurant || 0,
        hotel = hotel || 0,
        loc = loc || 0,
        vs = vs || 0,
        input = input || 0;

    var requestUrl = urlApi.apiHost + urlApi.inputSuggestion;
    var querys = {
        restaurant : restaurant,
        hotel : hotel,
        loc : loc,
        vs : vs,
        word : input
    };

    var queryStr = '';
    for (var query in querys) {
        queryStr += '&' + query + '=' + querys[query];
    }

    return requestUrl + '?' + queryStr;
};

var getIdFromName = function(data , errorCode){
    var data = JSON.parse(data);
    if (data.result && (_.isArray(data.result)) && data.result[0]){
        var id = data.result[0].id;
        return id;
    }else{
        console.log(Error[errorCode]);
        return false;
    }
}

module.exports = router;
