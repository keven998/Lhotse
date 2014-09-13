var express = require('express');
var router = express.Router();
var request = require('request'); 

router.get('/login/', function(req, res) {
  data = {
    weibo_callback: 'http://www2.lvxingpai.cn/account/callback/weibo/',
    weibo_client_id: '2294159543',
    qq_callback: encodeURI('http://www2.lvxingpai.cn/account/callback/qq/'),
    qq_client_id: '101151725',
  }
  res.render('account/login', data)
});


router.get('/callback/weibo/', function(req, ori_res) {
  var form = {
    client_id: '2294159543',
    client_secret: 'a35ae59c1883bf184e7b76c667e88cee',
    grant_type: 'authorization_code',
    redirect_uri: 'http://www2.lvxingpai.cn/account/callback/weibo/',
    code: req.query.code,
  };
  var options = {
    url : "https://api.weibo.com/oauth2/access_token",
    form: form,
    method: 'POST',
  };

  request(options, function(err, res, data) {
      if (err) {
        throw err;
      }
      oauth2 = JSON.parse(data);
      access_token = oauth2.access_token;
      uid = oauth2.uid;
	
      url = "https://api.weibo.com/2/users/show.json?access_token=" + access_token + "&uid=" + uid;
      request(url, function(err, res, data){
        console.log(data);
        request(url, function(err, res, data){
          data=JSON.parse(data);
          var post_info = {
            provider: "weibo",
            avatar: data.avatar_large,
            nickName: data.screen_name,
            oauthId: uid,
            token: access_token,
            udid: "",
          };
          
          var options = {
            url : 'http://api.lvxingpai.cn/web/users/oauth-login',
            json: post_info,
            method: 'POST',
          };
          request(options, function(err, res, data){
            ori_res.render('account/welcome', data);     
          })
        }) 
      })

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
        openid=data.split('"')[7];
        url = 'https://graph.qq.com/user/get_user_info?access_token=' + access_token + '&oauth_consumer_key=101151725&openid=' + openid;
        request(url, function(err, res, data){
          data=JSON.parse(data);
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
            ori_res.render('account/welcome', data);     
          })
        })            
      })

  });
});

module.exports = router;
