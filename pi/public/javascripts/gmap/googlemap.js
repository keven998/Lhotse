/*
    地图交互
*/
var map;
var centerMarker;
var spotArray = new Array();
var event = new Array();
var latlngArray = new Array();
// 所有点的经纬度
var allPointLatlng = new Array();


function initialize() {
    //计算地图中心点
    var center = calculateCenterPoint();
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(center[0], center[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    // map对象
    map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
    // 地图打点
    setSpots(map);

    // 设置交互
    $('.timeline-detail').find('.viewspot').each(function (k,v) {
        var idStr = $(v).attr('id');
        var num = idStr.substring(3);
        // 可以写一个内容丰富的html
        var content = '<p>' +spotArray[num-1].getTitle() + '</p>';
        var infowindow = new google.maps.InfoWindow({
            content: content,
        });
        // hover二态
        $(v).hover(

            // over
            function() {
                map.panTo(spotArray[num-1].getPosition());
                if (spotArray[num-1].getAnimation() == null) {
                    spotArray[num-1].setAnimation(google.maps.Animation.BOUNCE);
                }
                infowindow.open(map, spotArray[num-1]);
            },
            // leave
            function() {
                map.panTo(spotArray[num-1].getPosition());
                if (spotArray[num-1].getAnimation() != null) {
                    spotArray[num-1].setAnimation(null);
                }
                infowindow.close();
            }
        )
    })
}

// 获得景点数
function getTotalSpots() {
    return document.getElementById('totalSpots').innerHTML;
}


// 设置所有的点，并标记在地图上
function setSpots(map) {
    var total = getTotalSpots();
    for (var i = 1; i <= total; i++) {
        //var loc = $("#vs_" + i).children("div.latlng").text();
        var loc = $("#vs_" + i).children("div.latlng").text();
        var title = $("#vs_" + i).children("h3").text();
        var locarr = loc.split(",");
        var latlng = new google.maps.LatLng(locarr[0], locarr[1]);
        // 计算icon的位置
        var height = i * 50;
        var image = {
                      url: "http://zanbai.com/images/pin.png",
                      size: new google.maps.Size(27,31),
                      origin: new google.maps.Point(50,height),
                    };
        var spot = new google.maps.Marker({
            position : latlng,
            map : map,
            title : title,
            icon : image,
            clickable : true,
        });
        // 获得一些重要的全局变量
        spotArray.push(spot);
        latlngArray.push(latlng);
    }
}


// 计算合理的地图中心点
// return: array[lat, lng]
function calculateCenterPoint() {
    var total = getTotalSpots();
    for (var i = 1; i <= total; i++) {
        var loc = $("#vs_" + i).children("div.latlng").text();
        var locarr = loc.split(",");
        allPointLatlng.push(locarr[0]);
        allPointLatlng.push(locarr[1]);
    }
    //alert(allPointLatlng);
    var centerPoint = new Array();
    var latMax = 0;
    var lngMax = 0;
    var latMin = parseFloat(allPointLatlng[0]);
    var lngMin = parseFloat(allPointLatlng[1]);
    var len = allPointLatlng.length;
    for (var i = 0; i < len; i++ ) {
        if (i % 2 == 0) {
          if(latMin > parseFloat(allPointLatlng[i]))
            latMin = parseFloat(allPointLatlng[i]);
          if(latMax < parseFloat(allPointLatlng[i]))
            latMax = parseFloat(allPointLatlng[i]);
        }
        else {
          if(lngMin > parseFloat(allPointLatlng[i]))
            lngMin = parseFloat(allPointLatlng[i]);
          if(lngMax < parseFloat(allPointLatlng[i]))
            lngMax = parseFloat(allPointLatlng[i]);
        }
    }
    centerPoint.push(((latMin+latMax)/2).toFixed(6));
    centerPoint.push(((lngMin+lngMax)/2).toFixed(6));
    return centerPoint;
}


// 异步加载地图
function loadScript() {
    initialize();
    // var script1 = document.createElement('script');
    // script1.type = 'text/javascript';
    // script1.src = 'http://ditu.google.cn/maps/api/js?v=3.8&sensor=false&language=zh_cn';
    // document.body.appendChild(script1);

  
}
window.onload = loadScript;