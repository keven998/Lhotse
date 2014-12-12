var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var config = require('../conf/system');
var zone = require('../conf/zone');
var mu = require('mu2');
var utils = require("../common/utils");
var _ = require('underscore');
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
    console.log(querys);
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
                    html: html.toString(),
                    detailData: data
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
        console.log('edit page tab list data:');
        console.log(data);

        callback(extractData(JSON.parse(data), type));
    });
}

/* for detail page */
function selectUrlForSpotInfo(type) {
    var requestUrl = '';
    console.log('type is: ' + type);
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
            requestUrl = 'http://api.lvxingpai.com/web/poi/view-spots/search';
            break;
        case 'vs':
            requestUrl = 'http://api.lvxingpai.com/web/poi/view-spots/search';
            break;
        case 'restaurant':
            requestUrl = '';
            break;
        case 'hotel':
            requestUrl = '';
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
        tempObject.id = oneElement._id,
        tempObject.name = oneElement.name,
        tempObject.image = oneElement.imageList ? (oneElement.imageList.length ? oneElement.imageList[0] : " ") : " ",
        tempObject.ranking = oneElement.ratings ? oneElement.ratings.ranking : 0,
        tempObject.timeCost = oneElement.timeCost,
        tempObject.lng = oneElement.addr ? oneElement.addr.lng : '',
        tempObject.lat = oneElement.addr ? oneElement.addr.lat : '',
        tempObject.price = oneElement.price ? oneElement.price : "没有价格";
        tempObject.type = type;
        extractedData.push(tempObject);
    }
    return extractedData;
}

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
    console.log('-=-=-=');
    console.log(usefulData);
    return usefulData;
}

/* viewspot info */
function extractViewSpotInfo(data, type) {
    var result = data.result,
        tempObject = {};
    tempObject.id           = result._id;
    tempObject.name         = result.name;
    tempObject.image        = result.imageList ? (result.imageList.length ? result.imageList[0] : " ") : " ";
    tempObject.imageList    = result.imageList;
    tempObject.imageList    = arrayToKVArray('image', tempObject.imageList);
    tempObject.ranking      = getStrArray(Math.ceil(result.ratings.ranking * 5));
    tempObject.reverse_ranking = getStrArray(5 - Math.ceil(result.ratings.ranking * 5));
    tempObject.timeCost     = result.timeCost;
    tempObject.lng          = result.addr ? result.addr.lng : '';
    tempObject.lat          = result.addr ? result.addr.lat : '';
    tempObject.price        = result.price ? result.price : "没有价格";
    tempObject.type         = type;
    tempObject.desc         = result.description ? result.description.desc : "抱歉，还没有相关介绍";
    tempObject.tips         = result.description ? (result.description.tips ? result.description.tips : "抱歉，还没有tips") : "抱歉，还没有tips";
    tempObject.traffic      = result.description ? (result.description.traffic ? result.description.traffic : "抱歉，还没有交通提示") : "抱歉，还没有交通提示";
    return tempObject;
}

/* hotel info */
function extractHotelInfo(data, type) {
    var result = data.result,
        tempObject = {};
    tempObject.id           = result._id;
    tempObject.name         = result.name;
    tempObject.image        = result.imageList ? (result.imageList.length ? result.imageList[0] : " ") : " ";
    tempObject.imageList    = result.imageList;
    tempObject.imageList    = arrayToKVArray('image', tempObject.imageList);
    // get array for loop in mustache
    tempObject.starLevel    = getStrArray(result.ratings.starLevel);
    tempObject.reverse_starLevel = getStrArray(5 - result.ratings.starLevel);
    tempObject.desc         = result.desc ? result.desc : "抱歉，还没有相关介绍";

    var phoneList = result.contact ? (result.contact.phoneList ? ( result.contact.phoneList) : "") : "";
    _.isArray(phoneList) ? (tempObject.phone = phoneList[0]) : (tempObject.phone = '暂无')
    console.log(tempObject);
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



module.exports = router;