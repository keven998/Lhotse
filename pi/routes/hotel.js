var express = require('express');
var router = express.Router();
var async = require('async');
var apiList = require('../url_api');
var request = require('request')
var model = require('../model/sup_model.js');


// 路线编辑的搜索酒店
router.post('/search', function(req, res) {
    var text = req.body.searchText;
    var requestUrl = apiList.apiHost + apiList.searchHotelByName + encodeURI(text);
    model.setUrl(requestUrl);
    model.getdata(null, function(data){
        res.json(JSON.parse(data));
    });
});


// 路线编辑中的搜索酒店的ajax请求更多
router.post('/ajax/more', function(req, res) {
    var text = req.body.searchText,
        page = req.body.page;
        
    var requestUrl = apiList.apiHost + apiList.searchHotel + "keyword=" + encodeURI(text) + "&page=" + encodeURI(page);
    console.log(requestUrl);
    model.setUrl(requestUrl);
    model.getdata(null, function(data){
        res.json(JSON.parse(data));
    });
});


module.exports = router;
