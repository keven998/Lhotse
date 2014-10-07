var express = require('express');
var app = express();
var config = {};

if (app.get('env') === 'development' || app.get('env') === 'local'){
    if (app.get('env') === 'development') {
        config['domain'] = 'www2.lvxingpai.cn:8880';
    }else if(app.get('env') === 'local') {
        config['domain'] = 'www2.lvxingpai.cn:8880';
    }
    config['weibo_client_id'] = '2294159543';
    config['weibo_client_secret'] = 'a35ae59c1883bf184e7b76c667e88cee';
    config['qq_client_id'] = '101151725';
    config['qq_client_secret'] = '124f82692bc1080c0af901da4c379ac5';
}else if(app.get('env') === 'product'){
    config['domain'] = 'www.lvxingpai.com';
    config['weibo_client_id'] = '2138367538';
    config['weibo_client_secret'] = '8264a7394136219fe1c6394f362f4bc2';
    config['qq_client_id'] = '101157594';
    config['qq_client_secret'] = 'a7395f1441b40b09047cdca9c8b04d37';
}

config['weibo_call_back'] = 'https://api.weibo.com/oauth2/authorize?client_id=' + config.weibo_client_id + '&response_type=code&redirect_uri=http://' + config.domain + '/account/callback/weibo/'
config['qq_call_back'] = 'https://graph.qq.com/oauth2.0/authorize?client_id=' + config.qq_client_id + '&response_type=code&redirect_uri=http://' + config.domain + '/account/callback/qq/&state=01'


module.exports = config;
