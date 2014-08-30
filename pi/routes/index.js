var express = require('express');
var router = express.Router();
var async = require('async');
var urlApi = require('../url_api');
var hotRoute = require('../model/hot_route');
var mustgoRoute = require('../model/mustgo_route');
var newestRoute = require('../model/newest_route');
var recommondRoute = require('../model/recommond_route');


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



router.get('/plans/', function(req, res) {
  res.render('plans');
});

router.get('/download/', function(req, res) {
  res.render('download');
});

router.get('/target/', function(req, res){
  res.render('target');
});
module.exports = router;
