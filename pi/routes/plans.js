var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var config = require('../conf/system');
var zone = require('../conf/zone');
var _    = require('underscore');
var moment = require('moment');
moment.locale('zh-cn');

// 新方法
var model = require('../model/sup_model.js');
var apiList = require('../url_api');
var utils = require( "../common/utils");


/*
 * detail page: save directly
 * TODO
 */
router.post('/detail/save', function(req, res) {
    var postData = req.body;
    var requestUrl = apiList.apiHost + apiList.ugc.saveUgc;
    // http post
    var options = {
        url :  requestUrl,
        json: postData,
        method: 'POST',
    };

    request(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


/*
 * detail page
 */
router.get('/detail/:TEMPLATEID', function(req, res) {
    var templateId = req.params.TEMPLATEID,
        query      = req._parsedUrl.query;

    model.setUrl(apiList.ugc.planDetail + templateId + '?' + query);
    console.log(model.getUrl());
    model.getdata(null, function(data){
        if(!utils.checkApiRequestState(data)) {
            /* render error page */
            res.render('common/error', {
                user_info       : utils.get_user_info(req, res),
                config          : config,
                already_saved   : false,
            });
            return ;
        }
        var oriData         = JSON.parse(data),
            result          = oriData.result,
            ugcDetail       = result.details,
            detailInfo      = dataExtract.detailData(null, ugcDetail),
            basicInfo       = dataExtract.basicData(null, result),
            spotData        = detailInfo.spotData,
            viewspotCnt     = detailInfo.viewspotCnt,
            dates           = detailInfo.dates,
            calendarData    = detailInfo.calendarData;

            res.render('plans/detail', {
                basicInfo       : basicInfo,
                spotData        : spotData,
                dates           : dates,
                calendarData    : calendarData,
                viewspotCnt     : viewspotCnt,
                mapData         : JSON.stringify(spotData),
                user_info       : utils.get_user_info(req, res),
                config          : config,
                already_saved   : false,
            });
    });
});


/* edit route not saved yet */
router.get('/edit/:UGCID', function(req, res) {
    var ugcId = req.params.UGCID;
    console.log(apiList.apiHost + apiList.ugc.edit + ugcId);
    model.setUrl(apiList.ugc.edit + ugcId);
    model.getdata(null, function(data) {
        console.log(model.getUrl());
        if(!utils.checkApiRequestState(data)) {
            console.log("==== api request error ====");
            console.log("request url: ");
            console.log(model.getUrl());
            /* render error page */
            res.render('common/error', {
                user_info       : utils.get_user_info(req, res),
                config          : config,
                already_saved   : false
            });
            return ;
        }
        var oriData         = JSON.parse(data),
            result          = oriData.result,
            ugcDetail       = result.details,
            detailInfo      = dataExtract.detailData(null, ugcDetail),
            basicInfo       = dataExtract.basicData(null, result),
            spotData        = detailInfo.spotData,
            trafficRoute     = detailInfo.trafficRoute;

        // res.json(trafficRoute);
        res.render('plans/edit', {
            user_info       : utils.get_user_info(req, res),
            config          : config,
            already_saved   : false,
            basicInfo       : basicInfo,
            spotData        : spotData,
            trafficRoute    : JSON.stringify(trafficRoute),
            spotDataStr     : JSON.stringify(spotData)
        });
    });
});


/* mine page */
router.get('/mine/', function(req, res){
    var user_info = utils.get_user_info(req, res);

    model.setUrl(apiList.apiHost + apiList.myPlans + user_info.id);
    console.log(model.getUrl());
    model.getdata(req, function(data) {
        var planList = [], i;
        data = JSON.parse(data);
        for (i = 0;i < data.result.length;i++) {
            var plan = data.result[i],
                updateTime = new Date(plan.updateTime),//long毫秒数转Date类型时间
                updateYear = updateTime.getFullYear(),
                updateMonth = updateTime.getMonth()+1,
                updateDay = updateTime.getDate(),
                updateDate = updateYear + "." + updateMonth + "." + updateDay;
            var startDate = '';
            if (plan.startDate !== ""){
                var startYear = plan.startDate.substr(0,4),
                    startMonth = plan.startDate.substr(5,2),
                    startDay = plan.startDate.substr(8,2);
                startDate = startYear + "." + startMonth + "." + startDay;
            }
            var endDate = '';
            if (plan.endDate !== ""){
                var endYear = plan.endDate.substr(0,4),
                    endMonth = plan.endDate.substr(5,2),
                    endDay = plan.endDate.substr(8,2);
                endDate = endYear + "." + endMonth + "." + endDay;
            }
            planList[i] = {
                "id":           plan._id,
                "name":         plan.title,
                "image":        plan.images[0] && plan.images[0].url,
                "days":         plan.days,
                "startDate":    startDate,
                "endDate":      endDate,
                "updateDate":   updateDate
            };
        }
        res.render('plans/mine',{
            num : i,
            myPlans : planList,
            user_info: utils.get_user_info(req, res),
            config: config,
        });
    });
});


/* delete one plan */
router.get('/mine/delete/:planID/', function(req, res) {
    var options = {
        url:    apiList.apiHost + "/web/ugc-plans/" + req.params.planID,
        method: 'DELETE',
    };
    request(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

/* change ugc name in mine page*/
router.post('/mine/altername', function(req, res) {
    var data = {
            "action": "updateTitle",
            "_id": req.body.planId,
            "title": req.body.planName
        };
    var options = {
        url: apiList.apiHost + "/web/ugc-plans",
        json: data,
        method: 'POST',
    };
    request(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
    });
});


/* create page */
router.get('/create/', function(req, res){
    res.render('plans/create', {
        user_info: utils.get_user_info(req, res),
        config: config,
        zone: zone,
    });
});


/* user's plan detail */
router.get('/timeline/customized/:UGCID', function(req, res) {
    var ugcId = req.params.UGCID,
        query = req._parsedUrl.query;

    model.setUrl('http://api.lvxingpai.cn/web/ugc-plans/' + ugcId);
    model.getdata(null, function(data) {
        if(!utils.checkApiRequestState(data)) {
            console.log("==== api request error ====");
            console.log("request url: ");
            console.log(model.getUrl());
            /* render error page */
            res.render('common/error', {
                user_info       : utils.get_user_info(req, res),
                config          : config,
                already_saved   : false,
            });
            return ;
        }

        console.log('URL:::' + model.getUrl());
        // res.json(JSON.parse(data));
        var oriData         = JSON.parse(data);
        var result          = oriData.result;
        var ugcDetail       = result.details;
        var detailInfo      = dataExtract.detailData(null, ugcDetail);
        var basicInfo       = dataExtract.basicData(null, result);
        var spotData        = detailInfo.spotData;
        var viewspotCnt     = detailInfo.viewspotCnt;
        var dates           = detailInfo.dates;
        var calendarData    = detailInfo.calendarData;
        // res.json(oriData);
        console.log(utils.get_user_info(req, res));
            res.render('plans/detail', {
                basicInfo       : basicInfo,
                spotData        : spotData,
                dates           : dates,
                calendarData    : calendarData,
                viewspotCnt     : viewspotCnt,
                mapData         : JSON.stringify(spotData),
                user_info       : utils.get_user_info(req, res),
                config          : config,
                already_saved   : true,
            });
    });
});

/*
    extract time info for GTS format: "2014-10-18 05:50:00+0800"
*/
var gstTime = (function () {
    var date = function(GTString) {
        return GTString.substr(0, 10);
    };

    var time = function(GTString) {
        return GTString.substr(11, 5);
    };
    return {
        date: date,
        time: time,
    };
})();


/*
 * preprocess(req, data) : parse data to JSON type
 */
var dataExtract = (function () {
    // data preprocess
    var preProcess = function(req, data) {
        var t = data.toString(),
            slug = t.indexOf('<!DOCTYPE html>');
        if (slug > 0) {
            return '';
        } else{
            data = JSON.parse(data);
            return data;
        }
    };


    // basic infomation
    var basicData = function(req, result) {
        var title       = result.title,
            id          = result._id,
            copyCnt     = result.forkedCnt,
            viewCnt     = result.vsCnt,
            days        = result.days,
            locId       = result.target._id,
            templateId  = result.templateId,
            picUrl      = (result.imageList && (_.isArray(result.imageList)) && result.imageList[0]) ? result.imageList[0] : "用来替换的pic图片",
            startDate   = result.startDate.substring(0, 10),
            endDate     = result.endDate ? result.endDate.substring(0, 10) : '';

        var basicInfo   = {
                title       : title,
                id          : id,
                templateId  : templateId,
                locId       : locId,
                copyCnt     : copyCnt,
                viewCnt     : viewCnt,
                picUrl      : picUrl,
                days        : days,
                startDate   : startDate,
                endDate     : endDate,
            };
        return basicInfo;
    };


    // data for navigation bar
    var navigationData = function(allRoutes) {
        var navigation = [];
        for (var i = 0; i < allRoutes.length; i++) {
            var oneDay = allRoutes[i];
            var oneDayRoutes = oneDay.actv;
            var tempDay = {};
            var tempActv = []; // 存放地点数组

            tempDay.date = oneDay.date; // 时间
            for (var routeNum = 0; routeNum < oneDayRoutes.length; routeNum++) {
                var oneSpot = oneDayRoutes[routeNum];
                if (oneSpot.type != "airRoute" && oneSpot.type != "trainRoute") {
                    var tempSpot = {};
                    tempSpot.itemName = oneSpot.itemName.length < 5 ? oneSpot.itemName : oneSpot.itemName.substring(0, 5)+ '...';
                    tempSpot.type = oneSpot.type;
                    tempSpot.latLng = oneSpot.lat + "," + oneSpot.lng;
                    tempActv.push(tempSpot);
                }
            }
            tempDay.actv = tempActv; // 关联地点数组
            navigation.push(tempDay);
        }

        return navigation;
    };


    var detailData = function(req, details) {
        if(!_.isArray(details)){
            return null;
        }
        var spotInfo     = [],
            viewspotCnt  = [],
            dates        = [],
            calendarData = [],
            trafficRoute = [];
        for(var dayIndex in details){
            var oneDayPlan      = details[dayIndex].actv,
                tempOneDay      = [],
                viewspotSlug    = 0,
                // data for calendar format
                oneDayCalendar  = {},
                trafficCalendar = [],
                viewspotCalendar= [],
                hotelCalendar   = [],
                costCalendar    = 0,
                remarkCalendar  = '';

            var date        = gstTime.date(details[dayIndex].date),
                // date        = moment()
                weekFlay    = moment(date).format('dddd');
            date        = moment(date).format('MM月DD日');
            dates.push(date);
            oneDayCalendar.date     = date;
            oneDayCalendar.weekFlay = weekFlay;

            if(_.isArray(oneDayPlan)) {
                for(var spotIndex in oneDayPlan){
                    var curSpot      = oneDayPlan[spotIndex],
                        tempSpot     = {},
                        type         = curSpot.type,
                        subType      = curSpot.subType;

                    if(type == 'traffic') {
                        trafficRoute.push(curSpot);
                    }
                    if(subType == 'airRoute' || subType == 'trainRoute') {
                        continue;
                    }

                    tempSpot.id      = curSpot.itemId;
                    tempSpot.name    = curSpot.itemName;
                    tempSpot.locId   = curSpot.locId;
                    tempSpot.locName = curSpot.locName;

                    switch(type) {
                        case 'vs':
                            tempSpot.type       = 'viewspot';
                            tempSpot.lng        = curSpot.details.addr.lng;
                            tempSpot.lat        = curSpot.details.addr.lat;
                            tempSpot.price      = curSpot.details.priceDesc || 0;
                            tempSpot.timeCost   = curSpot.details.timeCost;
                            tempSpot.ranking    = Math.ceil(curSpot.details.ratings.ranking * 5);
                            tempSpot.img        = curSpot.details.imageList[0];
                            viewspotSlug        = viewspotSlug + 1;
                            costCalendar        = costCalendar + parseInt(tempSpot.price);
                            viewspotCalendar.push(tempSpot.name);
                            break;
                        case 'hotel':
                            tempSpot.type       = 'hotel';
                            tempSpot.lng        = curSpot.details.addr.lng;
                            tempSpot.lat        = curSpot.details.addr.lat;
                            tempSpot.price      = curSpot.details.price;
                            tempSpot.img        = curSpot.details.imageList[0];
                            tempSpot.starLevel  = curSpot.details.ratings.starLevel;
                            costCalendar        = costCalendar + parseInt(tempSpot.price);
                            hotelCalendar.push(tempSpot.name);
                            break;
                        case 'traffic':
                            tempSpot.type       = curSpot.subType;
                            tempSpot.lng        = curSpot.lng;
                            tempSpot.lat        = curSpot.lat;
                            break;
                        case 'restaurant':
                            tempSpot.img        = curSpot.details.imageList[0];
                            tempSpot.type       = "restaurant";
                            tempSpot.ranking    = Math.ceil(curSpot.details.ratings.ranking * 5);
                            tempSpot.lng        = curSpot.details.addr.lng;
                            tempSpot.lat        = curSpot.details.addr.lat;
                            break;

                        default:
                            break;
                    }
                    if (type == 'traffic' && curSpot.stopType == "dep") {
                        var nextIndex   = parseInt(spotIndex) + 1,
                            nextSpot    = oneDayPlan[nextIndex];
                        tempSpot.detail = {
                            name     : nextSpot.itemName,
                            type     : nextSpot.subType,
                            transfer : nextSpot.transfer,
                            depTime  : gstTime.time(nextSpot.depTime),
                            arrTime  : gstTime.time(nextSpot.arrTime),
                            date     : gstTime.date(nextSpot.depTime)
                        };
                        trafficCalendar.push(tempSpot.detail);
                    }
                    tempOneDay.push(tempSpot);
                }
                viewspotCnt.push(viewspotSlug);
                spotInfo.push(tempOneDay);
                // data for calendar format
                oneDayCalendar.traffics      = trafficCalendar;
                oneDayCalendar.viewspots     = viewspotCalendar;
                oneDayCalendar.hotels        = hotelCalendar;
                oneDayCalendar.cost         = costCalendar;
                oneDayCalendar.remark       = remarkCalendar;
                calendarData.push(oneDayCalendar);
            }
        }
        return {
            spotData    : spotInfo,
            viewspotCnt : viewspotCnt,
            dates       : dates,
            calendarData: calendarData,
            trafficRoute: trafficRoute
        };
    };

    return {
        preProcess : preProcess,
        basicData : basicData,
        navigationData : navigationData,
        detailData : detailData,
    };

})();

module.exports = router;
