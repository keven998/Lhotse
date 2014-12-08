'use strict';

define(['googlemapApi'], function(GMaper){
    /** @constructor */
    var mapDaySelectPanel = function(routeData, mapContainerDomId) {
        var cthis = this,
            routeData = routeData || null,
            latLngArray = [], // 按天
            latLngs = [], // 所有的点
            idArray = [],
            currentSelect = 0,
            mapControl = null,
            mapObject = null,
            mapContainerDomId = mapContainerDomId,
            currentRouteId = '';

        cthis.getCurrentIndex = function() {
            return currentSelect;
        };

        cthis.setCurrentIndex = function() {
            // TODO
        };

        cthis.getMapData = function() {
            var data = $('.nodeRenderData').val();
            routeData = JSON.parse(data);
            for(var i in routeData) {
                for(var j in routeData[i]) {
                    if(routeData[i][j].type == "airRoute" || routeData[i][j].type == "trainRoute")
                        routeData[i].splice(j, 1);
                }
            }
        };

        cthis.init = function() {
            cthis.mapInitial();
            cthis.getMapData();
            if (routeData) {
                cthis.setIdArray();
                cthis.addMarker();
                cthis.addSelectOptiontab();
            }
        };

        this.setIdArray = function() {
            for (var dayIndex in routeData) {
                var oneDaySpots = routeData[dayIndex];
                for (var spotIndex in oneDaySpots) {
                    idArray.push(oneDaySpots[spotIndex].id);
                }
            }
        };

        cthis.mapInitial = function() {
            mapControl = new GMaper.GMaper({});
            var lat = '',
                lng = '';
                //116.403874,39.921087
            if (!routeData) {
                lat = '27.441219';
                lng = '111.75401';
            } else {
                routeData.length && routeData[0].length
                && routeData[0][0].lng && routeData[0][0].lat
                && (lat = routeData[0][0].lng) && (lng = routeData[0][0].lat);
            }
            mapControl.init({
                mapInner: mapContainerDomId,
                lng: lng,
                lat: lat,
            });
            mapObject = mapControl.getMap();
            mapObject.setZoom(4);
        };

        cthis.addSelectOptiontab = function() {
            var selectPanelDiv = document.createElement('div'),
                selectDom = document.createElement('select'),
                totalDay = routeData.length;

            selectPanelDiv.index = 1;
            selectDom.name = "selectPanel";
            selectDom.id = "J_selectPanel";

            for (var i = 0; i <= totalDay; i++) {
                var option = document.createElement('option');
                if (0 === i) {
                    option.innerHTML = '全程';
                }else {
                    option.innerHTML = '第' + i + '天';
                }
                option.value = i;
                selectDom.appendChild(option);
            };
            selectPanelDiv.appendChild(selectDom);
            mapObject.controls[google.maps.ControlPosition.TOP_RIGHT].push(selectPanelDiv);
            if (routeData) {
                cthis.setFitView(0);
            }

            google.maps.event.addDomListener(selectDom, 'change', function() {
                var index = $('#J_selectPanel option:selected').val();
                currentSelect = index;
                cthis.drawRoute(index);
            });
        };

        cthis.addMarker = function() {
            var indexInAll = 0;
            for (var dayIndex in routeData) {
                var oneDayData = routeData[dayIndex],
                    tempMarkerArray = [];
                for (var index in oneDayData) {
                    indexInAll++;
                    var spot = oneDayData[index],
                        marker = new google.maps.LatLng(spot.lat, spot.lng);
                    tempMarkerArray.push(marker);
                    latLngs.push(marker);
                    spot.indexInAll = indexInAll;
                    spot = cthis.addHTML(spot);
                    mapControl.addMarker(spot, function(){});
                }
                latLngArray.push(tempMarkerArray);
            }
        };

        cthis.drawRoute = function(index) {
            mapControl.clearRoute();
            if (0 == index) {
                cthis.showAllMarker();
            }else {
                cthis.showOneDay(index);
                mapControl.drawDriveRoute(routeData[index - 1], null, function() {});
            }
            cthis.setFitView(index);
        };

        cthis.setFitView = function(index) {
            var bound = new google.maps.LatLngBounds();
            if (0 == index ) {
                for(var dayIndex in latLngArray) {
                    var oneDayData = latLngArray[dayIndex];
                    for (var j in oneDayData) {
                        bound.extend(oneDayData[j]);
                    }
                }
            }else {
                var selectMarkers = latLngArray[index - 1];
                for (var j in selectMarkers) {
                    bound.extend(selectMarkers[j]);
                }
            }
            mapObject.fitBounds(bound);
        };

        cthis.showOneDay = function(index) {
            for (var j in idArray) {
                var id = idArray[j];
                mapControl.hideMarker(id);
            }
            var selectDayData = routeData[index - 1];
            for (var spotIndex in selectDayData) {
                mapControl.showMarker(selectDayData[spotIndex].id);
            }
        };

        cthis.showAllMarker = function() {
            for (var j in idArray) {
                var id = idArray[j];
                mapControl.showMarker(id);
            }
        };

        cthis.hiddenAllMaker = function() {
            for (var j in idArray) {
                var id = idArray[j];
                mapControl.hideMarker(id);
            }
        };

        cthis.showMarker = function(id, dayIndex, markerDom) {
            //cthis.hiddenAllMaker();
            //cthis.showOneDay(dayIndex);

            cthis.drawRoute(dayIndex);
            // 有问题！延时不起作用
            setTimeout(cthis.MarkerAnimate(id), 10000);

        };

        cthis.MarkerAnimate = function(id) {

            var top = ["-30px", "0px"],
                speed = [160, 160],
                len = top.length,
                s = 0;
            function f() {
                var select = '#' + id.toString(),
                    dom = $(select);
                $(dom).animate(
                {
                    top: top[s]
                }, speed[s], function() {
                    ++s;
                    s < len && f($(dom));
                });
            }
            f();
        };

        cthis.addHTML = function(spot) {
            var id = spot.id,
                name = spot.name,
                indexInAll = spot.indexInAll,
                markerHtmlElements = [];

            markerHtmlElements.push('<a class="map_marker" id="' + id + '" href="javascript:;" title="' + name + '">');
            markerHtmlElements.push("\t<i>" + indexInAll + "</i>");
            markerHtmlElements.push("\t<em>" + name + "</em>");
            markerHtmlElements.push("</a>");
            spot.markerHtml = markerHtmlElements.join("");
            return spot;
        };

        cthis.updateData = function(data) {
            routeData = data;
            latLngArray = [];
            idArray = [];
            currentSelect = 0;
            cthis.init();
        };

        cthis.calcuDistance = function(index){
            if(index < 0 || (index >= latLngs.length)) {
            return '两地相距: ' + 0 + ' Km';
                return
            }

            var LatLng_1 = latLngs[index -1],
                LatLng_2 = latLngs[index],
                distance = mapControl.distance(LatLng_1, LatLng_2) / 1000;
            return '两地相距: ' + distance.toFixed(2) + ' Km';
        }
    };

    return {
        'mapControlPanel' : mapDaySelectPanel,
    };

});
