var express = require('express');
var router = express.Router();
var model = require('../model/sup_model.js');
var apiList = require('../url_api');
var config = require('../conf/system');
var utils = require( "../common/utils");

var mu = require('mu2');
var _dirname = 'public/htmltemplate/routePage';

var moment = require('moment');
moment.locale('zh-cn');

/*get data for route.jade's ajax request*/
router.get('/layer/:ROUTEID', function(req, res){
    mu.root = _dirname;
    var dropLayerTemplate = 'droplayer.html',
        dropLayerHtml = [],
        sliderLayerTemplate = 'sliderlayer.html',
        sliderLayerHtml = [];

    /*get the details of the route*/
    model.setUrl(apiList.apiHost + apiList.routeDetail);
    model.getdata(req, function(data) {
        if (data != null){
            if (data.indexOf("!DOCTYPE") != -1){
                console.log("The error occurred while getting the route-detail data!");
            }else{
                var route_data = JSON.parse(data).result;
            }
        }else{
            console.log("The route-detail data is null!");
        }


        /*get the relatived notes of the route*/
        model.setUrl(apiList.apiHost + apiList.routeNotes);
        model.getdata(req,function(data){
            if (data != null){
                if (data.indexOf("!DOCTYPE") != -1){
                    console.log("The error occurred while getting the misc data!");
                }else{
                    var misc_data = JSON.parse(data).result;
                }
            }else{
                console.log("The misc data is null!");
            }


            /*render the html*/
            var data = regroupData(route_data, misc_data);

            mu.compileAndRender(dropLayerTemplate , data)
            .on('data', function(chunk) {
                dropLayerHtml.push(chunk);
            })
            .on('end', function() {
                dropLayerHtml = dropLayerHtml.join("");
                mu.compileAndRender(sliderLayerTemplate , data)
                .on('data', function(chunk) {
                    sliderLayerHtml.push(chunk);
                })
                .on('end', function() {
                    sliderLayerHtml = sliderLayerHtml.join("");
                    res.json('route', {
                        dropLayerHtml: dropLayerHtml.toString(),
                        sliderLayerHtml: sliderLayerHtml.toString(),
                        mapView: data.mapView,
                        moreDesc: data.fullView.moreDesc
                    });
                });
            });
        });
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

  
/*regroup the data-struct*/
function regroupData(route_data, misc_data){
    /*for the scroll images*/
    var imgView = [];
    for(var key in route_data.imageList){
        imgView.push({
            img: route_data.imageList[key] + "?imageView2/1/w/300/h/150"
        });
    }
    //the images is too much.
    for(var day in route_data.details){
        for(var item in route_data.details[day].actv){
            for(var image in route_data.details[day].actv[item].details.imageList){
                imgView.push({
                    img: route_data.details[day].actv[item].details.imageList[image]
                });
            }
        }
    }


    /*for the map appearance*/
    var mapView = [];
    for(var day in route_data.details){
        var tempMap = [];
        for(var item in route_data.details[day].actv){
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
            sup: route_data.budget[0],
            inf: route_data.budget[1]
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
    }
}


module.exports = router;
