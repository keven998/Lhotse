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
    request(this.getUrls(), function(err, res, data) {
      if (err) {
        throw err;
      }
      callback(data);
    });
  }

  // 请求数据
    this.cleanGet = function(callback) {
        request(this.getUrls(), function(err, res, data) {
            var error_msg = '';
            var succ = false;
            if (err){
                console.log('err say');
                console.log(err);
                error_msg = err;
            }
            else if (data !== null) {
                if (data.indexOf("!DOCTYPE") != -1){
                    error_msg = "The api return a error html page.";
                }else{
                    data = JSON.parse(data).result;
                    succ = true;
                }
            } else {
                error_msg = "The data is null.";
            }
            callback({succ: succ, data: error_msg? error_msg : data})
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
    return form;
  }

  // 组建url api
  this.buildUrl = function(req) {
    this.urls = this.originUrl;
    // 获取所有的url参数
    var form = this.parseQuery(req);
    var temp = this.urls;
     
    for (substr in form) {
      if (temp){
        temp = temp.replace(substr, form[substr]);
      }
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
