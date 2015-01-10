var base_model = require('./base_model');
var urlSelect = require('../url_api');
 

function api_model(){}

// 继承
api_model.prototype = new base_model();

// 构造函数
api_model.prototype.constructor = api_model;

// 获取数据
api_model.getdata = function(req, callback) {
    return api_model.prototype.buildUrl(req).get(callback);
}

// 获取检测过数据
api_model.getCleanData = function(req, callback) {
    return api_model.prototype.buildUrl(req).cleanGet(callback);
}

// 配置url
api_model.setUrl = function(url) {
  api_model.prototype.setUrls(url);
}

// 返回url
api_model.getUrl = function() {
   return api_model.prototype.getUrls();
}

// print url
api_model.consoleUrl = function() {
   console.log(api_model.prototype.getUrls());
}
module.exports = api_model;
