var express = require('express');
var router = express.Router();
var routeDetail = require('../model/route_detail');

/* GET users listing. */
router.get('/detail/:PLANID', function(req, res) {
  routeDetail.getdata(req, function(data){
    res.render('plan/plandetail', {
      plandetail : JSON.parse(data).result,
    });
  });
});

module.exports = router;
