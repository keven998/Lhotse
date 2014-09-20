var request = require('request'); 


var base_model = function(){
    var self = this;
    this.api_domain = 'http://api.lvxingpai.cn';
    this.url_template = null;
    this.queries = ['']
    this.url_params = ['']

    // 请求数据
    this.get = function(req, callback) {
        url = this.build_url(req);
        request(url, function(err, res, data) {
            if (err) {
                throw err;
            }
            callback(data);
        });
    }

    this.set_url = function(url){
        this.url_template = url;
    }

    this.set_queries = function(queries){
        this.queries = queries;
    }

    this.set_url_params = function(url_params){
        this.url_params = url_params;
    }

    // 组建url api
    this.build_url = function(req) {
        var url = this.url_template,
            url_params = req.params,
            queries = req.query,
            query_array = new Array(),
            query_str = '';
        console.log('*******');
        console.log(url);
        console.log('*******');
        console.log(url_params);
        console.log('*******');
        console.log(queries);
        for (param in url_params){
            url = url.replace(param, url_params[param]);
        } 
        for (query in queries){
            query_array.push(query + '=' + queries[query]);
        }

        query_str = query_array.join('&')
        if (query_str) url += '?';
        result = this.api_domain + url + query_str
        console.log('*******');
        console.log(result);
        return result
    }  
};

module.exports = base_model;
