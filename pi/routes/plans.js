
var express = require('express');
var router = express.Router();
var routeDetail = require('../model/route_detail');
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
    user save the ugc in timeline
*/
router.post('/timeline/save', function(req, res) {
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

/* plan detail */
router.get('/detail/:TEMPLATEID', function(req, res) {
    console.log('in...');
    var templateId = req.params.TEMPLATEID,
        query      = req._parsedUrl.query;

    model.setUrl(apiList.ugc.planDetail + templateId + '?' + query);
    model.getdata(null, function(data){
        if(!utils.checkApiRequestState(data)) {
            console.log("==== api request error ====");
            console.log("request url: ");
            console.log(model.getUrl());
            /* render error page */
            res.render('common/error', {
                user_info       : utils.get_user_info(req, res),
                config          : config,
                already_saved   : false,
            })
            return ;
        }
        console.log(model.getUrl());
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

/* edit route */
router.get('/edit/:UGCID', function(req, res) {
    console.log('－－－－－－－－－');
    var ugcId = req.params.UGCID;
    console.log(apiList.apiHost + apiList.ugc.edit + ugcId);
    model.setUrl(apiList.ugc.edit + ugcId);
    model.getdata(null, function(data) {
        console.log('_+_+_+');
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
            })
            return ;
        }
        var oriData         = JSON.parse(data),
            result          = oriData.result,
            ugcDetail       = result.details,
            detailInfo      = dataExtract.detailData(null, ugcDetail),
            basicInfo       = dataExtract.basicData(null, result),
            spotData        = detailInfo.spotData;

        //res.json(spotData);
        res.render('plans/edit', {
            user_info       : utils.get_user_info(req, res),
            config          : config,
            already_saved   : false,
            basicInfo       : basicInfo,
            spotData        : spotData,
            spotDataStr     : JSON.stringify(spotData)
        });
    });
});


/* edit route */
router.get('/edit/customized/:UGCID', function(req, res) {
    async.parallel([
        function route(callback) {
            ugcDataEdit.route(req, callback);
        },
        function spots(callback) {
            ugcDataEdit.spots(req, callback);
        },
        function hotels(callback) {
            ugcDataEdit.hotels(req, callback);
        }],

        function(err, results) {
            var dataObj = results[0];
            var spots = results[1];
            var hotels = results[2];

            res.render('plans/edit', {
                daysRoute : dataObj.dayRoute,
                id : dataObj._id,   // 表明这个ugc id，ajax传递给node后，获取别的信息，减少前段任务
                title : dataObj.title,
                spots : spots,      // 城市景点
                //locName : locName,  // 对象：起点和目的地
                hotels : hotels,
                user_info: utils.get_user_info(req, res),
                config: config,
                already_saved: true,
                startDate: dataObj.startDate,
            });
        })
});


/* edit post request */
router.post('/edit/post', function(req, res) {
    var webPostData = req.body;
    var vsAndHotel = webPostData.spotArray;
    //获得ugc信息
    var requestUrl = apiList.apiHost + apiList.ugc.getUgcByIdNone + webPostData.ugcId;
    model.setUrl(encodeURI(requestUrl));
    model.getdata(req, function(data){
        data = JSON.parse(data);
        var ugcData = new Object();
        ugcData.uid = webPostData.uid;
        ugcData.fromLoc = webPostData.fromLocId;
        ugcData.title = data.result.title;
        ugcData.action = 'upsert';
        ugcData.templateId = data.result.templateId;
        ugcData._id = webPostData.ugcId;
        ugcData.trafficBudget = data.result.trafficBudget;
        ugcData.viewBudget = data.result.viewBudget;
        ugcData.budget = data.result.budget;
        ugcData.stayBudget = data.result.stayBudget;
        ugcData.v = '1.1.0';
        ugcData.webFlag = 1;
        ugcData.seq = '';
        ugcData.timestamp = '';

        var details = new Array();
        // 获得交通信息
        var arr = data.result.details,
            trafficData = [],
            routeLength = arr.length;
        for (var i = 0; i < arr.length; i++) {
            var actv = arr[i].actv;
            for (var j = 0; j < actv.length; j++) {
                var elem = actv[j];
                if (elem.type == 'traffic') {
                    if(elem.subType == 'airport' || elem.subType == 'trainStation') {
                        var temp = new Object();
                        temp.type = elem.type;
                        temp.subType = elem.subType;
                        temp.ts = elem.ts;
                        temp.st = elem.ts;
                        temp.itemId = elem.itemId;
                        trafficData.push(temp);
                    } else {
                        var temp = new Object();
                        temp.type = elem.type;
                        temp.subType = elem.subType;
                        temp.arrStop = elem.arrStop;
                        temp.depStop = elem.depStop;
                        temp.st = elem.ts;
                        temp.itemId = elem.itemId;
                        trafficData.push(temp);
                    }
                }
            }
        }
        var dateDiff = webPostData.dayDiff,
            details = trafficDateUpdate(trafficData, vsAndHotel, dateDiff);

        var vsTime = [];
        for (var i = 0; i < details.length; i++) {
            var vsData = details[i];
            if (vsData.type === 'vs') {
                vsTime.push(vsData.st);
            }
        }
        ugcData.startDate = vsTime[0];
        ugcData.endDate = vsTime[vsTime.length - 1];
        // http post
        ugcData.details = details;
        var options = {
            url : apiList.apiHost + apiList.ugc.editSave,
            json: ugcData,
            method: 'POST',
        };
        request(options, function(err, respond, result) {
            if (err) {
                throw err;
            }
            res.json(result);
        });
    });
});


router.get('/mine/', function(req, res){
    var user_info = utils.get_user_info(req, res);

    model.setUrl(apiList.apiHost + apiList.myPlans + user_info.id);
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
            if (plan.startDate != ""){
                var startYear = plan.startDate.substr(0,4),
                    startMonth = plan.startDate.substr(5,2),
                    startDay = plan.startDate.substr(8,2),
                    startDate = startYear;
                startDate += "." + startMonth + "." + startDay;
            }else
                startDate = 0;
            if (plan.endDate != ""){
                var endYear = plan.endDate.substr(0,4),
                    endMonth = plan.endDate.substr(5,2),
                    endDay = plan.endDate.substr(8,2),
                    endDate = endYear;
                endDate += "." + endMonth + "." + endDay;
            }else
                endDate = 0;
            planList[i] = {
                "id":           plan._id,
                "name":         plan.title,
                "image":        plan.imageList[0],
                "days":         plan.days,
                "startDate":    startDate,
                "endDate":      endDate,
                "updateDate":   updateDate
            }
        }
        res.render('plans/mine',{
            num : i,
            myPlans : planList,
            user_info: utils.get_user_info(req, res),
            config: config,
        });
    });
});


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



router.get('/create/', function(req, res){
    res.render('plans/create', {
        user_info: utils.get_user_info(req, res),
        config: config,
        zone: zone,
    });
});

        /* old data to be delete BEGIN*/
/* route timeline */
router.get('/timeline/:TEMPLATES', function(req, res) {
    var ori_res = res;
    model.setUrl(apiList.apiHost + apiList.ugc.timeline);
    model.getdata(req, function(data) {
        var data = dataExtract.preProcess(req, data);
        if (!data) {
            res.redirect('/');
        }
        var basicInfo = dataExtract.basicData(req, data);
        var allRoutes = dataExtract.detailData(req, data);
        var navigation = dataExtract.navigationData(allRoutes);

        res.render('plans/timeline', {
            allRoutes : allRoutes,
            basicInfo : basicInfo,
            navigation : navigation,
            user_info: utils.get_user_info(req, res),
            config: config,
            already_saved: false,
        });
    });
});


/* user's plan detail */
router.get('/timeline/customized/:UGCID', function(req, res) {
    var ori_res = res;
    model.setUrl(apiList.apiHost + apiList.ugc.detail);
    model.getdata(req, function(data) {
        var data = dataExtract.preProcess(req, data);
        if (!data) {
            res.redirect('/');
        }
        var basicInfo = dataExtract.basicData(req, data);
        var allRoutes = dataExtract.detailData(req, data);
        var navigation = dataExtract.navigationData(allRoutes);
        res.render('plans/timeline', {
            allRoutes : allRoutes,
            basicInfo : basicInfo,
            navigation : navigation,
            user_info: utils.get_user_info(req, res),
            config: config,
            already_saved: true,
        });
    });
});
        /* old data to be delete BEGIN*/



                /* ---- 以下代码为调用函数 ---- */
/*
    addOneDay：计算XXXX-XX-XX 加一天后是多少？
*/
var calendar = (function () {
    // month array for addOneDay
    var ma = [
        ['01', '03', '05', '07', '08', '10'],
        ['04', '06', '09', '11']
    ];
    // month array for deleteOneDay
    var mb = [
        ['05', '07', '08', '10', '12'],
        ['02', '04', '06', '09', '11']
    ];

    //判断数组a是否存在在元素n
    function check(n, a) {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] == n) {
                return true;
            }
        }
        return false;
    }

    //闰?年?
    function isLeap(y) {
        return ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) ? true : false;
    }

    return {
        addOneDay: function (o) {
            var d = o.split('-');
            var l = isLeap(d[0]);
            if ((check(d[1], ma[0]) && (d[2] == '31')) || (check(d[1], ma[1]) && (d[2] == '30')) || (d[1] == '02' && d[2] == '28' && !l) || (d[1] == '02' && d[2] == '29' && l)) {

                return d[0] + '-' + ((d[1] * 1 + 1) < 10 ? '0' + (d[1] * 1 + 1) : (d[1] * 1 + 1)) + '-01';
            } else if (d[1] == '12' && d[2] == '31') {

                return (d[0] * 1 + 1) + '-' + '01-01';
            } else {

                return d[0] + '-' + d[1] + '-' + ((d[2] * 1 + 1) < 10 ? '0' + (d[2] * 1 + 1) : (d[2] * 1 + 1));
            }
        },
        deleteOneDay: function (o) {
            var d = o.split('-');
            var l = isLeap(d[0]);
            if (check(d[1], mb[0]) && d[2] == '01') {
                return d[0] + '-' + (d[1] - 1) + '-30';
            } else if (check(d[1], mb[1]) && d[2] == '01') {
                return d[0] + '-' + (d[1] - 1) + '-31';
            } else if (d[1] == '03' && l && d[2] == '01') {
                return d[0] + '-' + (d[1] - 1) + '-29';
            } else if (d[1] == '03' && !l && d[2] == '01') {
                return d[0] + '-' + (d[1] - 1) + '-28';
            } else if (d[1] == '01' && d[2] == '01') {
                return (d[0] - 1) + '-12-31';
            } else {
                return d[0] + '-' + d[1] + '-' + (d[2] - 1);
            }
        },
        currentDate: function () {
            var currentDate = new Date(),
                year = currentDate.getFullYear(),
                month = currentDate.getMonth() + 1,
                day = currentDate.getDate(),
                month = (month < 10) ? '0' + month : month,
                day = (day < 10) ? '0' + day : day,
                formatCurrentDate = year + '-' + month + '-' + day;
            return formatCurrentDate;
        },
    };
}());


/* 更新交通时间 */
var trafficDateUpdate = function (traffic_data, vsAndHotel_data, dateDiff) {
    // 去的交通
    var trafficData = traffic_data,
        vsAndHotelData = vsAndHotel_data;
    if (dateDiff < 0) {
        for (var i = 0; i < 3; i++) {
            var arr_t = trafficData[i].st.split(' '),
                t = arr_t[0];
            for (var j = dateDiff; j < 0; j++) {
                t = calendar.deleteOneDay(t);
            }
            trafficData[i].st = t + ' ' + arr_t[1];
            if (trafficData[i].ts) {
                trafficData[i].ts = trafficData[i].st;
            }
        }
    } else if (dateDiff > 0) {
        for (var i = 0; i < 3; i++) {
            var arr_t = trafficData[i].st.split(' '),
                t = arr_t[0];
            for (var j = 0; j < dateDiff; j++) {
                t = calendar.addOneDay(t);
            }
            trafficData[i].st = t + ' ' + arr_t[1];
            if (trafficData[i].ts) {
                trafficData[i].ts = trafficData[i].st;
            }
        }
    }

    /* 处理酒店和景点信息 */
    var tempDate = trafficData[2].ts.split(' ')[0],
        tempVsAndHotel = [];
    for (var i = 0; i < vsAndHotelData.length; i++) {
        var oneDay = vsAndHotelData[i];
        for (var j = 0 ; j < oneDay.length; j++) {
            var oneSpot = oneDay[j];
            if (oneSpot.type == 'vs') {
                oneSpot.st = tempDate + ' 00:' + ((j + 1) < 10 ? '0' + (j + 1) : (j + 1)) + ':00+0800';
            } else {
                oneSpot.st = tempDate + ' 00:00:00+0800';
            }
            tempVsAndHotel.push(oneSpot);
        }
        tempDate = calendar.addOneDay(tempDate);
    }

    var lastSpotDate = new Date(tempDate),
        backDate = new Date(trafficData[3].ts.split(' ')[0]),
        dayDiff = parseInt((lastSpotDate.getTime() - backDate.getTime()) / 86400000);
    if (dayDiff < 0) {
        for (var i = 3; i < trafficData.length; i++) {
            var arr_t = trafficData[i].st.split(' '),
                t = arr_t[0];
            for (var j = dayDiff; j < 0; j++) {
                t = calendar.deleteOneDay(t);
            }
            trafficData[i].st = t + ' ' + arr_t[1];
            if (trafficData[i].ts) {
                trafficData[i].ts = trafficData[i].st;
            }
        }
    } else if (dayDiff > 0) {
        for (var i = 3; i < trafficData.length; i++) {
            var arr_t = trafficData[i].st.split(' '),
                t = arr_t[0];
            for (var j = 0; j < dayDiff; j++) {
                t = calendar.addOneDay(t);
            }
            trafficData[i].st = t + ' ' + arr_t[1];
            if (trafficData[i].ts) {
                trafficData[i].ts = trafficData[i].st;
            }
        }
    }

    for (var i = 0; i < trafficData.length; i++) {
            if (i < 3){
                trafficData[i].transfer = "no.from";
            }else{
                trafficData[i].transfer = "no.back";
            }
        };

    return trafficData.concat(tempVsAndHotel);
}


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
    }
})();


/*
    extract the data of ugc plan for timeline
    preprocess(req, data) : parse data to JSON type
    basicData(req, data) : get basic data
    detailData(req, data) : get the detail data
    navigationData(allRoute) : the argument is the data returned by detailData(req, data)
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
            picUrl      = (result.imageList && (_.isArray(result.imageList)) && result.imageList[0]) ? result.imageList[0] : "用来替换的pic图片",
            startDate   = result.startDate.substring(0, 10),
            endDate     = result.endDate.substring(0, 10),

            basicInfo   = {
                title       : title,
                id          : id,
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
        var navigation = new Array();
        for (var i = 0; i < allRoutes.length; i++) {
            var oneDay = allRoutes[i];
            var oneDayRoutes = oneDay.actv;
            var tempDay = new Object();
            var tempActv = new Array(); // 存放地点数组

            tempDay.date = oneDay.date; // 时间
            for (var routeNum = 0; routeNum < oneDayRoutes.length; routeNum++) {
                var oneSpot = oneDayRoutes[routeNum];
                if (oneSpot.type != "airRoute" && oneSpot.type != "trainRoute") {
                    var tempSpot = new Object();
                    tempSpot['itemName'] = oneSpot.itemName.length < 5 ? oneSpot.itemName : oneSpot.itemName.substring(0, 5)+ '...';
                    tempSpot['type'] = oneSpot.type;
                    tempSpot['latLng'] = oneSpot.lat + "," + oneSpot.lng;
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
            calendarData = [];
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
                weekFlay    = moment(date).format('dddd');
            dates.push(date);
            oneDayCalendar.date     = date;
            oneDayCalendar.weekFlay = weekFlay;

            if(_.isArray(oneDayPlan)){
                for(var spotIndex in oneDayPlan){
                    var curSpot      = oneDayPlan[spotIndex],
                        tempSpot     = {},
                        type         = curSpot.type,
                        subType      = curSpot.subType;

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
                        case 'food':
                            tempSpot.type       = "food";
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
                    };
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
            calendarData: calendarData
        };
    };

    return {
        preProcess : preProcess,
        basicData : basicData,
        navigationData : navigationData,
        detailData : detailData,
    };

})();


/*
    get data from user's plans to modify already exit plans
    ugcDataEdit.route
    ugcDataEdit.spots
    ugcDataEdit.hotels
    ugcDataEdit.locName
*/
var ugcDataEdit = (function() {
    // 获取ugc基本信息，作为编辑页面左侧栏信息
    var route = function(req, callback) {
        model.setUrl(apiList.apiHost + apiList.ugc.getUgcById);
        model.getdata(req, function(data) {
            data = JSON.parse(data);
            var startDate = data.result.details[1].date.split(' ')[0];
            var result = data.result;
            var title = result.title;
            var days = result.days;
            var details = result.details;
            var dayRoute = new Array();

            for (var i = 0; i < details.length; i++) {
                var actv = details[i].actv;
                var tempArr = new Array();
                for (var j = 0; j < actv.length; j++) {
                    var temp = new Object();
                    var elem = actv[j];
                    if (elem.type == 'hotel' || elem.type == 'vs') {
                        temp.itemId = elem.itemId;
                        temp.itemName = elem.itemName;
                        temp.type = elem.type;
                        tempArr.push(temp);
                    }
                }
                dayRoute.push(tempArr);
            }
            var dataObj = new Object();
            var _id = result._id;
            dataObj._id = _id;
            dataObj.title = title;
            dataObj.dayRoute = dayRoute;
            dataObj.startDate = startDate;
            callback(null, dataObj);
        });
    };

    // 获得对应目的地的景点信息
    var spots = function(req, callback) {
        var requestUrl = '/web/poi/view-spots/search?keyword=' + req.query.DEST + '&page=0&pageSize=9&sortField=viewCnt&sort=desc'
        model.setUrl(encodeURI(apiList.apiHost + requestUrl));
        model.getdata(req, function(data) {
            data = JSON.parse(data);
            var result = data.result;
            var spots = new Array();
            for (var i = 0; i < result.length; i++) {
                var spot = result[i];
                var tempSpot = new Object();
                tempSpot.name = spot.name;
                tempSpot._id = spot._id;
                tempSpot.pic = spot.imageList[0];
                tempSpot.ranking = spot.ratings.ranking;
                tempSpot.timeCost = spot.timeCost;

                var tags = '';
                var j = 0;
                // judge if tags is empty array
                if (spot.tags.length != 0) {
                    for (; j < spot.tags.length-1; j++) {
                        tags += spot.tags[j] + '|';
                    }
                    tags += spot.tags[j];
                    tempSpot.tags = tags;
                } else {
                    tempSpot.tags = '';
                }
                spots.push(tempSpot); }

            callback(null, spots);
        });
    };

    // 获得对应目的地的酒店信息
    var hotels = function(req, callback) {
        var requestUrl = '/web/poi/hotels/search?keyword=' + req.query.DEST + '&page=0&pageSize=9';
        model.setUrl(encodeURI(apiList.apiHost + requestUrl));
        model.getdata(req, function(data){
            data = JSON.parse(data);
            var result = data.result;
            var hotels = new Array();
            for (var i = 0; i < result.length; i++) {
                var hotel = result[i];
                var tempHotel = new Object();
                tempHotel.name = hotel.name;
                tempHotel._id = hotel._id;
                tempHotel.pic = hotel.imageList[0];
                tempHotel.ranking = hotel.ratings.starLevel;
                tempHotel.price = hotel.price;
                tempHotel.phone = hotel.contact.phoneList ? hotel.contact.phoneList[0] : '';
                tempHotel.address = hotel.addr.addr;

                hotels.push(tempHotel);
            }

            callback(null, hotels);
        });
    };

    // 获取形成起始信息
    var locName = function(req, callback) {

        model.setUrl(apiList.apiHost + apiList.searchCityNameById);
        model.getdata(req, function(data){
            data = JSON.parse(data);
            var fromLocName = data.result.name;
            var arrLocName = req.query.DEST;

            var locName = new Object();
            locName.from = fromLocName;
            locName.arr = arrLocName;

            callback(null, locName);
        });
    };


    return {
        route : route,
        spots : spots,
        hotels : hotels,
        locName : locName,
    };

})();

module.exports = router;
