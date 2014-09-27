var express = require('express');
var router = express.Router();
var model = require('../model/sup_model.js');
var apiList = require('../url_api');


router.get('/detail/:ROUTEID', function(req, res){
    model.setUrl(apiList.apiHost + apiList.routeDetail);
    model.getdata(req, function(data) {
        var details = JSON.parse(data);
        model.setUrl(apiList.apiHost + apiList.routeNotes);
        model.getdata(req,function(data){
            var notes = JSON.parse(data);
            res.render('route/detail', {
                "details": details.result,
                "notes": notes.result
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
                "details": details.result,
                "notes": notes.result
            });
        });
    });
});
/*
    接收路线列表中的用户筛选信息
*/
router.post('/selection', function(req, res) { 
    var selection = req.body;
    console.log(selection)
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
    console.log(requestUrl);
    model.setUrl(requestUrl);
    model.getdata(null, function(data) {
        res.json(JSON.parse(data));
    }); 
})

/* 
    配置路线列表筛选url
    一页10个路线
*/
function selectUrl(tag, minDay, maxDay, arrId, fromId, page, pageSize) {
    page = page || 0;
    pageSize = pageSize || 10;
    
    var requestUrl = "http://api.lvxingpai.cn/web/plans/explore?" + 
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
