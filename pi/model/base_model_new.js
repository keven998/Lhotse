var request = require('request');
var _ = require('underscore');


var BaseModel = function(){
    var self = this;
    self.apiHost = 'http://api.lvxingpai.cn'
    self.url = '';
    self.param = [];

    self.getUrl = function() {return self.url;}
 
    self.setUrl = function(url) {self.url = self.apiHost + url;}

    self.setParam = function(param) {self.param = param;}

    self.say = function() {console.log('hi');}

    self.getData = function(param, callback) {
        var check = self.checkParam(param);
        if(check.succ){
            request(self.buildUrl(param), function(err, res, data) {
                var error_msg = '';
                var succ = false;
                if(err){
                    error_msg = err;
                }else if(data !== null) {
                    if (data.indexOf("!DOCTYPE") != -1){
                        error_msg = "The api return a error html page.";
                    }else{
                        data = JSON.parse(data).result;
                        succ = true;
                    }
                }else{
                    error_msg = "The data is null.";
                }
                callback({succ: succ, data: error_msg? error_msg : data})
            });
        }else{
            callback({succ: false, data: check.data})
        }
        
    }

    self.checkParam = function(param){
        var succ = true
        var not_in_array = []
        var missing_array = []
        var param_list = _.map(param, function(v, k){ return v;});
        for(k in param_list){
            if(_.contains(self.param, k)){
                not_in_array.push(k);
                succ = false;
            }
        }
        for(k in self.param){
            if(_.contains(param_list, k)){
                missing_array.push(k)
                succ = false;
            }
        }
        return {succ: succ, data: 'missing param:' + missing_array.toString() + 'not in:' + not_in_array.toString()}
    }

    self.buildUrl = function(param){
        var url = self.url + '?'
        for(key in param){
            url += key + '=' + param[key] + '&'
        }
        return url.slice(0, -1)
    }  

    return self;
};

module.exports = BaseModel;
