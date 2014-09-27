//<meta charset="utf-8"/>
var express = require('express');
var router = express.Router();
var async = require('async');
var urlApi = require('../url_api');
var request = require('request')
var model = require('../model/sup_model.js');


//  时间轴的景点详情弹层
router.get('/detail/:SPOTID', function(req, res) {
    model.setUrl(urlApi.apiHost + urlApi.viewspot.detail); 
    model.getdata(req, function(data){
        res.json(JSON.parse(data));
    });
});


// 路线编辑的搜索景点
router.post('/search', function(req, res) {
    var text = req.body.searchText;
    var requestUrl = urlApi.apiHost + urlApi.searchViewspotByName + encodeURI(text);
    model.setUrl(requestUrl); 
    model.getdata(null, function(data){
        res.json(JSON.parse(data));
    });
}); 


// 路线编辑 ajax请求更多
router.post('/ajax/more', function(req, res) {
    var text = req.body.searchText,
        page = req.body.page;
        
    var requestUrl = urlApi.apiHost + urlApi.searchViewspot + "keyword=" + encodeURI(text) + "&page=" + encodeURI(page);
    console.log(requestUrl);

    model.setUrl(requestUrl);
    model.getdata(null, function(data){
        res.json(JSON.parse(data));
    });
});

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
