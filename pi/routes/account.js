var express = require('express');
var request = require('request');
var router = express.Router();
var app = express();


/*
微博登录文档:
http://open.weibo.com/wiki/%E6%8E%88%E6%9D%83%E6%9C%BA%E5%88%B6%E8%AF%B4%E6%98%8E
微博其他api文档:
http://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI
*/
router.get('/callback/weibo/', function(req, ori_res) {
    var form = {
        client_id: '2294159543',
        client_secret: 'a35ae59c1883bf184e7b76c667e88cee',
        grant_type: 'authorization_code',
        redirect_uri: 'http://www2.lvxingpai.cn:8880/account/callback/weibo/',
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
        access_token = oauth2.access_token;
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
                url: 'http://api.lvxingpai.cn/users/oauth-login',
                json: post_info,
                method: 'POST',
            };
            request(options, function(err, res, data){
                var user_info = {
                    id: data.result._id,
                    nick_name: data.result.nickName,
                    avatar: data.result.avatar,
                }
                req.session.user_info = user_info;
                ori_res.redirect(req.headers.referer);
            })
        });
    });
});


router.get('/callback/qq/', function(req, ori_res) {
    var form = {
        client_id: '101151725',
        client_secret: '124f82692bc1080c0af901da4c379ac5',
        grant_type: 'authorization_code',
        redirect_uri: encodeURI('http://www2.lvxingpai.cn/account/callback/qq/'),
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
                    avatar: data.figureurl,
                    nickName: data.nickname,
                    oauthId: openid,
                    token: access_token,
                    udid: "",
                };

                var options = {
                    url : 'http://api.lvxingpai.cn/web/users/oauth-login',
                    json: post_info,
                    method: 'POST',
                };

                request(options, function(err, res, data){
                    ori_res.render('index', data);
                })
            })
        })
    });
});

module.exports = router;
