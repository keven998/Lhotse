var express = require('express');
var router = express.Router();
var routeDetail = require('../model/route_detail');
var request = require('request'); 
var async = require('async');
var config = require('../conf/system');


// 新方法
var model = require('../model/sup_model.js');
var apiList = require('../url_api');


/*
    user save the ugc in timeline 
*/
router.post('/timeline/save', function(req, res) {
    var postData = req.body;
    var requestUrl = apiList.apiHost + apiList.ugc.saveUgc;
    // http post
    var options = {
        url :  requestUrl,
        json: postData,
        method: 'POST',
    };
    
    request(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


/* edit route */
router.get('/edit/:UGCID', function(req, res) {
    async.parallel([
        function route(callback) {
            ugcDataEdit.route(req, callback);
        }, 
        function spots(callback) {
            ugcDataEdit.spots(req, callback);
        }, 
        function hotels(callback) {
            ugcDataEdit.hotels(req, callback);
        }, 
        function locName(callback) {
            ugcDataEdit.locName(req, callback);
        }],

        function(err, results) {
            var dataObj = results[0];
            var spots = results[1];
            var hotels = results[2];
            var locName = results[3];
            res.render('plans/edit', {
                daysRoute : dataObj.dayRoute,
                id : dataObj._id,   // 表明这个ugc id，ajax传递给node后，获取别的信息，减少前段任务
                spots : spots,      // 城市景点 
                locName : locName,  // 对象：起点和目的地
                hotels : hotels,
                user_info: req.session.user_info,
                config: config,
            });
        })
});


/* edit route */
router.get('/edit/customized/:UGCID', function(req, res) {
    async.parallel([
        function route(callback) {
            ugcDataEdit.route(req, callback);
        }, 
        function spots(callback) {
            ugcDataEdit.spots(req, callback);
        }, 
        function hotels(callback) {
            ugcDataEdit.hotels(req, callback);
        }], 

        function(err, results) {
            var dataObj = results[0];
            var spots = results[1];
            var hotels = results[2];

            res.render('plans/modify', {
                daysRoute : dataObj.dayRoute,
                id : dataObj._id,   // 表明这个ugc id，ajax传递给node后，获取别的信息，减少前段任务
                title : dataObj.title,
                spots : spots,      // 城市景点 
                //locName : locName,  // 对象：起点和目的地
                hotels : hotels,
                user_info: req.session.user_info,
                config: config,
            });
        })
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
        ugcData.webFlag = 1;
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
            tempDate = calendar.addOneDay(tempDate);
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
                        temp.transfer = elem.transfer;
                        details.push(temp);
                    } else {
                        var temp = new Object();
                        temp.type = elem.type;
                        temp.subType = elem.subType;
                        temp.arrStop = elem.arrStop;
                        temp.depStop = elem.depStop;
                        temp.st = elem.ts;
                        temp.itemId = elem.itemId;
                        temp.transfer = elem.transfer;
                        details.push(temp);
                    }
                }
            }
        }
        ugcData.details = details; 
        // http post
        var options = {
            url : apiList.apiHost + apiList.ugc.editSave,
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
    var user_info = req.session.user_info;
    model.setUrl(apiList.apiHost + apiList.myPlans + user_info.id);
    model.getdata(req, function(data) {
        var planList = [], i;
        data = JSON.parse(data);
        for (i = 0;i < data.result.length;i++) {
            var plan = data.result[i],
                updateTime = new Date(plan.updateTime),//long毫秒数转Date类型时间
                updateYear = updateTime.getFullYear(),
                updateMonth = updateTime.getMonth()+1,
                updateDay = updateTime.getDate(),
                updateDate = updateYear + "." + updateMonth + "." + updateDay;
            if (plan.startDate != ""){
                var startYear = plan.startDate.substr(0,4),
                    startMonth = plan.startDate.substr(5,2),
                    startDay = plan.startDate.substr(8,2),
                    startDate = startYear;
                startDate += "." + startMonth + "." + startDay;
            }else
                startDate = 0;
            if (plan.endDate != ""){
                var endYear = plan.endDate.substr(0,4),
                    endMonth = plan.endDate.substr(5,2),
                    endDay = plan.endDate.substr(8,2),
                    endDate = endYear;
                endDate += "." + endMonth + "." + endDay;
            }else
                endDate = 0;
            planList[i] = {
                "id":           plan._id,
                "name":         plan.title,
                "image":        plan.imageList[0],
                "days":         plan.days,
                "startDate":    startDate,
                "endDate":      endDate,
                "updateDate":   updateDate
            }
        }
        res.render('plans/mine',{
            num : i,
            myPlans : planList,
            user_info: req.session.user_info,
            config: config,
        });
    });
});


router.get('/mine/delete/:planID/', function(req, res) {
    var options = {
        url:    apiList.apiHost + "/web/ugc-plans/" + req.params.planID,
        method: 'DELETE',
    };
    request(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


router.get('/mine/altername', function(req, res) {
    var data = {
            "action":   "updateTitle",
            "_id":       req.query.planId,
            "title":    req.query.planName
        };
    var options = {
        url : apiList.apiHost + "/web/ugc-plans",
        json: data,
        method: 'POST',
    };
    request(options, function(err, respond, result) {
        if (err) {
            throw err;
        }
    });
});



router.get('/create/', function(req, res){
  res.render('plans/create', {user_info: req.session.user_info, config: config,});
});


/* route timeline */
router.get('/timeline/:TEMPLATES', function(req, res) {
    
    model.setUrl(apiList.apiHost + apiList.ugc.timeline);
    model.getdata(req, function(data) {
        //res.json(JSON.parse(data));
        var data = dataExtract.preProcess(req, data);
        var basicInfo = dataExtract.basicData(req, data);
        var allRoutes = dataExtract.detailData(req, data);
        var navigation = dataExtract.navigationData(allRoutes);
        //res.send(navigation);

        res.render('plans/timeline', {
            allRoutes : allRoutes,
            basicInfo : basicInfo,
            navigation : navigation,
            user_info: req.session.user_info,
            config: config,
        });
    });
});


/* user's plan detail */
router.get('/timeline/customized/:UGCID', function(req, res) {
    model.setUrl(apiList.apiHost + apiList.ugc.detail);
    model.getdata(req, function(data) {
        var data = dataExtract.preProcess(req, data);
        var basicInfo = dataExtract.basicData(req, data);
        var allRoutes = dataExtract.detailData(req, data);
        var navigation = dataExtract.navigationData(allRoutes);

        res.render('plans/ugcdetail', {
            allRoutes : allRoutes,
            basicInfo : basicInfo,
            navigation : navigation,
            user_info: req.session.user_info,
            config: config,
        });
    });
});



/*
    addOneDay：计算XXXX-XX-XX 加一天后是多少？
*/
var calendar = (function() {
    //月份
    var ma = [['01','03','05','07','08','10'],['04','06','09','11']];

    //判断数组a是否存在在元素n 
    function check(n,a) { 
        for(var i = 0,len = a.length;i < len;i++) { 
            if(a[i] == n) { 
                return true; 
        } 
    } 
        return false; 
    }
    
    //闰?年? 
    function isLeap(y) { 
        return ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) ? true : false; 
    }
    
    return {
        addOneDay : function (o) {
            var d = o.split('-'); 
            var l = isLeap(d[0]); 
            if((check(d[1],ma[0]) && (d[2] == '31')) || (check(d[1],ma[1]) && (d[2] == '30')) || 
                (d[1] == '02' && d[2] == '28' && !l) || (d[1] == '02' && d[2] == '29' && l)) { 
            
                return d[0] + '-' + ((d[1] * 1 + 1) < 10 ? '0' + (d[1] * 1 + 1) : (d[1] * 1 + 1)) + '-01'; 
            } else if(d[1] == '12' && d[2] == '31') { 
            
                return (d[0] * 1 + 1) + '-' + '01-01'; 
            } else { 
            
                return d[0] + '-' + d[1] + '-' + ((d[2] * 1 + 1) < 10 ? '0' + (d[2] * 1 + 1) : (d[2] * 1 + 1)); 
            } 
        }   
    };               
} ());


/*
    extract the data of ugc plan for timeline
    preprocess(req, data) : parse data to JSON type
    basicData(req, data) : get basic data
    detailData(req, data) : get the detail data
    navigationData(allRoute) : the argument is the data returned by detailData(req, data)  
*/
var dataExtract = (function () {
    // data preprocess
    var preProcess = function(req, data) {
        data = JSON.parse(data);

        return data;
    };


    // basic infomation
    var basicData = function(req, data) {
        var fromLocId = req.query._fromLoc || " ";
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

        return basicInfo;
    };


    // data for navigation bar 
    var navigationData = function(allRoutes) {
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
                    tempSpot['itemName'] = oneSpot.itemName.length < 5 ? oneSpot.itemName : oneSpot.itemName.substring(0, 5)+ '...';
                    tempSpot['type'] = oneSpot.type;
                    tempSpot['latLng'] = oneSpot.lat + "," + oneSpot.lng;
                    tempActv.push(tempSpot);
                }
            }
            tempDay.actv = tempActv; // 关联地点数组
            navigation.push(tempDay);
        }

        return navigation;
    };


    var detailData = function(req, data) {
        var result = data.result;
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
                    tempRoute['openTime'] = oneDayTempRoutes[routeNum].details.openTime;
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

        return allRoutes;
    };

    return {
        preProcess : preProcess,
        basicData : basicData,
        navigationData : navigationData,
        detailData : detailData,
    };

})();


/*
    get data from user's plans to modify already exit plans 
    ugcDataEdit.route
    ugcDataEdit.spots
    ugcDataEdit.hotels
    ugcDataEdit.locName
*/
var ugcDataEdit = (function() {
    // 获取ugc基本信息，作为编辑页面左侧栏信息
    var route = function(req, callback) {
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
            dataObj.title = title;
            dataObj.dayRoute = dayRoute;

            callback(null, dataObj);
        });
    };

    // 获得对应目的地的景点信息
    var spots = function(req, callback) {
        var requestUrl = '/web/poi/view-spots/search?keyword=' + req.query.DEST + '&page=0&pageSize=9&sortField=viewCnt&sort=desc'
        model.setUrl(encodeURI(apiList.apiHost + requestUrl));
        model.getdata(req, function(data) {
            data = JSON.parse(data);
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
                spots.push(tempSpot); }
            
            callback(null, spots);
        });
    };
    
    // 获得对应目的地的酒店信息
    var hotels = function(req, callback) {
        var requestUrl = '/web/poi/hotels/search?keyword=' + req.query.DEST + '&page=0&pageSize=9';
        model.setUrl(encodeURI(apiList.apiHost + requestUrl));
        model.getdata(req, function(data){
            data = JSON.parse(data);
            var result = data.result;
            var hotels = new Array();
            for (var i = 0; i < result.length; i++) {
                var hotel = result[i];
                var tempHotel = new Object();
                tempHotel.name = hotel.name;
                tempHotel._id = hotel._id;
                tempHotel.pic = hotel.imageList[0];
                tempHotel.ranking = hotel.ratings.starLevel;
                tempHotel.price = hotel.price;
                tempHotel.phone = hotel.contact.phoneList ? hotel.contact.phoneList[0] : '';
                tempHotel.address = hotel.addr.addr;

                hotels.push(tempHotel);
            }
            
            callback(null, hotels);
        });
    };
    
    // 获取形成起始信息
    var locName = function(req, callback) {
                
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
    };


    return {
        route : route,
        spots : spots,
        hotels : hotels,
        locName : locName,
    };

})();


module.exports = router;
