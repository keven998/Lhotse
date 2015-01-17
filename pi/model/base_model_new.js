var request = require('request');
var _ = require('underscore');


var BaseModel = function(){
    var self = this;
    self.apiHost = 'http://api.lvxingpai.cn'
    self.url = '';
    self.required_query = [];
    self.not_required_query = [];
    self.url_param = [];

    self.setUrl = function(url) {self.url = self.apiHost + url;}
    self.getUrl = function() {return self.url;}

    self.setRequiredQuery = function(required_query) {self.required_query = required_query;}
    self.getRequiredQuery = function() { console.log(self.required_query); return self.required_query;}

    self.setNotRequiredQuery = function(not_required_query) {self.not_required_query = not_required_query;}
    self.getNotRequiredQuery = function() { console.log(self.not_required_query); return self.not_required_query;}

    self.setUrlParam = function(url_param) {self.url_param = url_param;}
    self.getUrlParam = function() { console.log(self.url_param); return self.url_param;}

    self.say = function() {console.log('hi');}

    self.getData = function(args, callback) {
        var check = self.checkUrl(args.query);
        if(check.succ){
            request(self.buildUrl(args), function(err, res, data) {
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

    self.checkUrl = function(query){
        var succ = true
        var unknown_query = []
        var miss_query = []
        var query_list = _.map(query, function(k, v){ return v;});
        var msg = '';

        _.map(query_list, function(user_query){
            if(!_.contains(_.union(self.required_query, self.not_required_query), user_query)){
                unknown_query.push(user_query);
                succ = false;
            }
        })

        _.map(self.required_query, function(require_query){
            if(!_.contains(query_list, require_query)){
                miss_query.push(require_query)
                succ = false;
            }
        })

        if(miss_query.length > 0){
            msg += 'Missing required query: ' + miss_query.toString() + '.';
        }
        if(unknown_query.length > 0){
            msg += 'Unknown query: ' + unknown_query.toString() + '.';
        }
        return {succ: succ, data: msg}
    }

    // self._checkRequiredQuery = function(required_query){
    // }

    // self._checkNotRequiredQuery = function(not_required_query){
    // }

    // self._checkUrlParam = function(url_param){
    // }

    self.buildUrl = function(args){
        var url = self.url + '?'
        _.map(args.query, function(value, query){
            url += query + '=' + value + '&'
        })
        return url.slice(0, -1)
    }  

    return self;
};

module.exports = BaseModel;
