var express = require('express');
var router = express.Router();

// 新方法
var model = require('../model/sup_model.js');
var apiList = require('../url_api');

router.get('/detail/:ROUTEID', function(req, res) { 
  model.setUrl(apiList.apiHost + apiList.routePageDetail);
  model.getdata(req, function(data) {
    console.log("复制路线的Url:" + model.getUrl());
    data = JSON.parse(data);
    console.log(data);
        
    res.render('route/detail', data);
  })
})  

module.exports = router;
