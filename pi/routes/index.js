var express = require('express');
var router = express.Router();
var async = require('async');
var apiList = require('../url_api');
var plans = require('../model/plans');
var request = require('request');
var model = require('../model/sup_model.js');
var left_nav_data = require('../conf/country_nav');
var map_data = require('../conf/map_data');
var config = require('../conf/system');
var zone = require('../conf/zone');
var utils = require( "../common/utils");
var route_filters = require('../conf/route_filters');
var _    = require('underscore');

var error = [
    'Error in getting fromId by name !',
    'Error in getting arriveId by name !',
    'Error in getting routelist !'
];


router.get('/', function(req, res) {
    async.parallel({
        newRoute: function(callback) {
            model.setUrl(apiList.apiHost + apiList.newRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        },
        editorRoute: function(callback) {
            model.setUrl(apiList.apiHost + apiList.editorRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        },
        mustgoRoute: function(callback) {
            model.setUrl(apiList.apiHost + apiList.mustgoRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        },
        popRoute: function(callback) {
            model.setUrl(apiList.apiHost + apiList.popRoute);
            model.getdata(req, function(data){
                callback(null, data);
            });
        }
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
    var queryFromName = apiList.apiHost + apiList.searchCityIdByName + decodeURIComponent(fromLocName);
    if (req.query[zone.type.viewspot] !== undefined){
        var poiType = zone.type.viewspot,
            arrLocName = req.query[zone.type.viewspot],
            queryArrName = apiList.apiHost + apiList.searchViewspotIdByName + decodeURIComponent(arrLocName) + "&sort=desc";
    }else if (req.query[zone.type.locality] !== undefined){
        var poiType = zone.type.locality,
            arrLocName = req.query[zone.type.locality],
            queryArrName = apiList.apiHost + apiList.searchCityIdByName + arrLocName;
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
        var fromId = results.from,
            arriveId = results.arrive,
            // indexGoUrl = apiList.apiHost + apiList.getRouteList + "?tag=&minDays=0&maxDays=99" + "&fromLoc=" + fromId + "&" + poiType + "=" + arriveId;
            indexGoUrl = apiList.apiHost + apiList.getRouteList + "fromLoc=" + fromId + "&" + poiType + "=" + arriveId;
        model.setUrl(encodeURI(indexGoUrl));
        model.getdata(null, function(data){
            // model.consoleUrl();
            if((data !== undefined) && (data.indexOf('<html>') < 0)){
                var data = JSON.parse(data);
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
            }else{
                res.json(null);
                console.log(error[2]);
            }
        });
    });
});

router.get('/download/', function(req, res) {
    res.render('download', {
        user_info: utils.get_user_info(req, res),
        config: config
    });
});

router.get('/target/', function(req, res){
    async.parallel({
        hotCities: function(callback) {
            model.setUrl(apiList.apiHost + apiList.hotCities);
            model.getdata(req, function(data){
                data = JSON.parse(data);
                callback(null, data);
            });
        },
        hotViews: function(callback) {
            model.setUrl(apiList.apiHost + apiList.hotViews);
            model.getdata(req, function(data){
                data = JSON.parse(data);
                callback(null, data);
            });
        }
    },
    function(err, results) {
        var cityList = [],
            viewList = [],
            page_size = 8;
        for (var i = 0; i < page_size; i++){
            var city = results.hotCities.result[i],
                cityName = city.name,
                cityAbbr = cityName;
            if (cityName.substr(6,1) !== "")
                cityAbbr = cityName.substr(4)+'...';
            cityList.push({
                id: city._id,
                abbr: cityAbbr,
                name: cityName,
                img: (city.images && city.images[0]) ? city.images[0].url : null
            });
        }
        for (var i = 0; i < page_size; i++){
            var view = results.hotViews.result[i],
                viewName = view.name,
                viewAbbr = viewName;
            if (viewName.substr(6,1) !== "")
                viewAbbr = viewName.substr(0,5)+'...';
            viewList.push({
                id: view._id,
                abbr: viewAbbr,
                name: viewName,
                img: (view.images && view.images[0]) ? view.images[0].url : null
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
            zone : zone
        });
    });
});

//  联想功能
router.get('/suggestion', function(req, res){
    var tempInput = req.query.input;
    var type = req.query.type;
    var requestUrl = '';
    // 如果未有输入则推送空
    if (tempInput === "") {
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
            var result = JSON.parse(data).result;
            var suggestionArray = [];
            for (var type in result) {
                var arrData = result[type],
                    len = arrData.length;
                for (var i = 0; i < len; i++) {
                    var tempName = {
                        type: type,
                        name: arrData[i].zhName
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


router.get('/getid', function(req, res){
    var name = req.query.locName;
    model.setUrl(encodeURI(apiList.apiHost + apiList.searchCityIdByName + name));
    model.getdata(req, function(data){
        model.consoleUrl();
        var locId = getIdFromName(data,0);
        console.log("0");
        console.log(locId);
        res.json({
            locId: locId
        });
    });
})

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

    var requestUrl = apiList.apiHost + apiList.inputSuggestion;
    var querys = {
        restaurant : restaurant,
        hotel : hotel,
        loc : loc,
        vs : vs,
        keyword : input
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
        console.log(error[errorCode]);
        return -1;
    }
};

module.exports = router;
