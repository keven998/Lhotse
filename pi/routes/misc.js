var _ = require('underscore');
var config = require('../conf/system');
var express = require('express');
var models = require('../model/models.js');
var moment = require('moment');
    moment.locale('zh-cn');
var request = require('request');
var router = express.Router();
var utils = require( "../common/utils");


router.get('/article/:ARTICLEID', function(req, res){
    models.article.detailModel.getData({ url_param: { articleID: req.params.ARTICLEID } }, function(model_result){
        if (! model_result.succ) { 
            console.log("can't get the popRoute"); 
        }else{
            res.render('misc/article', {
                article: {
                    id: model_result.data.id,
                    title: model_result.data.title,
                    source: model_result.data.source,
                    authorName: model_result.data.authorName,
                    publishTime: moment(model_result.data.publishTime).format('YYYY-M-D'),
                    content: model_result.data.content,
                    image: (_.isArray(model_result.images) && model_result.images.length > 0) ? model_result.images[0].url : null
                },
                user_info: utils.get_user_info(req, res),
                config: config
            });
        }
    });
});


module.exports = router;
