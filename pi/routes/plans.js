var express = require('express');
var router = express.Router();
var routeDetail = require('../model/route_detail');
var request = require('request'); 
var async = require('async');
var addOneDay = require('../libs/addOneDay');

// 新方法
var model = require('../model/sup_model.js');
var apiList = require('../url_api');


/* GET users listing. */
router.get('/detail/:PLANID', function(req, res) {
  routeDetail.getdata(req, function(data){
    res.render('plan/plandetail', {
      plandetail : JSON.parse(data).result,
    });
  });
});


/* edit route */
router.get('/edit/:UGCID',function(req, res) {
    async.parallel({
        // extract viewspot of template route
        route: function(callback) {
            model.setUrl(apiList.apiHost + apiList.ugc.getUgcById);  
            model.getdata(req, function(data) {
                data = JSON.parse(data);
                var result = data.result;
                var title = result.title;
                var days = result.days;
                var details = result.details;
                var dayRoute = new Array();
                
                for (var i = 0; i < details.length; i++) {
                    var actv = details[i].actv;
                    var tempArr = new Array();              
                    for (var j = 0; j < actv.length; j++) {
                        var temp = new Object();
                        var elem = actv[j];
                        if (elem.type == 'hotel' || elem.type == 'vs') {
                            temp.itemId = elem.itemId;
                            temp.itemName = elem.itemName;
                            temp.type = elem.type;
                            tempArr.push(temp);
                        }
                    }
                    dayRoute.push(tempArr);  
                }
                var dataObj = new Object();
                var _id = result._id;
                dataObj._id = _id;
                dataObj.dayRoute = dayRoute;
                
                callback(null, dataObj);
            });
        },
    
        spots: function(callback) {
            var requestUrl = '/web/poi/view-spots/search?keyword=' + req.query.DEST + '&page=0&pageSize=9&sortField=viewCnt&sort=desc'
            model.setUrl(encodeURI(apiList.apiHost + requestUrl));
            model.getdata(req, function(data){
                data = JSON.parse(data);
                //res.send(data);
                var result = data.result;
                var spots = new Array();
                for (var i = 0; i < result.length; i++) {
                    var spot = result[i];
                    var tempSpot = new Object();
                    tempSpot.name = spot.name;
                    tempSpot._id = spot._id;
                    tempSpot.pic = spot.imageList[0];
                    tempSpot.ranking = spot.ratings.ranking;
                    tempSpot.timeCost = spot.timeCost;

                    var tags = '';
                    var j = 0;
                    // judge if tags is empty array
                    if (spot.tags.length != 0) {
                        for (; j < spot.tags.length-1; j++) {
                            tags += spot.tags[j] + '|'; 
                        }
                        tags += spot.tags[j];
                        tempSpot.tags = tags;
                    } else {
                        tempSpot.tags = '';
                    }
                    spots.push(tempSpot);
                }
                
                callback(null, spots);
            });
        },
        
        locName : function(callback) {
             model.setUrl(apiList.apiHost + apiList.searchCityNameById); 
             model.getdata(req, function(data){
                data = JSON.parse(data);
                var fromLocName = data.result.name;
                var arrLocName = req.query.DEST;
                
                var locName = new Object();
                locName.from = fromLocName;
                locName.arr = arrLocName;
                callback(null, locName);
             });
                        
        },
    }, 
        function(err, results) {
            var dataObj = results.route;
            var spots = results.spots;
            var locName = results.locName;
            res.render('plans/edit', {
                daysRoute : dataObj.dayRoute,
                id : dataObj._id,   // 表明这个ugc id，ajax传递给node后，获取别的信息，减少前段任务
                spots : spots,      // 城市景点 
                locName : locName,  // 对象：起点和目的地
            });
        }
    )
});

/* edit post request */
router.post('/edit/post', function(req, res) {
    var webPostData = req.body;
    var vsAndHotel = webPostData.spotArray;
    
    //获得ugc信息
    var requestUrl = apiList.apiHost + apiList.ugc.getUgcByIdNone + webPostData.ugcId;
    model.setUrl(encodeURI(requestUrl));
    model.getdata(req, function(data){
        data = JSON.parse(data);
        var ugcData = new Object();
        ugcData.uid = webPostData.uid;
        ugcData.fromLoc = webPostData.fromLocId; 
        ugcData.title = data.result.title;
        ugcData.startDate = webPostData.startDate + ' 00:00:00+0800';
        ugcData.endDate = webPostData.endDate + ' 00:00:00+0800';
        ugcData.action = 'upsert';
        ugcData.templateId = data.result.templateId;
        ugcData._id = webPostData.ugcId;
        ugcData.trafficBudget = data.result.trafficBudget;
        ugcData.viewBudget = data.result.viewBudget;
        ugcData.budget = data.result.budget;
        ugcData.stayBudget = data.result.stayBudget;
        ugcData.v = '1.1.0';
        ugcData.seq = '';
        ugcData.timestamp = '';      
        
        var details = new Array();
        var tempDate = webPostData.startDate;
        //获得vs 和 hotel 时间，导入post数据中
        for (var i = 0; i < vsAndHotel.length; i++) {
            var oneDay = vsAndHotel[i];
            for (var j = 0 ; j < oneDay.length; j++) {
                var oneSpot = oneDay[j];
                if (oneSpot.type == 'vs') {
                    oneSpot.st = tempDate + ' 00:' + ((j + 1) < 10 ? '0' + (j + 1) : (j + 1)) + ':00+0800';
                } else {
                    oneSpot.st = tempDate + ' 00:00:00+0800';
                }
                details.push(oneSpot);
            }
            tempDate = addOneDay(tempDate);
        }
        
        // 获得交通信息
        var arr = data.result.details;
        for (var i = 0; i < arr.length; i++) {
            var actv = arr[i].actv;
            for (var j = 0; j < actv.length; j++) {
                var elem = actv[j];
                if (elem.type == 'traffic') {
                    if(elem.subType == 'airport' || elem.subType == 'trainStation') {
                       var temp = new Object();
                        temp.type = elem.type;
                        temp.subType = elem.subType;
                        temp.ts = elem.ts;
                        temp.st = elem.ts;
                        temp.itemId = elem.itemId;
                        details.push(temp);
                    } else {
                        var temp = new Object();
                        temp.type = elem.type;
                        temp.subType = elem.subType;
                        temp.arrStop = elem.arrStop;
                        temp.depStop = elem.depStop;
                        temp.st = elem.ts;
                        temp.itemId = elem.itemId;
                        details.push(temp);
                    }
                }
            }
        }
        ugcData.details = details; 
           
        // 拉到上面
        var options = {
            url : apiList.ugc.editSave,
            json: ugcData,
            method: 'POST',
        };
        
        request(options, function(err, respond, result) {
            if (err) {
                throw err;
            }     
            res.json(result);
        });
    });  
});


router.get('/mine/', function(req, res){
  res.render('plans/mine');
});


router.get('/create/', function(req, res){
  res.render('plans/create');
});


/* timeline */
router.get('/timeline/:TEMPLATES', function(req, res) {
    // 将这个id传递给编辑页面！
    var fromLocId = req.query._fromLoc;
    model.setUrl(apiList.apiHost + apiList.ugc.timeline);
    model.getdata(req, function(data) {
        data = JSON.parse(data);         
        var requestUrl = req.originalUrl;     
        var lastModified = data.lastModified;
        var result = data.result;
        var _id = result._id;
        var templateId = result.templateId;
        var targets = result.targets;
        var tags = result.tags;
        var title = result.title;
        var days = result.days;
        var imageList = result.imageList;
        var budget = result.budget;
        var destinaton = result.target;
        destinaton.name = destinaton.name.replace("市","");
        
        // basic information  
        var basicInfo = new Object();
        basicInfo['_id'] = _id;
        basicInfo['templateId'] = templateId;
        basicInfo['title'] = title;
        basicInfo['desc'] = result.desc || "";
        basicInfo['days'] = days;
        basicInfo['budget'] = budget;
        basicInfo['requestUrl'] = requestUrl;
        basicInfo['destinaton'] = destinaton;
        basicInfo['fromLocId'] = fromLocId;
        
        var details = result.details;    
        // extract date, e.x. "2014-08-30 00:00:00+0800" --> "2014-08-30"
        for (var i = 0; i < details.length; i++) {
        details[i].date = details[i].date.split(" ")[0];
        }
        
        // detail information
        var allRoutes = new Array();
        for (var dayNumber = 0; dayNumber < details.length; dayNumber++) {
            var oneDay = new Object();
            var tempDay = details[dayNumber];

            oneDay['date'] = tempDay.date;
            oneDay['hasTraffic'] = "no"; //default "no"

            var oneDayTempRoutes = tempDay.actv;
            var oneDayRoutes = new Array();
            for (var routeNum = 0; routeNum < oneDayTempRoutes.length; routeNum++) {
                var tempRoute = new Object();
                // 景点信息提取
                if (oneDayTempRoutes[routeNum].type == "vs") {
                    tempRoute['itemId'] = oneDayTempRoutes[routeNum].itemId;
                    tempRoute['itemName'] = oneDayTempRoutes[routeNum].itemName;
                    tempRoute['locId'] = oneDayTempRoutes[routeNum].locId;
                    tempRoute['locName'] = oneDayTempRoutes[routeNum].locName;
                    tempRoute['type'] = oneDayTempRoutes[routeNum].type;
                    tempRoute['imageList'] = oneDayTempRoutes[routeNum].details.imageList;
                    tempRoute['tags'] = oneDayTempRoutes[routeNum].details.tags;
                    tempRoute['price'] = oneDayTempRoutes[routeNum].details.price || 0;
                    tempRoute['timeCost'] = oneDayTempRoutes[routeNum].details.timeCost;
                    tempRoute['lat'] = oneDayTempRoutes[routeNum].details.addr.lat;
                    tempRoute['lng'] = oneDayTempRoutes[routeNum].details.addr.lng;
                    
                    oneDayRoutes.push(tempRoute);
                } 
                else if (oneDayTempRoutes[routeNum].type == "traffic") {
                    oneDay['hasTraffic'] = "yes";
                    // 机场信息提取
                    if (oneDayTempRoutes[routeNum].subType == "airport" || oneDayTempRoutes[routeNum].subType == "trainStation") {
                        tempRoute['itemId'] = oneDayTempRoutes[routeNum].itemId;
                        tempRoute['itemName'] = oneDayTempRoutes[routeNum].itemName;
                        tempRoute['locId'] = oneDayTempRoutes[routeNum].locId;
                        tempRoute['locName'] = oneDayTempRoutes[routeNum].locName;
                        tempRoute['type'] = oneDayTempRoutes[routeNum].subType;;
                        tempRoute['stopType'] = oneDayTempRoutes[routeNum].stopType;
                        tempRoute['lat'] = oneDayTempRoutes[routeNum].lat;
                        tempRoute['lng'] = oneDayTempRoutes[routeNum].lng;
                        
                        oneDayRoutes.push(tempRoute);
                    } 
                    else if (oneDayTempRoutes[routeNum].subType == "airRoute" || oneDayTempRoutes[routeNum].subType == "trainRoute") {
                        // 航班路线提取
                        tempRoute['itemId'] = oneDayTempRoutes[routeNum].itemId;
                        tempRoute['itemName'] = oneDayTempRoutes[routeNum].itemName;
                        tempRoute['type'] = oneDayTempRoutes[routeNum].subType;
                        tempRoute['ts'] = oneDayTempRoutes[routeNum].ts.substr(11,8);
                        tempRoute['arrTime'] = oneDayTempRoutes[routeNum].arrTime.substr(11,8);
                        
                        oneDayRoutes.push(tempRoute);
                    } 
                    else if (oneDayTempRoutes[routeNum].subType == "train") {
                        // 火车路线提取
                        tempRoute['itemId'] = oneDayTempRoutes[routeNum].itemId;
                        tempRoute['itemName'] = oneDayTempRoutes[routeNum].itemName;
                        tempRoute['type'] = oneDayTempRoutes[routeNum].subType;
                        tempRoute['ts'] = oneDayTempRoutes[routeNum].ts.substr(11,8);
                        tempRoute['arrTime'] = oneDayTempRoutes[routeNum].arrTime.substr(11,8);
                        
                        oneDayRoutes.push(tempRoute);
                    }
                } 
                else if (oneDayTempRoutes[routeNum].type == "hotel") {
                    // 酒店信息提取
                    tempRoute['itemId'] = oneDayTempRoutes[routeNum].itemId;
                    tempRoute['itemName'] = oneDayTempRoutes[routeNum].itemName;
                    tempRoute['locId'] = oneDayTempRoutes[routeNum].locId;
                    tempRoute['locName'] = oneDayTempRoutes[routeNum].locName;
                    tempRoute['type'] = oneDayTempRoutes[routeNum].type;
                    tempRoute['imageList'] = oneDayTempRoutes[routeNum].details.imageList;
                    tempRoute['starLevel'] = oneDayTempRoutes[routeNum].details.ratings.starLevel;
                    tempRoute['desc'] = oneDayTempRoutes[routeNum].details.desc;
                    tempRoute['price'] = oneDayTempRoutes[routeNum].details.price || 0;
                    tempRoute['phoneList'] = oneDayTempRoutes[routeNum].details.contact.phoneList;
                    tempRoute['lat'] = oneDayTempRoutes[routeNum].details.addr.lat;
                    tempRoute['lng'] = oneDayTempRoutes[routeNum].details.addr.lng;
                    tempRoute['addr'] = oneDayTempRoutes[routeNum].details.addr.addr;
                    
                    oneDayRoutes.push(tempRoute);
                }
            }   
            oneDay['actv'] = oneDayRoutes;
            oneDayRoutes = null;
            allRoutes.push(oneDay);
            oneDay = null;
        }
        
        // timeline navigation information
        var navigation = new Array();
        for (var i = 0; i < allRoutes.length; i++) {
            var oneDay = allRoutes[i];
            var oneDayRoutes = oneDay.actv;
            var tempDay = new Object();
            var tempActv = new Array(); // 存放地点数组
            
            tempDay.date = oneDay.date; // 时间
            for (var routeNum = 0; routeNum < oneDayRoutes.length; routeNum++) {
                var oneSpot = oneDayRoutes[routeNum];       
                if (oneSpot.type != "airRoute" && oneSpot.type != "trainRoute") {
                    var tempSpot = new Object();
                    tempSpot['itemName'] = oneSpot.itemName;
                    tempSpot['type'] = oneSpot.type;
                    tempSpot['latLng'] = oneSpot.lat + "," + oneSpot.lng;
                    tempActv.push(tempSpot);
                }
            }
            tempDay.actv = tempActv; // 关联地点数组
            navigation.push(tempDay);
        }
        
        // render to webpage
        res.render('plans/timeline', {
            allRoutes : allRoutes,
            basicInfo : basicInfo,
            navigation : navigation,
        });
    });
});

module.exports = router;
