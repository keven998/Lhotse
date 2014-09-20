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
      var indexGoUrl = "http://api.lvxingpai.cn/web/plans/explore?loc=" + arriveId + "&fromLoc=" + fromId + "&tag=&minDays=0&maxDays=99";
      model.setUrl(encodeURI(indexGoUrl));
      model.getdata(null, function(data){
        data = JSON.parse(data);
        res.render('plans', {
          plans : data.result,
          fromName : fromLocName,
          arriveId : arriveId,
          fromId : fromId,  // 用于配置“复制路线”的url
          arriveName : arrLocName,
        });
      });  
  });
});

router.get('/download/', function(req, res) {
  res.render('download');
}); 

router.get('/target/', function(req, res){
  async.parallel(
    {
      hotCities: function(callback) {
        model.setUrl(urlApi.apiHost+urlApi.hotCities);
        model.getdata(req, function(data){
          data = JSON.parse(data);
          callback(null, data);
        });
      },
      hotViews: function(callback) {
        model.setUrl(urlApi.apiHost+urlApi.hotViews);
        model.getdata(req, function(data){
          data = JSON.parse(data);
          callback(null, data);
        });
      },
    },
    function(err, results) {
      var cityList = new Array(),
          viewList = new Array();
      for (var i=0;i<8;i++){
        var city = results.hotCities.result.loc[i];
        cityList.push({
          name: city.name,
          img:  city.imageList[0],
        });
      }
      for (var i=0;i<8;i++){
        var view = results.hotViews.result[i];
        viewList.push({
          name: view.name,
          img:  view.imageList[0],
        });
      }
      console.log({
        hotCities : cityList,
        hotViews  : viewList,
      });
      res.render('target', {
        hotCities : cityList,
        hotViews  : viewList,
      });
    }
  );
});

//  联想功能
router.get('/suggestion', function(req, res){
  var tempInput = req.query.input;
  // 如果未有输入则推送空
  if (tempInput == "") {
    res.json();
  } 
  else {
    var requestUrl = "http://api.lvxingpai.cn/web/suggestions?restaurant=0&vs=1&hotel=0&loc=1&word=" + tempInput;
    model.setUrl(encodeURI(requestUrl));
    model.getdata(null, function(data){
      var result = JSON.parse(data).result;
      var suggestionArray = new Array();
      for (type in result) {
        var arrData = result[type];
        for (var i = 0; i < arrData.length; i++) {
          var tempName = arrData[i].name;
          suggestionArray.push(tempName);
        }
      }
      res.json({suggestion: suggestionArray});
    });
  }
});

// 联想推荐开关
var suggestion = function () {
  
}


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
