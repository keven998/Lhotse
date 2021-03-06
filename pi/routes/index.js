var _    = require('underscore');
var apiList = require('../url_api');
var async = require('async');
var config = require('../conf/system');
var express = require('express');
var left_nav_data = require('../conf/country_nav');
var map_data = require('../conf/map_data');
var model = require('../model/sup_model.js');
var models = require('../model/models.js');
var moment = require('moment');
    moment.locale('zh-cn');
var request = require('request');
var route_filters = require('../conf/route_filters');
var router = express.Router();
var utils = require( "../common/utils");
var zone = require('../conf/zone');

var error = [
    'Error in getting fromId by name !',
    'Error in getting arriveId by name !',
    'Error in getting routelist !'
];


router.get('/', function(req, res) {
    async.parallel({
        newRoute: function(callback) {
            models.recommend.newRouteModel.getData({ query: { pageSize: 6 } }, function(model_result){
                if (! model_result.succ){ console.log("can't get the newRoute"); };
                callback(null, model_result);
            });
        },
        editorRoute: function(callback) {
            models.recommend.editorRouteModel.getData({ query: { pageSize: 6 } }, function(model_result){
                if (! model_result.succ){ console.log("can't get the editorRoute"); };
                callback(null, model_result);
            });
        },
        mustgoRoute: function(callback) {
            models.recommend.mustgoRouteModel.getData({ query: { pageSize: 6 } }, function(model_result){
                if (! model_result.succ) { console.log("can't get the mustgoRoute"); };
                callback(null, model_result);
            });
        },
        popRoute: function(callback) {
            models.recommend.popRouteModel.getData({ query: { pageSize: 6 } }, function(model_result){
                if (! model_result.succ) { console.log("can't get the popRoute"); };
                callback(null, model_result);
            });
        },
        articles: function(callback) {
            models.article.listModel.getData({ query: { pageSize: 6 } }, function(model_result){
                if (! model_result.succ) { console.log("can't get the articles"); };
                callback(null, model_result);
            });
        }
    },
    function(err, results) {
        var articles = [];
        var article;
        if (results.articles.succ){
            var temp = results.articles.data;
            for (var i = 0;i < temp.length;i++){
                article = {
                    id: temp[i].id,
                    title: temp[i].title,
                    images: temp[i].images,
                    publishTime: moment(temp[i].publishTime).format('YYYY-MM-DD'),
                    authorName: temp[i].authorName,
                    desc: temp[i].desc
                }
                articles.push(article);
            }
        }
        res.render('index', {
            articles: articles,
            newRoute: (results.newRoute.succ) ? results.newRoute.data : [],
            editorRoute: (results.editorRoute.succ) ? results.editorRoute.data : [],
            mustgoRoute: (results.mustgoRoute.succ) ? results.mustgoRoute.data : [],
            popRoute: (results.popRoute.succ) ? results.popRoute.data : [],
            user_info: utils.get_user_info(req, res),
            config: config
        });
    });
});


router.get('/route', function(req, res) {
    //get fromId and arriveId
    var poiType;
    async.parallel({
        from: function(callback) {
            models.searchByName.locModel.getData({
                query: {
                    "keyword":  req.query.fromName,
                    "prefix": false
                }
            }, function(model_result){
                if (! model_result.succ){ console.log("Can't find this fromLoc!"); };
                callback(null, model_result);
            });
        },
        arrive: function(callback) {
            if (req.query[zone.type.viewspot] !== undefined){
                poiType = zone.type.viewspot;
            }else if (req.query[zone.type.locality] !== undefined){
                poiType = zone.type.locality;
            };
            models.searchByName[ poiType + "Model" ].getData({
                query: {
                    "keyword": req.query[poiType],
                    "prefix": false
                }
            }, function(model_result){
                if (! model_result.succ){ console.log("Can't find this arriveLoc!"); };
                callback(null, model_result);
            });
        }
    },
    function(err, results) {
        if (!(_.isArray(results.from.data) && results.from.data.length && _.isArray(results.arrive.data) && results.arrive.data.length)){
            res.render('route', {
                plans: [],
                fromName: req.query.fromName,
                arriveName: req.query[poiType],
                user_info: utils.get_user_info(req, res),
                config: config,
                route_filters: route_filters
            })
            console.log("Can't get any route!");
        }else{
            var fromId = results.from.data[0].id;
            var arriveId = results.arrive.data[0].id;
            var args = (poiType == "vs")?
                {
                    query: { 
                        fromLoc: fromId,
                        vs: arriveId,
                        pageSize: 999
                    }
                }
                :{
                    query: { 
                        fromLoc: fromId,
                        loc: arriveId,
                        pageSize: 999
                    }
                }
            models.routeList[ poiType + "Model" ].getData(args, function(model_result){
                if (! model_result.succ){
                    res.render('route', {
                        plans: [],
                        fromName: req.query.fromName,
                        arriveName: req.query[poiType],
                        user_info: utils.get_user_info(req, res),
                        config: config,
                        route_filters: route_filters
                    })
                    console.log("Can't get any route!");
                }else{
                    res.render('route', {
                        plans: model_result.data,
                        fromName: req.query.fromName,
                        arriveId: arriveId,
                        fromId: fromId,  // 用于配置“复制路线”的url
                        arriveName: req.query[poiType],
                        user_info: utils.get_user_info(req, res),
                        config: config,
                        route_filters: route_filters
                    })
                }
            })   
        }
    })
});

router.get('/download/lxp_v1.0.apk', function(req, res) {
    res.render('app/download', {
        user_info: utils.get_user_info(req, res),
        config: config
    });
    // res.redirect('/lxp_v1.0.apk');
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
                id: city.id,
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
                id: view.id,
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
