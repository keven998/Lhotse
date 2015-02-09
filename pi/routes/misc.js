var _ = require('underscore');
var async = require('async');
var config = require('../conf/system');
var express = require('express');
var models = require('../model/models.js');
var moment = require('moment');
    moment.locale('zh-cn');
var request = require('request');
var router = express.Router();
var utils = require( "../common/utils");


router.get('/article/:ARTICLEID', function(req, res){
    async.parallel({
        articleList: function(callback) {
            models.article.listModel.getData({
                query: {
                    pageSize: 10,
                    removeId: req.params.ARTICLEID
                }
            }, function(model_result){
                if (! model_result.succ) { console.log("can't get the articles"); };
                callback(null, model_result);
            });
        },
        articleDetail: function(callback) {
            models.article.detailModel.getData({
                url_param: {
                    articleID: req.params.ARTICLEID
                }
            }, function(model_result){
                if (! model_result.succ) { console.log("can't get the popRoute"); };
                callback(null, model_result);
            });
        }
    }, function(err, results) {
        res.render('misc/article', {
            articles: results.articleList.succ ? results.articleList.data : [],
            article: results.articleDetail.succ ? {
                id: results.articleDetail.data.id,
                title: results.articleDetail.data.title,
                source: results.articleDetail.data.source,
                authorName: results.articleDetail.data.authorName,
                publishTime: moment(results.articleDetail.data.publishTime).format('YYYY-M-D'),
                content: results.articleDetail.data.content,
                image: (_.isArray(results.articleDetail.images) && results.articleDetail.images.length > 0) ? results.articleDetail.images[0].url : null
            } : [],
            user_info: utils.get_user_info(req, res),
            config: config
        });
    });
});


module.exports = router;
