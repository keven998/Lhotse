var express = require('express');
var router = express.Router();
var request = require('request'); 

router.get('/login/', function(req, res) {
  data = {
    callback: '/account/callback/weibo/',
    client_id: '2294159543',
  }
  res.render('account/login', data)
});


router.get('/callback/weibo/', function(req, ori_res) {
  var form = {
    client_id: '2294159543',
    client_secret: 'a35ae59c1883bf184e7b76c667e88cee',
    grant_type: 'authorization_code',
    redirect_uri: '/account/callback/weibo/',
    code: req.query.code,
  };
  var options = {
    url : "https://api.weibo.com/oauth2/access_token",
    form: form,
    method: 'POST',
  };

  //处理返回的数据(着一个过程？)
  request(options, function(err, res, data) {
      if (err) {
        throw err;
      }
	//解析oauth2
      oauth2 = JSON.parse(data);
      access_token = oauth2.access_token;
      uid = oauth2.uid;
	
      var user_info_form = {
        source: '2294159543',
        access_token: access_token,
        uid: uid,
      }
	//从控制台输出个人信息(带着token的url请求)，如何从网页输出？
      url = "https://api.weibo.com/2/users/show.json?access_token=" + access_token + "&uid=" + uid
      console.log(url)
      request(url, function(err, res, data){
        console.log(data);
        ori_res.render('account/welcome', JSON.parse(data));
      })

  });
});

module.exports = router;
