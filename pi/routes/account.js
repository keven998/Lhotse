var express = require('express');
var request = require('request');
var router = express.Router();
var config = require('../conf/system');
var urlApi = require('../url_api');
var utils = require( "../common/utils");

/*
微博登录文档:
http://open.weibo.com/wiki/%E6%8E%88%E6%9D%83%E6%9C%BA%E5%88%B6%E8%AF%B4%E6%98%8E
微博其他api文档:
http://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI
*/
router.get('/callback/weibo/', function(req, ori_res) {
    var form = {
        client_id: config.weibo_client_id,
        client_secret: config.weibo_client_secret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://' + config.domain + '/account/callback/weibo/',
        code: req.query.code,
    };

    var options = {
        url : "https://api.weibo.com/oauth2/access_token",
        form: form,
        method: 'POST',
    };
    request(options, function(err, res, data){
        if (err) {throw err;}
        oauth2 = JSON.parse(data);
        var access_token = oauth2.access_token;
        if (access_token == undefined){
            ori_res.redirect('/');
            return ;
        }
        uid = oauth2.uid;

        // need to change to web user login
        url = "https://api.weibo.com/2/users/show.json?access_token=" + access_token + "&uid=" + uid;
        request(url, function(err, res, data){
            data = JSON.parse(data);
            var post_info = {
                provider: "weibo",
                avatar: data.avatar_large,
                nickName: data.screen_name,
                oauthId: uid,
                token: access_token,
                udid: "",
            };
            var options = {
                url: urlApi.apiHost + '/users/oauth-login',
                json: post_info,
                method: 'POST',
            };
            request(options, function(err, res, data){
                var user_info = {
                    id: data.result._id,
                    nick_name: data.result.nickName,
                    avatar: data.result.avatar,
                }
                utils.set_user_info(req, ori_res, user_info);
                if (req.headers.referer){
                    ori_res.redirect(req.headers.referer);
                }else{
                    ori_res.redirect('/');
                }
            })
        });
    });
});


router.get('/callback/qq/', function(req, ori_res) {
    var form = {
        client_id: config.qq_client_id,
        client_secret: config.qq_client_secret,
        grant_type: 'authorization_code',
        redirect_uri: encodeURI('http://' + config.domain + '/account/callback/qq/'),
        code: req.query.code,
    };
    var options = {
        url : 'https://graph.qq.com/oauth2.0/token',
        form: form,
        method: 'POST',
    };

    request(options, function(err, res, data) {
        if (err) {
            throw err;
        }
        access_token = data.split('&')[0].substr(13);
        url = 'https://graph.qq.com/oauth2.0/me?access_token=' + access_token;
        request(url, function(err, res, data){
            openid = data.split('"')[7];
            url = 'https://graph.qq.com/user/get_user_info?access_token=' + access_token + '&oauth_consumer_key=101151725&openid=' + openid;
            request(url, function(err, res, data){
                data = JSON.parse(data);
                var post_info = {
                    provider: "qq",
                    avatar: data.figureurl_qq_1,
                    nickName: data.nickname,
                    oauthId: openid,
                    token: access_token,
                    udid: "",
                };
                var options = {
                    url : urlApi.apiHost + '/web/users/oauth-login',
                    json: post_info,
                    method: 'POST',
                };
                request(options, function(err, res, data){
                    var user_info = {
                        id: data.result._id,
                        nick_name: data.result.nickName,
                        avatar: data.result.avatar,
                    }
                    utils.set_user_info(req, ori_res, user_info);
                    var source_url = getUrl(req.headers.referer);
                    if (source_url){
                        ori_res.redirect(source_url);
                    }else{
                        ori_res.redirect('/');
                    }
                })
            })
        })
    });
});

//从返回的referer中截取url地址
function getUrl(referer){
    var referer_index = referer.indexOf("referer=");
    var OFFSET = 8; //去掉“referer=”
    var url = (referer_index > 0) ? referer.substr(referer_index + OFFSET) : referer;
    return url;
}

/*
    注销登录
*/
router.get('/logout/', function(req, res) {
    utils.set_user_info(req, res, null);
    var source_url = getUrl(req.headers.referer);
    var ans = source_url.search(/\/plans\/mine\//);
    // 从需要用户登录的页面跳到主页
    if (ans > -1) {
        res.redirect('/');
    }else {
        res.redirect(source_url);
    }
})

module.exports = router;
