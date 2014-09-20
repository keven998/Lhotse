var express = require('express');
var router = express.Router();
var model = require('../model/sup_model.js');
var apiList = require('../url_api');


router.get('/detail/:ROUTEID', function(req, res) { 
    model.setUrl(apiList.apiHost + apiList.routeDetail);
    model.getdata(req, function(data) {
        details = JSON.parse(data);
        model.setUrl(apiList.apiHost + apiList.routeNotes);
        model.getdata(req,function(data){
            var notes = JSON.parse(data);
            res.render('route/detail', {
                "details": details.result,
                "notes": notes.result
            });
        })
    })
})


module.exports = router;
