var request = require('request');
var _ = require('underscore');


var BaseModel = function(){
    var self = this;
    self.apiHost = 'http://api.lvxingpai.cn'
    self.url = '';
    self.required_query = [];
    self.default_not_required_query = ['page', 'pageSize'];
    self.not_required_query = [];
    self.url_param = [];

    self.setUrl = function(url) {self.url = self.apiHost + url;}
    self.getUrl = function() {return self.url;}

    self.setRequiredQuery = function(required_query) {self.required_query = required_query;}
    self.getRequiredQuery = function() { console.log(self.required_query); return self.required_query;}

    self.setNotRequiredQuery = function(not_required_query) {self.not_required_query = _.union(not_required_query, self.default_not_required_query);}
    self.getNotRequiredQuery = function() { console.log(self.not_required_query); return self.not_required_query;}

    self.setUrlParam = function(url_param) {self.url_param = url_param;}
    self.getUrlParam = function() { console.log(self.url_param); return self.url_param;}

    self.say = function() {console.log('hi');}

    self.getData = function(args, callback) {
        var check = self.checkUrl(args);
        if(check.succ){
            request(self.buildUrl(args), function(err, res, data) {
                var error_msg = '';
                var succ = false;
                if(err){
                    error_msg = err;
                }else if(data !== null) {
                    if (data.indexOf("!DOCTYPE") != -1){
                        error_msg = "Error: The server return an error html page.";
                    }else{
                        data = JSON.parse(data).result;
                        succ = true;
                    }
                }else{
                    error_msg = "Error: The server return an empty data.";
                }
                callback({succ: succ, data: error_msg? error_msg : data})
            });
        }else{
            callback({succ: false, data: check.data})
        }
        
    }

    self.checkUrl = function(args){
        query_check_result = self._checkQuery(args.query)
        url_param_check_result = self._checkUrlParam(args.url_param)
        if(!query_check_result.succ || !url_param_check_result.succ){
            return {succ: false, data: url_param_check_result.data + query_check_result.data}
        }
        return {succ: true, data: url_param_check_result.data + query_check_result.data}
    }

    self._checkQuery = function(query){
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
            msg += 'Missing required query: ' + miss_query.toString() + '. ';
        }
        if(unknown_query.length > 0){
            msg += 'Unknown query: ' + unknown_query.toString() + '. ';
        }
        return {succ: succ, data: msg}
    }

    self._checkUrlParam = function(url_param){
        var succ = true
        var unknown_url_param = []
        var miss_url_param = []
        var url_param_list = _.map(url_param, function(k, v){ return v;});
        var msg = '';

        _.map(url_param_list, function(url_param){
            if(!_.contains(self.url_param, url_param)){
                unknown_url_param.push(url_param);
                succ = false;
            }
        })

        _.map(self.url_param, function(url_param){
            if(!_.contains(url_param_list, url_param)){
                miss_url_param.push(url_param)
                succ = false;
            }
        })

        if(miss_url_param.length > 0){
            msg += 'Missing url param: ' + miss_url_param.toString() + '. ';
        }
        if(unknown_url_param.length > 0){
            msg += 'Unknown url param: ' + unknown_url_param.toString() + '. ';
        }
        return {succ: succ, data: msg}
    }

    self.buildUrl = function(args){
        var url = self.url

        // build with url param
        if(_.size(args.url_param) > 0){
            _.map(args.url_param, function(value, url_param){
                var place_holder = '{' + url_param + '}';
                url = url.replace(place_holder, value)
            })
        }

        // build with query
        if(_.size(args.query) > 0){
            url += '?'
            _.map(args.query, function(value, query){
                url += query + '=' + value + '&'
            })
            url.slice(0, -1)
        }
        return url
    } 

    return self;
};

module.exports = BaseModel;
