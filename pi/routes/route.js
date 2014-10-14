var express = require('express');
var router = express.Router();
var model = require('../model/sup_model.js');
var apiList = require('../url_api');
var config = require('../conf/system');

//景点详情(../route/detail)页面的数据获取
router.get('/detail/:ROUTEID', function(req, res){
    model.setUrl(apiList.apiHost + apiList.routeDetail);
    model.getdata(req, function(data) {
        var details = JSON.parse(data);
        model.setUrl(apiList.apiHost + apiList.routeNotes);
        model.getdata(req,function(data){
            var notes = JSON.parse(data);
            res.render('route/detail', {
                details: details.result,
                notes: notes.result,
                user_info: req.session.user_info,
                config: config,
            });
        });
    });
});


router.get('/plans/detail/:ROUTEID', function(req, res){
    model.setUrl(apiList.apiHost + apiList.routeDetail);
    model.getdata(req, function(data) {
        var details = JSON.parse(data);
        model.setUrl(apiList.apiHost + apiList.routeNotes);
        model.getdata(req,function(data){
            var notes = JSON.parse(data);
            res.json({
                details: details.result,
                notes: notes.result,
                user_info: req.session.user_info,
                config: config,
            });
        });
    });
});
/*
    接收路线列表中的用户筛选信息
*/
router.post('/selection', function(req, res) { 
    var selection = req.body;
    var days = selection.days,
         tag = selection.tag,
         arrId = selection.arrId,
         fromId = selection.fromId,
         page = selection.page;
    
    if (tag === '不限')
        tag = '';
    
    // arr不需要做'不限'判断，因为它在jade中取的数据是调整过的    
    var arr = days.split('-');
    var minDay = arr[0],
        maxDay = arr[1];
    
    var requestUrl = selectUrl(tag, minDay, maxDay, arrId, fromId, page); 
    model.setUrl(requestUrl);
    model.getdata(null, function(data) {
        res.json(JSON.parse(data));
    }); 
});

/* get city id by city name */
router.post('/city', function(req, res){
    var fromLocName = req.body.cityName;
    var queryFromName = apiList.apiHost + apiList.searchCityIdByName + fromLocName;
    model.setUrl(encodeURI(queryFromName));
    model.getdata(req, function(data){
        data = JSON.parse(data);
        var id = selectCityId(data.result);
        res.json({
            id : id,
        });
    });
});



// 输入一个城市名字后，会得到一个列表，level = 1 是省会和level = 2是市
// 通常选取【市】作为出发地
var selectCityId = function(result) {
  var cityId = "";
  for (var i = 0; i < result.length; i++) {
    var tempCity = result[i];
    if (tempCity.level == 2) {
      cityId = tempCity._id;
      break;
    } 
  }
  return cityId;
}


/* 
    配置路线列表筛选url
    一页10个路线
*/
function selectUrl(tag, minDay, maxDay, arrId, fromId, page, pageSize) {
    page = page || 0;
    pageSize = pageSize || 10;
    
    var requestUrl = apiList.apiHost + "/web/plans/explore?" + 
            "loc=" + arrId + 
            "&fromLoc=" + fromId + 
            "&minDays=" + minDay + 
            "&maxDays=" + maxDay + 
            "&tag=" + tag +
            "&page=" + page +
            "&pageSize=" + pageSize;
    return requestUrl;
}
  

module.exports = router;
