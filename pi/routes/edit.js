var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var config = require('../conf/system');
var zone = require('../conf/zone');
var mu = require('mu2');
var utils = require("../common/utils");
var _ = require('underscore');
var moment = require('moment');
mu.root = 'public/htmltemplate/';

/*
 * @input   : (String, Array)
 * @output  : [{String: Array[0]}, {String: Array[1]}, ...]
 */
var arrayToKVArray = function(string, array){
    if(_.isString(string) && _.isArray(array)){
        var data = array,
            tempObj = {},
            tempArr = [];
        for(var i in data){
            tempObj[string] = data[i] + '?imageView2/2/w/425/h/548';
            tempArr.push(tempObj);
            tempObj = {};
        }
        return tempArr;
    }
    return null;
};

var getStrArray = function(length) {
    var tempArr = [];
    if(length <= 0)
        return tempArr;
    for(var i = 0; i < length; i++) {
        tempArr.push('o');
    }
    return tempArr;
}

// 新方法
var model = require('../model/sup_model.js');
var apiList = require('../url_api');

/* 编辑页面的列表 */
router.post('/tabContent', function(req, res) {
    var postData = req.body,
        type = postData.type,
        querys = postData.option;


    getListContent(querys, type, function(data){
        var htmlTemplateRoute = 'editPage/tab_list_' + type + '.html',
            html = [];
        mu.compileAndRender(htmlTemplateRoute, {data: data})
            .on('data', function(chunk) {
                html.push(chunk);
            })
            .on('end', function() {
                html = html.join("");
                res.json({
                    html        : html.toString(),
                    detailData  : data,
                    type        : type
                });
            });
    });
});


/* 编辑页面的spot详情 */
router.post('/spotInfo', function(req, res) {
    var postData = req.body,
        type = postData.type,
        id = postData.id,
        requestUrl = selectUrlForSpotInfo(type);
    console.log(requestUrl + id);
    if (requestUrl) {
        var options = {
            url: requestUrl + id,
            method: 'GET'
        };

        request(options, function(err, respond, data) {
            if (err) {
                throw err;
            }
            if(!utils.checkApiRequestState(data)) {
                console.log("==== api request error ====");
                console.log("request url: ");
                console.log(requestUrl + id);
                res.json({
                    state : 0,
                });
            }
            var spotInfo = extractDataForspotInfo(JSON.parse(data), type),
                htmlTemplateRoute = 'editPage/spot_pop_window_' + type + '.html',
                html = [];
            mu.compileAndRender(htmlTemplateRoute, {data: spotInfo})
                .on('data', function(chunk) {
                    html.push(chunk);
                })
                .on('end', function() {
                    html = html.join("");
                    res.json({
                        state : 0,
                        html  : html.toString(),
                        // detailData: data
                    });
                });
            //res.json(spotInfo);
        });
    };

});


/*
  detail页面的ajax请求
  TODO: move to detail page
*/
router.post('/detail', function(req, res) {
    var postData = req.body,
        type = postData.type,
        id = postData.id,
        requestUrl = selectUrlForSpotInfo(type);
    if (requestUrl) {
        var options = {
            url: requestUrl + id,
            method: 'GET'
        };
        console.log("请求的链接:");
        console.log(requestUrl + id);
        request(options, function(err, respond, data) {
            if (err) {
                throw err;
            }
            console.log('请求返回数据:');
            console.log(data);
            if(!utils.checkApiRequestState(data)) {
                console.log("==== api request error ====");
                console.log("request url: ");
                console.log(requestUrl + id);
                /* render error page */
                res.json({
                    state : 0,
                });
            }
            var spotInfo = extractDataForspotInfo(JSON.parse(data), type),
                htmlTemplateRoute = 'detailPage/slider_' + type + '.html',
                html = [];
            if (!spotInfo) {
                console.log('没有数据');
                return ;
            };
            mu.compileAndRender(htmlTemplateRoute, {data: spotInfo})
                .on('data', function(chunk) {
                    html.push(chunk);
                })
                .on('end', function() {

                    html = html.join("");
                    console.log(html.toString());
                    res.json({
                        state : 0,
                        html  : html.toString(),
                    });
                });
        });
    };

});

/* edit post request */
router.post('/submit', function(req, res) {
    console.log('in......');
    var submitData      = req.body,
        spotsInfo       = submitData.spots,
        ugcId           = submitData.id,
        templateId      = submitData.templateId;
    console.log('-=-=-=-=-=-=-=输出结果-=-=-=-=-=-=-=-');
    var data = processSubmitData(submitData);
    console.log('-=-=-=-=-=-=-=输出结果-=-=-=-=-=-=-=-');
    console.log(data);
    var options = {
        url : apiList.apiHost + apiList.ugc.saveUgc,
        json: data,
        method: 'POST',
    };
    console.log('-=-=-=-=-=-=-请求结果-=-=-=-=-=-=-=-');
    request(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.json(result);
    });
    //获得ugc信息
    // var requestUrl = apiList.apiHost + apiList.ugc.getUgcByIdNone + ugcId;
    // console.log(requestUrl);
    // model.setUrl(encodeURI(requestUrl));
    // model.getdata(null, function(data) {

});


/*
 * get tab list : viewspot | hotel | resturant | traffic
 */
function getListContent(querys, type, callback) {
    var requestUrl = selectUrlForSpotsInCity(type);
    var options = {
        url: requestUrl,
        qs: querys,
        method: 'GET'
    };

    request(options, function(err, respond, data) {
        if (err) {
            throw err;
        }

        callback(extractData(JSON.parse(data), type));
    });
}

/*
 * for detail page
 * TODO : move to detail
 */
function selectUrlForSpotInfo(type) {
    var requestUrl = '';
    console.log('spot type is: ' + type);
    switch(type) {
        case 'viewspot':
            requestUrl = 'http://api.lvxingpai.cn/web/poi/view-spots/';
            break;
        case 'vs':
            requestUrl = 'http://api.lvxingpai.cn/web/poi/view-spots/';
            break;
        case 'restaurant':
            requestUrl = '';
            break;
        case 'hotel':
            requestUrl = 'http://api.lvxingpai.cn/web/poi/hotels/';
            break;
        case 'shopping':
            requestUrl = '';
            break;
        case 'trainStation':
            requestUrl = 'http://api.lvxingpai.cn/web/itineraries/trainstation/';
            break;
        case 'airport':
            requestUrl = 'http://api.lvxingpai.cn/web/itineraries/airport/';
            break;

        default:
            console.log('type is not correct');
            break;
    }
    return requestUrl;
}

/* for edit page tab list */
function selectUrlForSpotsInCity(type) {
    var requestUrl = '';
    switch(type) {
        case 'viewspot':
            requestUrl = 'http://api.lvxingpai.cn/web/poi/view-spots/search';
            break;
        case 'vs':
            requestUrl = 'http://api.lvxingpai.cn/web/poi/view-spots/search';
            break;
        case 'restaurant':
            requestUrl = '';
            break;
        case 'hotel':
            requestUrl = 'http://api.lvxingpai.cn/web/poi/hotels/search';
            break;
        case 'shopping':
            requestUrl = '';
            break;
        case 'traffic':
            requestUrl = '';
            break;
        default:
            console.log('type is not correct');
            break;
    }
    return requestUrl;
}

/* for edit page */
function extractData(data, type) {
    var result = data.result,
        extractedData = [];
    for(var key in result) {
        var tempObject = {},
            oneElement = result[key];
        tempObject.id = oneElement.id;
        tempObject.name = oneElement.zhName;
        tempObject.image = oneElement.images ? (oneElement.images.length ? oneElement.images[0].url : " ") : " ";
        tempObject.ranking = oneElement.ratings;
        tempObject.timeCost = oneElement.timeCost;
        tempObject.lng = oneElement.location.coordinates ? oneElement.location.coordinates[0] : '';
        tempObject.lat = oneElement.location.coordinates ? oneElement.location.coordinates[1] : '';
        tempObject.price = oneElement.price ? oneElement.price : "没有价格";
        tempObject.type = type;
        extractedData.push(tempObject);
    }
    console.log(extractedData);
    return extractedData;
}

/* for edit page, map marker pop window info */
function extractDataForspotInfo(data, type) {
    if(!data) {
        return;
    }
    var usefulData = null;
    if(type){
        switch (type) {
            case 'viewspot':
                usefulData = extractViewSpotInfo(data, type);
                break;
            case 'hotel':
                usefulData = extractHotelInfo(data, type);
                break;
            case 'trainStation':
                usefulData = extractTrafficInfo(data, type);
                break;
            case 'airport':
                usefulData = extractTrafficInfo(data, type);
                break;
            default:
                break;
        }
    }
    console.log(usefulData);
    return usefulData;
}

/* viewspot info */
function extractViewSpotInfo(data, type) {
    var result = data.result,
        tempObject = {};
    tempObject.id           = result._id;
    tempObject.name         = result.name || result.zhName;
    tempObject.image        = result.imageList ? (result.imageList.length ? result.imageList[0] : " ") : " ";
    tempObject.imageList    = result.imageList;
    tempObject.imageList    = arrayToKVArray('image', tempObject.imageList);
    // ranking is a array,like ['o', 'o']. the same as reverse_ranking
    // do this just want to use loop in mustache
    tempObject.ranking      = getStrArray(Math.ceil(result.ratings.ranking * 5));
    tempObject.reverse_ranking = getStrArray(5 - Math.ceil(result.ratings.ranking * 5));
    tempObject.timeCost     = result.timeCost;
    tempObject.lng          = result.addr ? result.addr.lng : '';
    tempObject.lat          = result.addr ? result.addr.lat : '';
    tempObject.price        = result.priceDesc ? result.priceDesc : "没有价格";
    tempObject.type         = type;
    tempObject.openTime     = result.openTime;
    tempObject.desc         = result.desc ? result.desc : "抱歉，还没有相关介绍";
    tempObject.tips         = result.description ? (result.description.tips ? result.description.tips : "抱歉，还没有tips") : "抱歉，还没有tips";
    tempObject.traffic      = result.trafficInfo ? result.trafficInfo : "抱歉，还没有交通提示";
    return tempObject;
}

/* hotel info */
function extractHotelInfo(data, type) {
    var result = data.result,
        tempObject = {};
    tempObject.id           = result._id;
    tempObject.name         = result.name;
    tempObject.type         = type;
    tempObject.lng          = result.addr ? result.addr.lng : '';
    tempObject.lat          = result.addr ? result.addr.lat : '';
    tempObject.image        = result.imageList ? (result.imageList.length ? result.imageList[0] : " ") : " ";
    tempObject.imageList    = result.imageList;
    tempObject.imageList    = arrayToKVArray('image', tempObject.imageList);
    // get array for loop in mustache
    tempObject.starLevel    = getStrArray(result.ratings.starLevel);
    tempObject.reverse_starLevel = getStrArray(5 - result.ratings.starLevel);
    tempObject.desc         = result.desc ? result.desc : "抱歉，还没有相关介绍";

    var phoneList = result.contact ? (result.contact.phoneList ? ( result.contact.phoneList) : "") : "";
    _.isArray(phoneList) ? (tempObject.phone = phoneList[0]) : (tempObject.phone = '暂无')
    return tempObject;
}

/* traffic info: airpart | trainStation */
function extractTrafficInfo(data, type) {
    var result      = data.result,
        tempObject  = {};
    tempObject.name = result.zhName;
    tempObject.desc = result.desc;
    return tempObject
}

/* process edit page data to save the ugc */
function processSubmitData(submitData) {
    if(submitData == null) {
        return null;
    }
    var tempObj         = {};
    tempObj.uid         = submitData.userId;
    tempObj.title       = submitData.title;


    tempObj.startDate   = moment(submitData.startTime).format('YYYY-MM-DD HH:mm:ssZZ');
    tempObj.action      = 'upsert';
    tempObj.templateId  = submitData.templateId;
    tempObj._id         = submitData.id;
    tempObj.viewBudget  = 250;
    tempObj.timestamp   = '';
    tempObj.seq         = '';
    tempObj.trafficBudget = 250;

    var len = 0;
    _.isArray(submitData.spots) ? len = submitData.spots.length : 0
    tempObj.endDate     = moment(submitData.startTime).add(len - 1, 'day').format('YYYY-MM-DD HH:mm:ssZZ');
    tempObj.stayBudget  = 250;
    details_row_1     = assembleSpotData(submitData.spots, submitData.startTime);
    trafficProRes     = assembleTrafficData(submitData.trafficData, submitData.dayDiff, submitData.startTime);
    console.log('---====---');
    details_row_2       = trafficProRes.traffic
    tempObj.fromLoc     = trafficProRes.fromLoc;
    tempObj.details   = details_row_1.concat(details_row_2);
    tempObj.budget      = [250, 550];
    tempObj.v           = '1.1.0';
    return tempObj;
}


/* process edit page data to save the ugc: process spot data */
function assembleSpotData(spotData, startTime){
    if(spotData == null) return [];
    if(!(_.isArray(spotData))) return [];
    var tempArr  = [],
        time     = startTime,
        tempTime = moment(startTime).format('YYYY-MM-DD HH:mm:ssZZ');
    for(index in spotData){
        var oneDay = spotData[index];
        if(_.isArray(oneDay)){
            var timeFlay = 1;
            for(i in oneDay){
                var curSpot = oneDay[i],
                    type    = curSpot.type,
                    tempObj = {};
                switch(type) {
                    case 'airport':
                        tempObj.subType     = 'airport';
                        tempObj.type        = 'traffic';
                        tempObj.itemId      = curSpot.id;
                        //tempObj.fromLoc     = curSpot.locId;
                        tempObj.st          = tempTime;
                        tempObj.ts          = tempTime;
                        tempArr.push(tempObj);
                        break;
                    case 'trainRoute':
                        tempObj.subType     = 'trainStation';
                        tempObj.type        = 'traffic';
                        tempObj.itemId      = curSpot.id;
                        //tempObj.fromLoc     = curSpot.locId;
                        tempObj.st          = tempTime;
                        tempObj.ts          = tempTime;
                        tempArr.push(tempObj);
                        break;
                    case 'hotel':
                        tempObj.type        = 'hotel';
                        tempObj.itemId      = curSpot.id;
                        tempObj.st          = tempTime;
                        tempArr.push(tempObj);
                        break;
                    case 'restaurant':
                        tempObj.type        = 'restaurant';
                        tempObj.itemId      = curSpot.id;
                        tempObj.st          = tempTime;
                        tempArr.push(tempObj);
                        break;
                    case 'viewspot':
                        tempObj.type        = 'vs';
                        tempObj.itemId      = curSpot.id;
                        tempTime = moment(tempTime).add(1, 'h').format('YYYY-MM-DD HH:mm:ssZZ');
                        tempObj.st          = tempTime;
                        tempArr.push(tempObj);
                        break;
                    default:
                        break;
                }
            }
        }
        tempTime = moment(startTime).add(parseInt(index) + 1, 'day').format('YYYY-MM-DD HH:mm:ssZZ');
    }
    // 删掉所有的交通数据,注意后项for循环
    for(var index = tempArr.length - 1; index >= 0; index--){
        var curEle = tempArr[index];

        if(curEle.type == 'traffic') {
            tempArr.splice(index, 1);
        }
    }
    return tempArr;
}


/* process edit page data to save the ugc: process traffic data */
function assembleTrafficData(trafficData, dayDiff, startTime) {
    var tempArr = [],
        sTime   = startTime,
        dDiff   = parseInt(dayDiff);

    if(!_.isArray(trafficData) || trafficData.length === 0) {
        return {
            traffic: [],
            fromLoc: ''
        };
    }

    var oldStartTime = moment(trafficData[0].ts);
    var fromLoc      = trafficData[0].locId;
    var newStartTime = moment(sTime);
    var dayGap       = newStartTime.diff(oldStartTime, 'day');
    for(index in trafficData) {
        var tempObj     = {},
            curEle      = trafficData[index];
        tempObj.type    = curEle.type;
        tempObj.subType = curEle.subType;
        tempObj.itemId  = curEle.itemId;


        if(index < 3) {
            tempObj.st  = moment(curEle.ts).add(dayGap, 'd').format('YYYY-MM-DD HH:mm:ssZZ');
            // 标注是否转乘
            tempObj.transfer = 'no.from';
        } else {
            tempObj.st  = moment(curEle.ts).add(dayGap + dDiff, 'd').format('YYYY-MM-DD HH:mm:ssZZ');
            // 标注是否转乘
            tempObj.transfer = 'no.back';
        }
            tempObj.ts = tempObj.st;

        switch(tempObj.subType) {
            case 'airRoute':
            case 'trainRoute':
                tempObj.arrStop = curEle.arrStop;
                tempObj.depStop = curEle.depStop;
                break;
            default:
                break;
        }

        tempArr.push(tempObj);
    }
    return {
        traffic: tempArr,
        fromLoc: fromLoc
    };
}


module.exports = router;