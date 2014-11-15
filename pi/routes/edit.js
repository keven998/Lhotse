var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var config = require('../conf/system');
var zone = require('../conf/zone');

// 新方法
var model = require('../model/sup_model.js');
var apiList = require('../url_api');
var utils = require( "../common/utils");

router.post('/ajaxList', function(req, res) {
    console.log('oh, I\'m not ready');
    var postData = req.body;

    getList(postData, function(data){
        console.log(data);
        res.json(data);
    });

    console.log(postData);
});

function getList(postData, callback) {
    var requestUrl = '',
        type = postData.type,
        data = postData.option;

    requestUrl = selectUrl(type);

    var options = {
        url: requestUrl,
        form: data,
        method: 'get',
    };

    request.get(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
        callback(result);
    });
}

function selectUrl(type) {
    var requestUrl = ''
    switch(type) {
        case 'spotview':
            requestUrl = 'http://api.lvxingpai.cn/web/poi/view-spots/search';
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
    console.log(requestUrl);
    return requestUrl;
}

module.exports = router;