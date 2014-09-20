var express = require('express');
var router = express.Router();
var routeDetail = require('../model/route_detail');
var request = require('request'); 

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

/* 编辑路线 */
router.get('/edit/:TEMPLATES/', function(req, res) {
  model.setUrl(apiList.apiHost + apiList.ugc.edit);  
  model.getdata(req, function(data) {
    data = JSON.parse(data);    
    //res.json(data);
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
        temp.itemId = elem.itemId;
        temp.itemName = elem.itemName;
        tempArr.push(temp);
      }
      dayRoute.push(tempArr);  
    }
    res.render('plans/edit',{
      daysRoute : dayRoute,
    });
  });
});

router.get('/edit/post', function(req, res) {
  var data = req.query;
  var options = {
    url : "http://api.lvxingpai.cn/web/ugc-plans",
    json: data,
    method: 'POST',
  };
  request(options, function(err, respond, result) {
      if (err) {
        throw err;
      }
  res.json(result);
  });
});


router.get('/mine/', function(req, res){
    var user_info = req.session.user_info
    model.setUrl(apiList.apiHost + apiList.myPlans + user_info._id);
    model.getdata(req, function(data) {
        var planList = [];
        data = JSON.parse(data);
        for (var i = 0;i < data.result.length;i++) {
            var plan = data.result[i],
                updateTime = new Date(plan.updateTime),//long毫秒数转Date类型时间
                updateYear = updateTime.getFullYear(),
                updateMonth = updateTime.getMonth(),
                updateDay = updateTime.getDay(),
                updateDate = updateYear + "." + updateMonth + "." + updateDay;
            if (plan.startDate != ""){
                var startYear = plan.startDate.substr(0,4),
                    startMonth = plan.startDate.substr(5,2),
                    startDay = plan.startDate.substr(8,2),
                    startDate = startYear;
                if (startMonth.substr(0,1) == "0")
                    startMonth = startMonth.substr(1,1);
                if (startDay.substr(0,1) == "0")
                    startDay = startMonth.substr(1,1);
                startDate += "." + startMonth + "." + startDay;
            }else
                startDate = 0;
            if (plan.endDate != ""){
                var endYear = plan.endDate.substr(0,4),
                    endMonth = plan.endDate.substr(5,2),
                    endDay = plan.endDate.substr(8,2),
                    endDate = endYear;
                if (endMonth.substr(0,1) == "0")
                    endMonth = endMonth.substr(1,1);
                if (endDay.substr(0,1) == "0")
                    endDay = endMonth.substr(1,1);
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
            myPlans : planList,
        });
    });
});


router.get('/mine/delete/:planID/', function(req, res) {
    var options = {
        url:    "http://api.lvxingpai.cn/web/ugc-plans/" + req.params.planID,
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
        url : "http://api.lvxingpai.cn/web/ugc-plans",
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
  res.render('plans/create');
});


router.get('/edit/:TEMPLATES', function(req, res) {
  res.render('plans/edit');
});

/* GET users listing. */
router.get('/timeline/:TEMPLATES', function(req, res) { 
   model.setUrl(apiList.apiHost + apiList.ugc.timeline);
   model.getdata(req, function(data) {
     data = JSON.parse(data);
     var requestUrl = req.originalUrl;
     //提取数据     
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
    
     var basicInfo = new Object();
     basicInfo['_id'] = _id;
     basicInfo['templateId'] = templateId;
     basicInfo['title'] = title;
     basicInfo['desc'] = result.desc || "";
     basicInfo['days'] = days;
     basicInfo['budget'] = budget;
     basicInfo['requestUrl'] = requestUrl;
    
     // 日程安排
     var details = result.details;    
     
     // 转换每日日期格式 "2014-08-30 00:00:00+0800" --> "2014-08-30"
     for (var i = 0; i < details.length; i++) {
       details[i].date = details[i].date.split(" ")[0];
     }
    
     // 包含每天的路线信息，一天一个元素
     var allRoutes = new Array();
    
     for (var dayNumber = 0; dayNumber < details.length; dayNumber++) {
       var oneDay = new Object();
       var tempDay = details[dayNumber];
       oneDay['date'] = tempDay.date;
       oneDay['hasTraffic'] = "no"; //默认值
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
         } else if (oneDayTempRoutes[routeNum].type == "traffic") {
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
             } else if (oneDayTempRoutes[routeNum].subType == "airRoute" || oneDayTempRoutes[routeNum].subType == "trainRoute") {
               // 航班路线提取
               tempRoute['itemId'] = oneDayTempRoutes[routeNum].itemId;
               tempRoute['itemName'] = oneDayTempRoutes[routeNum].itemName;
               tempRoute['type'] = oneDayTempRoutes[routeNum].subType;
               tempRoute['ts'] = oneDayTempRoutes[routeNum].ts.substr(11,8);
               tempRoute['arrTime'] = oneDayTempRoutes[routeNum].arrTime.substr(11,8);
               oneDayRoutes.push(tempRoute);
             } else if (oneDayTempRoutes[routeNum].subType == "train") {
               // 火车路线提取
               tempRoute['itemId'] = oneDayTempRoutes[routeNum].itemId;
               tempRoute['itemName'] = oneDayTempRoutes[routeNum].itemName;
               tempRoute['type'] = oneDayTempRoutes[routeNum].subType;
               tempRoute['ts'] = oneDayTempRoutes[routeNum].ts.substr(11,8);
               tempRoute['arrTime'] = oneDayTempRoutes[routeNum].arrTime.substr(11,8);
               oneDayRoutes.push(tempRoute);
             }
         } else if (oneDayTempRoutes[routeNum].type == "hotel") {
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
    
     // 导览栏
     var navigation = new Array();   
     for (var i = 0; i < allRoutes.length; i++) {
       var oneDay = allRoutes[i];
       var oneDayRoutes = oneDay.actv;
       var tempDay = new Object();
       tempDay.date = oneDay.date; // 时间
       var tempActv = new Array(); // 存放地点数组
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
     res.render('plans/timeline', {
       allRoutes : allRoutes,
       basicInfo : basicInfo,
       navigation : navigation,
     });
  });
});

module.exports = router;
