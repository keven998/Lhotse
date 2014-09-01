     
      var map;
      var path;
      var centerMarker;
      var spotArray = new Array();
      var spotNum = 1;
      var event = new Array();
      var latlngArray = new Array();
      // 当前鼠标点击的景点号
      var pointFlag;
      // 当前连线点击的号
      var lineFlag = 0;
      // 地图中心点的经纬度
      var centerLatlng;
      // 所有点的经纬度
      var allPointLatlng = new Array();

      function initialize() {
        //计算地图中心点
        var center = calculateCenterPoint();
        var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(center[0], center[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        // map对象
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        setSpots(map);
        spotStatusInitial();


        // 设置事件监听，用于地图点的跳动交互
        var total = getTotalSpots();
        alert(total);
        for(;spotNum <= total; spotNum++ ) {
          var str = "#latLng_" + spotNum;
          // 鼠标悬浮时
          $(str).mouseover(function(){
            var titlename = $(this).attr("id");
            var num = titlename.substring(6, titlename.length);
            spotStatus(num);
          });
          // 鼠标离开时
          $(str).mouseleave(function(){
            var titlename = $(this).attr("id");
            var num = titlename.substring(6, titlename.length);
            mouseLeaveAction();
          });
        }

        // 链接所有的点
        path = new google.maps.Polyline({
          path: latlngArray,
          strokeColor: "#FF0000",
          strokeOpacity: 3.0,
          strokeWeight: 2
        });

        path.setMap(map);


        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 5,
          strokeColor: '#393'
        };
        // 设置事件监听用于画两点之间的连线
//        for(var i = 1; i <= total; i++ ) {
//          var str = "#distance" + i;
//          $(str).click(function() {
//            var distancename = $(this).attr("id");
//            var num = distancename.substring(8, distancename.length);
//            //alert(num);
//            connect(num);
//          });
//        }

        function connect(num) {
          //if (lineFlag == num)

          // 覆盖原始链接
          path.setMap(map);
          var twoPoints = new Array();
          twoPoints.push(latlngArray[num-1]);
          twoPoints.push(latlngArray[num]);
          //alert(twoPoints);
          var connectline = new google.maps.Polyline({
            path : twoPoints,
            icons: [{
              icon: lineSymbol,
              offset: '100%'
            }],
            map: map,
            strokeColor: "#35bf08",
            strokeOpacity: 3.0,
            strokeWeight: 2,
          });

//          connectline.setMap(map);
          animateCircle();

          // 动画
          function animateCircle() {
            var count = 0;
            connectline.setVisible(true);
            window.setInterval(function() {
              if (count != 399) {
                count = (count + 1) % 400;
                var icons = connectline.get('icons');
                icons[0].offset = (count / 3) + '%';
                connectline.set('icons', icons);
              }
              else
                connectline.setVisible(false);
            }, 10);
          }
        }



      }

      // ===========================================================
      //异步加载地图
      function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
            'callback=initialize';
        document.body.appendChild(script);
      }
      window.onload = loadScript;

      // 获得景点数
      function getTotalSpots() {
        var number = document.getElementById('totalSpots').innerHTML;
        return number;
      }

      // 设置所有的点，并标记在地图上
      function setSpots(map) {
        var total = getTotalSpots();
        for (var i = 1; i <= total; i++) {
          var type = document.getElementById("type_" + i).innerHTML;
          if (type == "vs") {
            var loc = document.getElementById("latLng_" + i).innerHTML;
            var title = document.getElementById("spot_" + i).innerHTML;
            var locarr = loc.split(",");
            var latlng = new google.maps.LatLng(locarr[0], locarr[1]);
            var spot = new google.maps.Marker({
                position : latlng,
                map : map,
                title : title,
            });
  //          spot.setIcon("123");
            // 获得一些重要的全局变量
            spotArray.push(spot);
            latlngArray.push(latlng);
          }
        }
      }

      // 计算合理的地图中心点
      // return: array[lat, lng]
      function calculateCenterPoint() {
        var total = getTotalSpots();
        for (var i = 1; i <= total; i++) {
          var loc = document.getElementById("latLng_" + i).innerHTML;
          var title = document.getElementById("spot_" + i).innerHTML;
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
//        alert(centerPoint);
        return centerPoint;
      }

      // 初始化所有点的动作状态，默认为静止
      function spotStatusInitial() {
        for (var i = 0; i < spotArray.length; i++) {
          spotArray[i].setAnimation(null);  //google.maps.Animation.BOUNCE
        }
      }

      function setSpotStatus(m) {
          for (var i = 0; i < spotArray.length; i++) {
            if (i == m - 1 || i == m)
              spotArray[i].setAnimation(google.maps.Animation.BOUNCE);
            else
              spotArray[i].setAnimation(null);  //google.maps.Animation.BOUNCE
          }


      }

      //改变某一个点的动作状态,设置一个监听位
      function spotStatus(num) {
        if (pointFlag != num)
          spotStatusInitial();
        pointFlag = num;
        if (spotArray[num-1].getAnimation() != null) {
          spotArray[num-1].setAnimation(null);
        } else {
          spotArray[num-1].setAnimation(google.maps.Animation.BOUNCE);
        }
      }

      function mouseLeaveAction() {
        spotStatusInitial();
      }








