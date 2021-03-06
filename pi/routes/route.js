var _dirname = __dirname + '/../public/htmltemplate/routePage';
var apiList = require('../url_api');
var async = require('async');
var config = require('../conf/system');
var express = require('express');
var model = require('../model/sup_model.js');
var moment = require('moment');
var mu = require('mu2');
var router = express.Router();
var utils = require( "../common/utils");
var zone = require('../conf/zone');

moment.locale('zh-cn');

/*get data for route.jade's ajax request*/
router.get('/layer/:ROUTEID', function(req, res){
    async.parallel({
        route_data: function(callback){
            model.setUrl(apiList.apiHost + "/web/plans/" + req.params.ROUTEID + '?fromLoc=' + req.query.fromLoc);
            model.getCleanData(null, function(data) { callback(null, data) });
        },
        misc_data: function(callback){
            model.setUrl(apiList.apiHost + "/web/misc/notes/search?planId=" + req.params.ROUTEID);
            model.getCleanData(null, function(data) { callback(null, data) });
        }
    }, function(err, results){
        /*render the html*/
        var result = {};
        if(!results.route_data.succ){
            result = {succ: false, data: results.route_data.data.toString()}
            res.json(result);
        }else if( !results.misc_data.succ){
            result = {succ: false, data: results.misc_data.data.toString()}
            res.json(result);
        }else{
            mu.root = _dirname;
            var data = regroupLayer(results.route_data.data, results.misc_data.data);
            var dropLayerHtml = [],
                sliderLayerHtml = [];
            mu.compileAndRender('droplayer.html', data)
            .on('data', function(chunk){
                dropLayerHtml.push(chunk);
            })
            .on('end', function(){
                dropLayerHtml = dropLayerHtml.join("");
                mu.compileAndRender('sliderlayer.html', data)
                .on('data', function(chunk){
                    sliderLayerHtml.push(chunk);
                })
                .on('end', function(){
                    sliderLayerHtml = sliderLayerHtml.join("");
                    res.json({
                        succ: true,
                        dropLayerHtml: dropLayerHtml,
                        sliderLayerHtml: sliderLayerHtml,
                        mapView: data.mapView,
                        moreDesc: data.fullView.moreDesc
                    });
                });
            });
        }
    });
})


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
                user_info: utils.get_user_info(req, res),
                config: config
            });
        });
    });
});


router.post('/reload', function(req, res){
    var fromId = req.body.fromId,
        arriveId = req.body.arriveId,
        fromLocName = req.query.fromName,
        arrLocName, poiType,
        indexGoUrl = apiList.apiHost + apiList.getRouteList + "fromLoc=" + fromId;

    //add params
    // for(var param in req.body.params){
    //     indexGoUrl += "&" + param + "=" + req.body.params[param];
    // }
    indexGoUrl += req.body.params;
    // console.log(req.body.params);
    if(req.query[zone.type.viewspot] !== undefined){
        poiType = zone.type.viewspot;
    }else if(req.query[zone.type.locality] !== undefined){
        poiType = zone.type.locality;
    }
    indexGoUrl += "&" + poiType + "=" + arriveId;
    arrLocName = req.query[poiType];

    model.setUrl(encodeURI(indexGoUrl));
    // console.log("0");
    model.getdata(null, function(data){
        model.consoleUrl();
        if((data !== undefined) && (data.indexOf('<html>') < 0)){
            var data = JSON.parse(data),
                routeListHtml = [];
            mu.root = _dirname;
            data = regroupRouteList(data.result);
            mu.compileAndRender('routelist.html', {
                routeData: data.routeListView
            })
            .on('data', function(chunk) {
                routeListHtml.push(chunk);
            })
            .on('end', function() {
                routeListHtml = routeListHtml.join("");
                res.json('route', {
                    routeListHtml: routeListHtml,
                    routeCnt: data.routeCnt
                });
            });
        }else{
            res.json(null);
            console.log("Error in getting routelist !");
        }
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
};


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


/*regroup the data-struct for layer*/
function regroupLayer(route_data, misc_data){
    /*for the scroll images*/
    var imgView = [];
    if (route_data.imageList){
        for(var key in route_data.imageList){
            imgView.push({
                img: route_data.imageList[key] + "?imageView2/1/w/300/h/150"
            });
        }
    }
    //the images is too much.
    var routeDetail, routeActv, routeActvImages;
    for(var day in route_data.details){
        routeDetail = route_data.details[day];
        for(var item in routeDetail.actv){
            routeActv = route_data.details[day].actv[item];
            if (routeActv.details){
                for(var image in routeActv.details.imageList){
                    imgView.push({
                        img: route_data.details[day].actv[item].details.imageList[image] + "?imageView2/1/w/300/h/150"
                    });
                }
            }
        }
    }


    /*for the map appearance*/
    var mapView = [];
    for(var day in route_data.details){
        var tempMap = [];
        for(var item in route_data.details[day].actv){
            // console.log(route_data.details[day].actv[item]);
            tempMap.push({
                name: route_data.details[day].actv[item].itemName,
                id: route_data.details[day].actv[item].itemId,
                type: route_data.details[day].actv[item].type,
                lng: route_data.details[day].actv[item].details.addr.lng,
                lat: route_data.details[day].actv[item].details.addr.lat
            });
        }
        mapView.push(tempMap);
    }


    /*for the route preview*/
    var dropDayList = [];
    var dayMax = route_data.summary.length;
    var dayFlag = 0;
    if (dayMax > 5){
        dayFlag = 1;
        dayMax = 4;
    }
    for(var i = 0;i < dayMax;i++){
        dropDayList.push({
            viewSpot: route_data.summary[i],
            day: i+1
        });
    }

    var slideDayView = [];
    for(var i = 0;i < route_data.summary.length;i++){
        slideDayView.push({
            viewSpot: route_data.summary[i],
            day: i+1
        });
    }

    /*for the relative notes*/
    var dropMiscList = [];
    var tempSource;
    var miscMax = misc_data.length;
    var miscFlag = 0;
    if (miscMax > 4){
        miscFlag = 1;
        miscMax = 3;
    }
    for(var i = 0;i < miscMax;i++){
        dropMiscList.push({
            title: misc_data[i].title,
            authorName: misc_data[i].authorName,
            publishDate: moment(misc_data[i].publishDate).format('YYYY-M-D'),
            sourceUrl: misc_data[i].sourceUrl
        });
    }

    var miscView = [];
    for(var note in misc_data){
        switch (misc_data[note].source){
            case 'baidu':
                tempSource = "百度旅游";
                break;
            case 'qyer':
                tempSource = "穷游网";
                break;
            case 'mafengwo':
                tempSource = "蚂蜂窝";
                break;
            default:
                tempSource = "";
        }
        miscView.push({
            title: misc_data[note].title,
            authorName: misc_data[note].authorName,
            authorAvatar: misc_data[note].authorAvatar,
            source: tempSource,
            sourceUrl: misc_data[note].sourceUrl,
            summary: misc_data[note].summary,
            publishDate: moment(misc_data[i].publishDate).format('YYYY-M-D'),
            viewCnt: misc_data[note].viewCnt,
            commentCnt: misc_data[note].commentCnt,
            favorCnt: misc_data[note].favorCnt
        });
    }


    /*the rest information of the route*/
    var fullView = {
        desc: route_data.desc,
        title: route_data.title,
        vsCnt: route_data.vsCnt,
        days: route_data.days,
        tags: route_data.tags.slice(0,3),
        budget: {
            inf: route_data.budget[0],
            sup: route_data.budget[1]
        },
        moreDesc: route_data.moreDesc
    }


    return {
        dropDayView: {
            flag: dayFlag,
            dropDayList: dropDayList
        },
        slideDayView: slideDayView,
        imgView: imgView,
        mapView: mapView,
        fullView: fullView,
        dropMiscView: {
            flag: miscFlag,
            dropMiscList: dropMiscList
        },
        miscView: miscView,
        routeId: route_data._id
    };
}

function regroupRouteList(data){
    var routeListView = [],
        routeData;
    for(var route in data){
        routeData = {
            id: data[route]._id,
            imgUrl: data[route].imageList ? (data[route].imageList[0] + '?imageView2/1/w/165/h/150') : null,
            // please add the default image to qiniu.com and adapt here
            title: data[route].title,
            forkedCnt: data[route].forkedCnt,
            shortDesc: null,
            tags: data[route].tags.slice(0,3),
            vsCnt: data[route].vsCnt,
            days: data[route].days,
            budget: {
                inf: data[route].budget[0],
                sup: data[route].budget[1]
            }
        };
        if (data[route].lxpTag && data[route].lxpTag[0]){
            routeData.mostTag = {
                tagName: data[route].lxpTag[0]
            };
        }
        if (data[route].desc && data[route].desc.length > 45){
            routeData.shortDesc = data[route].desc.substring(0, 45) + "...";
        }
        routeListView.push(routeData);
    }
    return {
        routeListView: routeListView,
        routeCnt: (data && data !== null) ? data.length : 0
    };
}

module.exports = router;
