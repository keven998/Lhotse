var request = require('request'); 

var base_model = function(){
  var self = this;
  this.originUrl = null;
  this.urls = null;

  // 获取urls
  this.getUrls = function() {
    return this.urls;
  }
 
  // 配置urls
  this.setUrls = function(urls) {
    this.urls = urls;
    this.originUrl = urls;
  } 

  this.say = function() {
    console.log('hi');
  }

  
  // 请求数据
  this.get = function(callback) {
    console.log(this.getUrls());
    request(this.getUrls(), function(err, res, data) {
      if (err) {
        throw err;
      }
      callback(data);
    });
  }

  // 获取所有query参数
  this.parseQuery = function(req) {
    if (req == null)
      return {};
    var querys = req.query;
    var params = req.params;
    var form = {};	// e.x. {id:1, name:'10086', type:'mobile'}
  
    for (query in querys) {
      form[query] = querys[query];
    }
    for (param in params) {
      form[param] = params[param];
    }
    //console.log(form); 
    return form;
  }

  // 组建url api
  this.buildUrl = function(req) {
    this.urls = this.originUrl;
    // 获取所有的url参数
    var form = this.parseQuery(req);
    var temp = this.urls;
     
    for (substr in form) {
      temp = temp.replace(substr, form[substr]);
    } 
    this.urls = temp;
    return this;
  }  
  
  // 显示url
  this.dispUrl = function() {
    console.log(this.urls);
  }
  
};




module.exports = base_model;
