
      var map;
      var centerMarker;
      function initialize() {
        // 地图参数设置
        var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(27.438689, 111.742316),
        mapTypeId: google.maps.MapTypeId.HYBRID,
        };
        // map对象
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        // 图钉对象
        var centerOption = {
          position : map.getCenter(),
          map : map,
          title : '魅力之乡',
        };
        centerMarker = new google.maps.Marker(centerOption);
        // 设置时间监听
        var divDay = document.getElementById('day');
        google.maps.event.addDomListener(divDay, 'click', jump);
      }      
      // 加载谷歌地图
      //google.maps.event.addDomListener(window, 'load', initialize);
      // 跳动
      function jump() {
        if (centerMarker.getAnimation() != null) {
          centerMarker.setAnimation(null);
        } else {
          centerMarker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      
      //异步加载地图
      function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
            'callback=initialize';
        document.body.appendChild(script);
      }
      window.onload = loadScript;
      
    
