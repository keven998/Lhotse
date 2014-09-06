//<meta charset="utf-8"/>
var express = require('express');
var router = express.Router();
var async = require('async');
var urlApi = require('../url_api');
var hotRoute = require('../model/hot_route');
var mustgoRoute = require('../model/mustgo_route');
var newestRoute = require('../model/newest_route');
var recommondRoute = require('../model/recommond_route');
var plans = require('../model/plans');
var request = require('request')
var model = require('../model/sup_model.js');


router.get('/', function(req, res) {
  async.parallel({
    hotRoute: function(callback) {
      hotRoute.getdata(req, function(data){
        callback(null, data);
      });
    },
    mustgoRoute: function(callback) {
      mustgoRoute.getdata(req, function(data){
        callback(null, data);
      });
    },
    newestRoute: function(callback) {
      mustgoRoute.getdata(req, function(data){
        callback(null, data);
      });
    },
    recommondRoute: function(callback) {
      recommondRoute.getdata(req, function(data){
        callback(null, data);
      });
    },
    }, 
    function(err, results) {
      console.log('---DATA---');      
      results.hotRoute = JSON.parse(results.hotRoute);
      results.mustgoRoute = JSON.parse(results.mustgoRoute);
      results.newestRoute = JSON.parse(results.newestRoute);
      results.recommondRoute = JSON.parse(results.recommondRoute);
      res.render('index', {
        //现在只展示hotRoute
        hotRoute: results.hotRoute.result,
        mustgoRoute: results.mustgoRoute.result,
        newestRoute: results.newestRoute.result,
        recommondRoute: results.recommondRoute.result,
      });       
  });
});

router.get('/plans/:LOCALID', function(req, res){
  plans.getdata(req, function(data){
    res.render('plans', {plans: JSON.parse(data).result});
  });
});

router.get('/search', function(req, res){
  var fromLocName = req.query.fromLocName;
  var arrLocName = req.query.arrLocName; 
  var queryFromName = urlApi.searchCityIdByName + fromLocName;
  var queryArrName = urlApi.searchCityIdByName + arrLocName;
  async.parallel({
    from: function(callback) {
      model.setUrl(encodeURI(queryFromName));
      model.getdata(req, function(data){
        data = JSON.parse(data);
        var id = selectCityId(data.result);
        callback(null, id);
      });
    },
    arrive: function(callback) {
      model.setUrl(encodeURI(queryArrName));
      model.getdata(req, function(data){
        data = JSON.parse(data);
        var id = selectCityId(data.result);
        callback(null, id);
      });
    },
    },
    function(err, results) {
      var fromId = results.from;
      var arriveId = results.arrive;
      //console.log(fromId + arriveId);
      var indexGoUrl = "http://api.lvxingpai.cn/web/plans/explore?loc=" + arriveId + "&fromLoc=" + fromId + "&tag=&minDays=0&maxDays=99";
      model.setUrl(encodeURI(indexGoUrl));
      model.getdata(null, function(data){
        data = JSON.parse(data);
        //res.send(data);
        res.render('plans', {
        plans : data.result,
        from : fromLocName,
        fromId : fromId,  // 用于配置“复制路线”的url
        to : arrLocName,
        });
      });  
  });
});

router.get('/download/', function(req, res) {
  res.render('download');
}); 

router.get('/target/', function(req, res){
  res.render('target');
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
