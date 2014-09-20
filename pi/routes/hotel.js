var express = require('express');
var router = express.Router();
var async = require('async');
var urlApi = require('../url_api');
var request = require('request')
var model = require('../model/sup_model.js');

router.post('/search', function(req, res) {
    var text = req.body.searchText;
    var requestUrl = urlApi.apiHost + urlApi.searchHotelByName + encodeURI(text);
    model.setUrl(requestUrl); 
    model.getdata(null, function(data){
        res.json(JSON.parse(data));
    });
});


module.exports = router;
