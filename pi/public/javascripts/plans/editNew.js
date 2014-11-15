console.log('hello');
/*
    详情中的spot拖拽实现
*/
$(function() {
    $( "#day_list" ).sortable();
    //$( "#day_list" ).disableSelection();
});

/*
    谷歌地图模块
*/
/* -----GOOGLE MODULE BEGIN-----*/
var GMaper = function(h) {
    var that = this,    // [f]
        mapObj = null,  // [l]
        directionsService = new google.maps.DirectionsService, // [m]
        directionsRenderer = null, // [u]
        markers = {}, // [s]
        infoWindows = {}, // [z]
        createMarker = null,   // [x]  add marker
        createInfoWindow = null;   // [y]  create InfoWindow

    that.init = function(p) {
        /* p为以下对象
            {   // 提供id和中心点
                mapInner: "dayMapInner",
                lng: h[0][0].lng, // 第一天的第一个
                lat: h[0][0].lat
            }
        */
        var mapDiv= document.getElementById(p.mapInner),
            q = true;
        false == h.scrollWheel && (q = false);
        var s = h.mapTypeControl || false;
        mapDiv && (mapObj = new google.maps.Map(mapDiv, {
            mapTypeControl: s,
            center: new google.maps.LatLng(p.lat, p.lng),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: q,
            // 调节比例尺位置到右边
            zoomControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
                style: google.maps.ZoomControlStyle.LARGE
            },
            // 去掉导航圆盘
            panControl: false,//去掉
            // 不要街景小人icon
            streetViewControl: false,
        }));
        directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            preserveViewport: true
        });
        google.maps.event.addListener(mapObj, "click", function(l) {
            h.clickListener &&
                "function" == $.type(h.clickListener) && h.clickListener();
            that.hideInfoWindows()
        });
        google.maps.event.addListener(mapObj, "idle", function(f) {
            h.idleListener && "function" == $.type(h.idleListener) && h.idleListener(this.getCenter(), this.getZoom())
        })
    };


    that.setCenterByLatLng = function(lat, lng) {
        mapObj.setCenter(new google.maps.LatLng(lat, lng));
    };

    that.setCenter = function(latLng) {
        mapObj.setCenter(latLng);
    };

    that.getCenter = function() {
        return mapObj.getCenter();
    };

    that.setZoom = function(num) {
        mapObj.setZoom(num)
    };

    that.getZoom = function() {
        return mapObj.getZoom()
    };

    that.clearRoute = function() {
        directionsRenderer.setMap(null)
    };

    that.clearMap = function() {
        directionsRenderer.setMap(null);
        that.clearInfoWindow();
        for (var h in markers)
            markers.hasOwnProperty(h) && markers[h].setMap(null);
        markers = {}
    };

    that.setFitView = function() {
        var bound = new google.maps.LatLngBounds,
            h;
        for (h in markers)
            markers[h].getMap() && bound.extend(markers[h].latLng);
        mapObj.fitBounds(bound);
    };

    that.addMarkers = function(markers) {
        for (var l = markers.length, m = 0; m < l; m++)
            that.addMarker(markers[m], function() {});
    };
//////////////////////////////////////////////////////////////////
    that.addMarker = function(f, callback) {
        var latLng = new google.maps.LatLng(f.lat, f.lng),
            id = f.id,
            // 继承自 OverlayView class
            marker = new createMarker(f.markerHtml, latLng, function() {
                var f = $(this.div.firstChild);
                callback(f, latLng);
            });
        marker.setMap(mapObj);
        markers[id] = marker;
    };

    that.getMarker = function(id) {
        var marker;
        //markers[id] && marker = markers[id]
        return marker;
    };

    that.removeMarker = function(id) {
        var h = markers[id];
        h && (h.setMap(null), delete markers[id])
    };

    that.removeMarkers = function(markers) {
        for (var l = markers.length, m = 0; m < l; m++)
            that.removeMarker(markers[m])
    };

    that.showMarker = function(f) {
        markers[f] && markers[f].setMap(mapObj)
    };

    that.showMarkers = function(markers) {
        for (var l = markers.length, m = 0; m < l; m++)
            that.showMarker(markers[m])
    };

    that.hideMarker = function(f) {
        markers[f] && markers[f].setMap(null)
    };

    that.hideMarkers = function(markers) {
        for (var l = markers.length, m = 0; m < l; m++)
            that.hideMarker(markers[m])
    };

    that.checkMarker = function(id) {
        return markers[id] ? true : false
    };

    that.checkMarkerShow = function(id) {
        return markers[id] &&
            markers[id].getMap() ? true : false
    };

//------------------------------------
    that.createInfo = function(h, callback) {
        var q = h.id,
            s = infoWindows[q];
        if (s) {
            if (s.getMap())
                return
        } else s = new createInfoWindow(h.infoHtml, h.latLng, h.gOffset || [0, -103],
            function() {
            callback($(this.div.firstChild))
        }), infoWindows[q] = s;
        that.hideInfoWindows();
        s.setMap(mapObj)
    };

    that.checkInfo = function(id) {
        return infoWindows[id] ? true : false
    };

    that.getInfo = function(id) {
        return infoWindows[id] ? infoWindows[id] : null
    };

    that.openInfo = function(id) {
        that.hideInfoWindows();
        that.getInfo(id).setMap(mapObj)
    };

    that.hideInfoWindow = function(id) {
        infoWindows[id] && infoWindows[id].setMap(null)
    };

    that.hideInfoWindows = function() {
        for (var f in infoWindows)
            infoWindows.hasOwnProperty(f) && infoWindows[f].setMap(null)
    };

    that.clearInfoWindow = function() {
        for (var f in infoWindows)
            infoWindows.hasOwnProperty(f) && infoWindows[f].setMap(null);
        infoWindows = {}
    };

    that.drawRoute = function(f, mode, callback) {
        for (var s = f.length - 1,
                x = 1,
                waypoints = [],
                start = new google.maps.LatLng(f[0].lat, f[0].lng),
                end = new google.maps.LatLng(f[s].lat, f[s].lng); x < s; x++)
        {
            var C = new google.maps.LatLng(f[x].lat, f[x].lng);
            waypoints.push({
                location: C,
                stopover: !0
            })
        }
        directionsService.route({
            origin: start,
            destination: end,
            waypoints: waypoints,
            optimizeWaypoints: !1,
            travelMode: mode,
            unitSystem: google.maps.UnitSystem.METRIC
        }, function(result, state) {
            var m = {
                msg: 0
            };
            if (state == google.maps.DirectionsStatus.OK &&
                (directionsRenderer.getMap() || directionsRenderer.setMap(mapObj), directionsRenderer.setDirections(result), result.routes && result.routes[0].legs && 0 < result.routes[0].legs.length)) {
                m.msg = 1;
                var v = result.routes[0].legs[0],
                    p = v.steps,
                    t = p.length,
                    s = 0;
                m.distance = v.distance.text;
                m.time = v.duration.text;
                for (m.steps = []; s < t; s++) v = p[s].instructions, v = v.replace(/<\/?[^>]*>/g, ""), m.steps.push(v)
            }
            callback(m);
        })
    };

    that.drawWalkRoute = function(h, l) {
        that.drawRoute(h, google.maps.TravelMode.WALKING, l)
    };
    that.drawDriveRoute = function(h, l) {
        that.drawRoute(h, google.maps.TravelMode.DRIVING, l)
    };
    that.drawPublicTransitRoute = function(h, l) {
        that.drawRoute(h, google.maps.TravelMode.TRANSIT, l)
    };


    (function() {
        createMarker = function(html, latLng, callback) {
            this.html = html;
            this.latLng = latLng;
            this.ready = callback;
            this.div = null
        };
        createMarker.prototype = new google.maps.OverlayView;
        $.extend(createMarker.prototype, {
            onAdd: function() {
                var f = document.createElement("div");
                f.innerHTML = this.html;
                f.style.position = "absolute";
                this.getPanes().overlayImage.appendChild(f);
                this.div = f;
                this.ready.call(this)
            },
            draw: function() {
                this.dom = this.div.firstChild;
                var f = this.getProjection().fromLatLngToDivPixel(this.latLng);
                this.div.style.left =
                    f.x - 15 + "px";
                this.div.style.top = f.y - 40 + "px"
            },
            onRemove: function() {
                this.div.parentNode.removeChild(this.div);
                this.div = null
            }
        })
    })();
    (function() {
        createInfoWindow = function(f, h, l, m) {
            this.html = f;
            this.latLng = h;
            this.ready = m;
            this.div = null;
            this.offset = l
        };
        createInfoWindow.prototype = new google.maps.OverlayView;
        $.extend(createInfoWindow.prototype, {
            onAdd: function() {
                var f = document.createElement("div");
                f.innerHTML = this.html;
                f.style.position = "absolute";
                f.style.zIndex = "5";
                this.getPanes().overlayImage.appendChild(f);
                this.div = f;
                this.ready.call(this)
            },
            draw: function() {
                var f = this.getProjection(),
                    h = mapObj.getBounds(),
                    m = f.fromLatLngToDivPixel(this.latLng),
                    s = h.getNorthEast().A,
                    u = h.getSouthWest().A,
                    x = f.fromLatLngToDivPixel(h.getNorthEast()),
                    f = f.fromLatLngToDivPixel(h.getSouthWest()),
                    v = $(this.div.firstChild).outerWidth(),
                    h = $(this.div.firstChild).outerHeight(),
                    v = v / 2;
                left = m.x - v + this.offset[0];
                bottom = -m.y + (h + this.offset[1]);
                this.div.style.left = left + "px";
                this.div.style.bottom = bottom + "px";
                var t = 0,
                    C = 0;
                m.x < f.x + v + 5 && (t = m.x - (f.x + v + 5));
                m.x > x.x - v - 5 && (t = m.x - (x.x - v - 5));
                C = m.y - (h + 55) - x.y;
                C = 0 >
                    C ? C : 0;
                180 !== s && -180 !== u ? (t || C) && mapObj.panBy(t, C) : C && mapObj.panBy(0, C)
            },
            onRemove: function() {
                this.div.parentNode.removeChild(this.div);
                this.div = null
            }
        })
    })()
};
/*-----GOOGLE MODULE END-----*/

function getCTMUrl(h, f, l) {
    f = "#ctm_ref=gs_ttd_" + ("290595_" + {
        Detail: 2,
        Sale: 3,
        "Map-Full": 5,
        "Map-Traffic": 6
    }[f] + "_" + l + "_undefined_" + (INTERFACE.districtId || "") + "_" + (INTERFACE.scheduleId || ""));
    return h + f
}

/* 地图中点的动态效果 */
function MarkerAnimate(h) {
    var l = [-30, 0],
        m = [160, 160],
        u = l.length,
        s = 0;

    function f() {
        h.animate({
            top: l[s]
        }, m[s], function() {
            ++s;
            s < u && f(h)
        })
    }
    f();
}

/* js生成地图上的弹层 */
function createInfoHtml(h) {
    var f = {
            1: "hotel",
            2: "restaurant",
            3: "sight",
            4: "destination",
            5: "shopping",
            6: "amusement"
        },
        l = [],
        m = h.type,
        u = function(f, h) {
            return getCTMUrl(f, INTERFACE.mapType || "Map-Full", h)
        },
        s = function(f, h) {
            var l = "";
            "" != f.photoUrl && (l = '<img src="' + f.photoUrl + '" alt="">');
            h = h || f.url;
            return '<a target="_blank" href="' + h + '" class="poipic">' + l + "</a>"
        },
        z = function(f) {
            var h = "";
            return h = 0 < f.rstar ? '<span class="hotel_stars0' + f.rstar + '" title="' + f.hotelStarTitle + '"></span>' : '<span class="hotel_diamond0' +
                f.customerEval + '" title="' + f.hotelDiamondTitle + '"></span>'
        };
    l.push('<div class="gs_poi_pop_outer cf" style="position: absolute;top:20px;left:50px;"><div class="gs_poi_pop cf" data-type="'+ m + '">' + '<a class="btn_close" href="#">\u00d7</a>');
    switch (m) {
        case 4:
            l.push(s(h));
            l.push('<dl class="cf">');
            return;
        case 1:
            l.push(s(h, u(h.url, "Hol")));
            l.push('<dl class="cf">');
            l.push('<dt><i class="' + f[m] + '"></i><a target="_blank" href="' + u(h.url, "Hol") + '">' + h.name + "</a></dt>");
            0 < h.price ? (l.push("<dd>" + z(h) + "</dd>"), l.push("<dd>" + h.address +
                "</dd>"), l.push("<dd><b>" + h.score + "</b>/5\u5206\u2003" + h.recommendRate + "\u7528\u6237\u63a8\u8350\u2003\u6e90\u81ea" + h.commentCount + "\u4f4d\u4f4f\u5ba2\u70b9\u8bc4</dd>"), l.push('<dd><a target="_blank" href="' + u(h.bookUrl, "Hol") + '" class="b_orange_s">\u7acb\u5373\u9884\u8ba2</a><span class="price">\u00a5<em>' + h.price + "</em>\u8d77</span></dd>")) : (0 != h.commentCount ? l.push('<dd> <span class="starlist_12"> <span style="width:' + 100 * (h.score / 5) + '%;"> </span> </span>' + h.commentCount + "\u6761\u70b9\u8bc4</dd>") :
                l.push("<dd>\u6682\u65e0\u70b9\u8bc4</dd>"), l.push("<dd>" + h.address + "</dd>"), l.push('<dd><a target="_blank" href="' + u(h.url, "Hol") + '" class="b_blue_s">加入行程</a></dd>'));
            break;
        case 2:
            l.push(s(h));
            l.push('<dl class="cf">');
            l.push('<dt><i class="' + f[m] + '"></i><a target="_blank" href="' + h.url + '">' + h.name + "</a></dt>");
            h.averagePrice = "0" == h.averagePrice ? "\u6682\u65e0" : '<span class="price">' + h.averagePrice + "</span>\u5143";
            0 != h.commentCount ? l.push('<dd> <span class="starlist_12"> <span style="width:' +
                100 * (h.score / 5) + '%;"> </span> </span>' + h.commentCount + '\u6761\u70b9\u8bc4<span class="g_line">|</span>\u4eba\u5747\uff1a' + h.averagePrice + "</dd>") : l.push("<dd>\u6682\u65e0\u70b9\u8bc4</dd>");
            l.push("<dd>" + h.address + "</dd>");
            l.push('<dd><a target="_blank" href="' + h.url + '" class="b_blue_s">加入行程</a></dd>');
            break;
        case 3:
            l.push(s(h));
            l.push('<dl class="cf">');
            l.push('<dt><i class="' + f[m] + '"></i><a target="_blank" href="' + h.url + '">' + h.name + "</a></dt>");
            0 != h.commentCount ? l.push('<dd> <span class="starlist_12"> <span style="width:' +
                100 * (h.score / 5) + '%;"> </span> </span> ' + h.commentCount + "\u6761\u70b9\u8bc4</dd>") : l.push("<dd>\u6682\u65e0\u70b9\u8bc4</dd>");
            l.push("<dd>" + h.address + "</dd>");
            0 == h.price ? l.push('<dd><a class="b_blue_s">加入行程</a></dd>') : l.push('<dd><a target="_blank" href="' + u(h.ticketbookUrl, "Tkt") + '" class="b_orange_s">\u7acb\u5373\u9884\u8ba2</a><span class="price">\u00a5<em>' + h.price + '</em></span><span class="delspace">\u5e02\u573a\u4ef7\uff1a<del>\u00a5' + h.marketPrice +
                "</del></span></dd>");
            break;
        case 5:
            l.push(s(h));
            l.push('<dl class="cf">');
            l.push('<dt><i class="' + f[m] + '"></i><a target="_blank" href="' + h.url + '">' + h.name + "</a></dt>");
            h.averagePrice = "0" == h.averagePrice ? "\u6682\u65e0" : '<span class="price">' + h.averagePrice + "</span>\u5143";
            0 != h.commentCount ? l.push('<dd> <span class="starlist_12"> <span style="width:' + 100 * (h.score / 5) + '%;"> </span> </span>' + h.commentCount + '\u6761\u70b9\u8bc4<span class="g_line">|</span>\u4eba\u5747\uff1a' + h.averagePrice + "</dd>") : l.push("<dd>\u6682\u65e0\u70b9\u8bc4</dd>");
            l.push("<dd>" + h.address + "</dd>");
            l.push('<dd><a target="_blank" href="' + h.url + '" class="b_blue_s">\u67e5\u770b\u8be6\u60c5</a></dd>');
            break;
        case 6:
            l.push(s(h)), l.push('<dl class="cf">'), l.push('<dt><i class="' + f[m] + '"></i><a target="_blank" href="' + h.url + '">' + h.name + "</a></dt>"), 0 != h.commentCount ? l.push('<dd> <span class="starlist_12"> <span style="width:' + 100 * (h.score / 5) + '%;"></span></span> ' + h.commentCount + "\u6761\u70b9\u8bc4</dd>") : l.push("<dd>\u6682\u65e0\u70b9\u8bc4</dd>"), l.push("<dd>" + h.address +
                "</dd>"), 0 < h.price && l.push('<dd><a target="_blank" href="' + u(h.ticketbookUrl, "Tkt") + '" class="b_orange_s">\u7acb\u5373\u9884\u8ba2</a><span class="price">\u00a5<em>' + h.price + '</em></span><span class="delspace">\u5e02\u573a\u4ef7\uff1a<del>\u00a5' + h.marketPrice + "</del></span></dd>")
    }
    l.push("</dl>");
    l.push('<s class="bot_arrow"></s></div></div>');
    return l.join("")
}


/*
    路线编辑界面导航栏与地图交互，负责生成导航栏，创建景点列表，地图打点
*/
/*------DayMapControl BEGIN-----*/
var DayMapControl = function(constructInput) {
        var that = this,   // [f]
            map = null, // 地图   [l]
            inputBuff = null,   // 输入参数h的缓存     [m]
            spotId = [],     //数组，每个元素依然是数组，代表一天的景点数，数据是spotID   [u]
            mapDiv = $("#map_inner"),  // 地图dom元素     [s]
            spotCount = 0,

            dayNavi = $(".map_side .day_tab"),  // 日期栏    [z]
            allDay = $(".J_all_day"),

            dayNaviUl = $("#day_list"),  // 天数1，2，3，4，5......  [x]
            dayDetail = $(".J_day_detail_list"),  // 景点列表     [y]
            spotType = {       // [p]
                1: "hotel",
                2: "restaurant",
                3: "sight",
                4: "default",
                5: "shopping",
                6: "amusement"
            },
            inputLen = 0,  // 缓存的长度，即输入的数据，物理意义是行程天数     [D]
            currDayNum = 0,  // 被激活的日期，1，2，3，4.。。。   [q]
            mapConfig = [],     //每天一天的地图配置, index为天元素是对象，包含center和zoom字段   [J]
            hotelBuff = [],     // hotel 容器，元素是spotId     [U]
            restaurantBuff = [];    //  restaurantBuff容器，元素是spotId    []

        // 获取地图对象
        that.getMaper = function() {
            if (map)
                return map;
        };

        // 获得当前选中日期
        that.getCurDayNum = function() {
            return currDayNum - 1;   // 减去1，从0开始
        };

        // 初始化：新建地图，初始化地图，添加所有POI，执行回调函数
        that.init = function(poiData, callback) {
            poiData
            && (0 < poiData.length && 0 < poiData[0].length && poiData[0][0].lng && poiData[0][0].lat)
            && (inputBuff = poiData,
                map = new GMaper({
                    clickListener: function() {
                        that.removeMarkerCurrent();
                        that.removeNearbyCurrent()
                    },
                    idleListener: function(center, zoom) {
                        mapConfig[currDayNum] || (mapConfig[currDayNum] = {});
                        mapConfig[currDayNum].center = center;
                        mapConfig[currDayNum].zoom = zoom
                    }
                }),
                // 激活地图，输入domDIV，经纬度
                map.init({
                    mapInner: "map_inner",
                    lng: poiData[0][0].lng,
                    lat: poiData[0][0].lat,
                }),
                /*
                    整个逻辑的入口，后面都是拆分。
                    传入函数的t运行，添加所有的点，设置视图，并运行传入的函数
                */
                that.addAllPoi(), that.setView(-1), $.isFunction(callback) && callback()
                )
        };

        // 添加所有景点，并且设置“全程”、D1,D2...、POI详情栏的鼠标事件（enter，leave，click）
        that.addAllPoi = function() {
            var length = inputBuff.length,
                i = 0;
            for (inputLen = length; i < length; i++)
                that.addDayPoi(inputBuff[i], i);   //添加一天的行程

            // 当length大于20时，启动“向上点击”按钮
            // 20 < length && $(".day_tab .control").show();

            // 点击"全程"，天数设置为 -1，从0开始
            allDay.on("click", function() {
                that.changeDay(-1);
                that.removeMarkerCurrent();
            });

            // D1,D2...点击动作
            dayNaviUl.find("li.day").on("click", function() {
                that.changeDay($(this).index());   // index()可以获得数组的维度
            });

            // POI详情栏的鼠标事件（enter，leave，click）
            dayDetail.find(".spot_detail").on("mouseenter", function() {
                that.poiEnter($(this))
            }).on("mouseleave", function() {
                that.poiLeave($(this))
            }).on("click", function() {
                var id = $(this).attr("data-id");
                $("#" + id).trigger("click.open-info");  // 激活，显示infoWindow
            })
        };

        // dayData是一天的景点，dayNum是天数
        that.addDayPoi = function(dayData, dayNum) {
            spotId[dayNum] = [];
            // 添加D1,D2,D3...子元素

            dayNaviUl.append('<li class="day" data-num=' + (dayNum + 1) + '>D' + (dayNum + 1) + "</li>");
            // 添加详情内容，这里只设定框架，并未填充spot
            // <li data-num="1" class="day_item"></li>
            var m = '<li data-num=' + (dayNum + 1) + ' class="day_item"></li>';
            // var m = '<dl class="day_item"><dt>\u7b2c' + (dayNum + 1) + "\u5929</dt></dl>";
            // 判断是否需要加divider
            // 0 < inputLen && dayNum < inputLen - 1 && (m += '<div class="divider"></div>');
            dayDetail.append(m);

            var dayTitle = '<div class="day_detail_title"><span class="day_num">第' + (dayNum + 1) + '天</span><span class="day_abstract">(需要被替代)</span></div>';
            $('.day_item:last').append(dayTitle);

            var dayListUl = '<ul data-num=' + (dayNum + 1) + ' class="day_detail"></ul>'
            $('.day_item:last').append(dayListUl);

            for (var len = dayData.length, j = 0; j < len; j++) {
                spotCount++;
                var spot = dayData[j];
                spotId[dayNum].push(spot.id);    // 填充景点天数，只保存其中的id
                that.addPoi(spot, j, spotCount);    // 添加详细的spot信息
            }
        };

        // 在日期详情中加入新的点，并生成地图的html
        that.addPoi = function(spot, indexInOneDay, indexInAllSpots) {

            var name = spot.name,
                type = spot.type,
                id = spot.id,
                //num = spot.num, // 点在整个行程的次序号
                detailHtmlElements = [],
                markerHtmlElements = [];

            // 向日程详情加入spot
            detailHtmlElements.push('<li data-indexinall=' + indexInAllSpots + ' data-indexinday=' + indexInOneDay + ' data-type=' + type + ' class="spot_detail" draggable="true">');
            detailHtmlElements.push('<i class="icon_sight"></i>');
            detailHtmlElements.push('<i class="marker_number">' + indexInAllSpots + '</i>');
            detailHtmlElements.push('<i data-id=' +id+ ' class="spot_name">' + name + '</i>');
            detailHtmlElements.push('<i href="javascript:;" class="delete"></i>');
            detailHtmlElements.push('</li>');
            // :last 总是添加到最后一个
            dayDetail.find(".day_detail:last").append(detailHtmlElements.join(""));

            // 组合html，并添加到地图
            markerHtmlElements.push('<a class="map_marker" id="' + id + '" data-type="' + type + '" href="javascript:;" title="' + name + '">');
            markerHtmlElements.push("\t<i>" + indexInAllSpots + "</i>");
            markerHtmlElements.push("\t<em>" + name + "</em>");
            markerHtmlElements.push("</a>");

            spot.markerHtml = markerHtmlElements.join("");
            that.addMarker(spot)
        };

        // 输入是上面的spot，包含name，type，id，num，markerHtml
        // 超级长的回调函数！而且有两个，回调再回调。。。
        that.addMarker = function(spot) {
            map.addMarker(spot, function(dom, latLng) {
                var id = dom.attr("id"),
                    type = dom.attr("data-type"),
                    // ajax请求参数
                    ajaxConfig = {
                        id: spot.id,
                        cityId: spot.cityId,
                        type: spot.type
                    };
                dom.on("click.open-info", function(e) {
                    "4" != type ? map.checkInfo(id) ? map.openInfo(id) : constructInput.getInfoData(ajaxConfig, function(infoHtml) {
                        infoHtml && map.createInfo({
                            id: id,
                            latLng: latLng,
                            infoHtml: infoHtml,
                            gOffset: [-48, 68]
                        }, function(h) {    //创建好info后添加事件
                            h.find(".btn_close").click(function(e) {
                                map.hideInfoWindow(id);
                                that.removeMarkerCurrent();
                                e.stopPropagation();
                            });
                            h.click(function(e) {
                                e.stopPropagation()
                            });
                            // 添加动作
                            h.find(".b_blue_s").click(function(e) {
                                // 填入参数
                                // to do:获取参数！
                                that.addToPlan();
                                e.stopPropagation();
                            });
                        })
                    }) : map.hideInfoWindows();

                    that.addMarkerCurrnt(dom, null);
                    e.stopPropagation();
                });

                dom.on("mouseenter", function() {
                    that.markerEnter(dom)
                }).on("mouseleave", function() {
                    that.markerLeave(dom)
                })
            })
        };

        // 点击“加入行程”的操作
        that.addToPlan = function(spot) {
            var spot = {
                name: "XXOOXXOO",
                type: '3',
                id: '12_34567_89',
                num: 0,
            };
            var name = spot.name,
                type = spot.type,
                id = spot.id,
                num = spot.num, // 点在整个行程的次序号
                detailHtmlElements = [],
                currentDay = $(".day_tab_box").find('.current').text();

            if("全程" === currentDay) {
                alert("请在左侧日期列表中选中一天");
                return ;
            }else{
                // 选择当前天的dom
                var curDetailDom = $('.J_day_detail_list').find('li.day_item.current'),
                    curDay = curDetailDom.attr('data-num');
                    console.log(curDay);
                spotId[curDay - 1].push(id);
                console.log(spotId);
            }

            var lastLi = curDetailDom.children('ul').find('li:last'),
                indexInAllSpots = parseInt(lastLi.attr('data-indexinall')) + 1;
                indexInOneDay = parseInt(lastLi.attr('data-indexinday')) + 1;
            // 向日程详情加入spot
            detailHtmlElements.push('<li data-indexinall=' + indexInAllSpots + ' data-indexinday=' + indexInOneDay + ' data-type=' + type + ' class="spot_detail" draggable="true">');
            detailHtmlElements.push('<i class="icon_sight"></i>');
            detailHtmlElements.push('<i class="marker_number">' + indexInAllSpots + '</i>');
            detailHtmlElements.push('<i data-id=' +id+ ' class="spot_name">' + name + '</i>');
            detailHtmlElements.push('<i href="javascript:;" class="delete"></i>');
            detailHtmlElements.push('</li>');

            curDetailDom.children('ul').append(detailHtmlElements.join(""));

            curDetailDom.children('li').last().on("mouseenter", function() {
                that.poiEnter($(this))
            }).on("mouseleave", function() {
                that.poiLeave($(this))
            }).on("click", function() {
                that.removeMarkerCurrent();
                $(this).addClass('current');
                console.log('新加入的点点击生效');
                var id = $(this).attr("data-id");
                $("#" + id).trigger("click.open-info");  // 激活，显示infoWindow
            });

            // 监听删除操作
            that.listenDeletePoi();
            console.log('添加成功');
        };

        // 点击一天的动作  很重要的一个函数
        that.changeDay = function(num) {
            that.resortIndex();
            // 先判断有无checked字段，有的话添加false，并激活change开关
            // 因为新的一天不需要选中任何checkbox
            // $('.map_chk input[type="checkbox"]').each(function() {
            //     $(this).attr("checked") &&
            //         ($(this).attr("checked", false), $(this).trigger("change"))
            // });
            - 1 === num ?
            (
                // “全程”的操作
                allDay.addClass("current"),
                dayNaviUl.find("li.day").removeClass("current"),
                dayDetail.find(".day_item").slideDown(400),
                dayDetail.find(".day_item").removeClass('current'),
                //dayDetail.find(".divider").show(),
                console.log('123'),
                that.showDayMarkers(-1)
            ) :
            (
                // eq(num)筛选，同胞类.day删除current
                dayNaviUl.find("li.day").eq(num).addClass("current").siblings(".day").removeClass("current"),
                allDay.removeClass("current"),
                dayDetail.find(".day_item").eq(num).addClass('current').slideDown(400).siblings(".day_item").removeClass('current').slideUp(400),
                console.log(num),

                //dayDetail.find(".divider").hide();
                that.hideDayMarkers(currDayNum - 1),//影藏上一次的点
                that.showDayMarkers(num)
            );

            that.drawRoute(num);
            map.hideInfoWindows();
            that.removeMarkerCurrent();
            that.setView(num)
        };

        /* 以下部分全部是上面函数的调用函数 */
        // 设置一天的连线地图
        that.setView = function(num) {
            currDayNum = num + 1;
            if (mapConfig[currDayNum]) {
                map.setCenter(mapConfig[currDayNum].center),
                map.setZoom(mapConfig[currDayNum].zoom);
            }
            else {
                var h = null;
                - 1 === num ? 1 === inputBuff.length && 1 === inputBuff[0].length && (h = inputBuff[0][0]) : 1 === inputBuff[num].length && (h = inputBuff[num][0]);

                h ? (h.lat && h.lng && map.setCenterByLatLng(h.lat, h.lng), "4" == h.type ? map.setZoom(12) : map.setZoom(15)) : map.setFitView()
            }
        };

        // 画连线
        that.drawRoute = function(num) {
            map.clearRoute();
            var h = [];
            if (-1 === num) {
                num = inputBuff.length;
                for (var p = 0; p < num; p++)
                    h = h.concat(inputBuff[p]);
            } else
                h = inputBuff[num];
            1 !== h.length && map.drawDriveRoute(h, function() {})
        };

        // 隐藏一天的点
        that.hideDayMarkers = function(num) {
            if (-1 === num) {
                num = spotId.length;
                for (var h = 0; h < num; h++)
                    map.hideMarkers(spotId[h]);
            } else
                map.hideMarkers(spotId[num])
        };

        // 显示一天的点
        that.showDayMarkers = function(num) {
            if (-1 === num) {
                num = spotId.length;
                for (var h = 0; h < num; h++)
                    map.showMarkers(spotId[h])
            } else
                map.showMarkers(spotId[num])
        };

        // 鼠标hover左侧点时，对应地图的效果
        that.poiEnter = function(f) {
            var id = f.children('.spot_name').attr("data-id"),
                type = f.attr('data-type');
            f.children('i').eq(0).addClass(type + '_hover');
            f.children("i.delete").addClass("delete_icon");
            // 查找地图上对应的点
            f = $("#" + id);
            f.addClass("active");
            f.parent().css({
                "z-index": 2
            });
            new MarkerAnimate(f)
        };

        //
        that.poiLeave = function(f) {
            var id = f.children('.spot_name').attr("data-id"),
                type = f.attr('data-type');
            f.children('i').eq(0).removeClass(type + '_hover');
            f.children("i.delete").removeClass("delete_icon");
            f = $("#" + id);
            f.removeClass("active");
            f.parent().css({
                "z-index": 1
            })
        };
        // 鼠标移到右侧地图上得一个点时，左侧的对应点的响应
        that.markerEnter = function(f) {
            if (!f.hasClass("current")) {
                var h = f.attr("id");
                f.parent().css({
                    "z-index": 2
                });
                f.addClass("active");
                //<i data-id="1234567890" class="spot_name">卡塔海滩-1</i>
                dayDetail.find("i[data-id='" + h + "']").parent().addClass("active");
            }
        };
        that.markerLeave = function(f) {
            if (!f.hasClass("current")) {
                var h = f.attr("id");
                f.removeClass("active");
                f.parent().css({
                    "z-index": 1
                });
                dayDetail.find("i[data-id='" + h + "']").parent().removeClass("active")
            }
        };
        // active和current的区别，h和l都是dom
        that.addMarkerCurrnt = function(h, l) {
            var m = h ? h.attr("id") : l.attr("data-id");
            h = h ? h : $("#" + m);
            l = l ? l : dayDetail.find("i[data-id='" + m + "']").parent();
            that.removeMarkerCurrent();
            h.removeClass("active");
            h.addClass("current");
            l.removeClass("active");
            l.addClass("current")
        };

        // 删除左侧日期栏中选中的POI和地图上当前选中的点
        that.removeMarkerCurrent = function() {
            mapDiv.find(".map_marker.current").removeClass("current");
            // 清除详情栏点中的点
             //dayDetail.find("li.day").removeClass("current")
            dayDetail.find(".spot_detail").removeClass("current")
        };

        // 监听删除;
        that.listenDeletePoi = function() {
            // 取消之前的监听，否则会响应多次
            $('.delete').unbind("click");
            $('.delete').on("click", function(e) {
                var parentDom = $(this).parent();
                $(parentDom).remove();
                e.stopPropagation();
                console.log('删除');
            });
        };

        // 重排整体spot的index
        that.resortIndex = function() {
            var index = 1;
            $('.spot_detail').each(function(){
                $(this).attr('data-indexinall', index);
                $(this).children('.marker_number').text(index);
                index++;
            });
        };

        // h可取“hotel” or "restuarant", m 是 data
        that.addNearbyPoi = function(h, poiData) {
            var p = poiData.length;
            if (0 < p) {
                for (var q = 0, s = "marker_" + h; q < p; q++) {
                    var u = poiData[q],
                        x = u.id,
                        y = [];
                    y.push('<a class="map_marker_type ' + s + '" id="' + x + '" data-type="' + u.type + '" href="javascript:;" title="' + u.name + '">');
                    y.push("\t<i></i>");
                    y.push("\t<em>" + u.name + "</em>");
                    y.push("</a>");
                    u.markerHtml = y.join("");
                    "hotel" == h ? hotelBuff.push(x) : restaurantBuff.push(x);
                    that.addNearbyMarker(u)
                }
                map.setFitView()
            }
        };

        that.removeNearbyPoi = function(h) {
            if ((h = "hotel" == h ? hotelBuff : restaurantBuff) && 0 < h.length) {
                for (var m = h.length, p = 0; p < m; p++) {
                    var s = h[p];
                    map.hideInfoWindow(s);
                    map.removeMarker(s)
                }
                h = [];
                h.length = 0;
                that.setView(currDayNum - 1)
            }
        };

        that.addNearbyMarker = function(m) {
            map.addMarker(m, function(p, q) {
                var s = p.attr("id"),
                    u = {
                        id: m.id,
                        cityId: m.cityId,
                        type: m.type
                    };
                p.on("click", function(m) {
                    map.checkInfo(s) ? map.openInfo(s) : constructInput.getInfoData(u, function(h) {
                        h && map.createInfo({   // h是html内容
                            id: s,
                            latLng: q,
                            infoHtml: h,
                            gOffset: [-52, 68]
                        }, function(h) {    //这个h是什么？
                            h.find(".btn_close").click(function(h) {
                                map.hideInfoWindow(s);
                                that.removeNearbyCurrent();
                                h.stopPropagation()
                            });
                            h.click(function(f) {
                                f.stopPropagation()
                            })
                        })
                    });
                    that.addNearbyCurrent(p, null);
                    m.stopPropagation()
                });
                p.on("mouseenter", function() {
                    p.parent().css({
                        "z-index": 2
                    })
                }).on("mouseleave", function() {
                    p.parent().css({
                        "z-index": 1
                    })
                })
            })
        };
        that.addNearbyCurrent = function(h) {
            that.removeNearbyCurrent();
            h.addClass("current")
        };
        that.removeNearbyCurrent = function() {
            mapDiv.find(".map_marker_type").removeClass("current")
        }
    },
    // 承接上次的var定义
    dayMapControl = null,
    tabMapControl = null;

// 程序入口函数
function initMaper() {
    // 地图构造函数
    dayMapControl = new DayMapControl({
        getInfoData: function(spotInfo, callback) {
            INTERFACE.getInfoData(spotInfo, function(ajaxData) {
                callback(createInfoHtml(ajaxData))
            })
        }
    });

    // 送入spotData数据
    dayMapControl.init(INTERFACE.spotData, function() {
        // INTERFACE.showHotel ? $(".map_chk .chkhotel").attr("checked", !0) : $(".map_chk .chkhotel").attr("checked", !1);
        // INTERFACE.showRestaurant ? $(".map_chk .chkrestaurant").attr("checked", !0) : $(".map_chk .chkrestaurant").attr("checked", !1);

        // $('.map_chk input[type="checkbox"]').trigger("change");
    });

    tabMapControl = new tabMapControl();
    tabMapControl.init(dayMapControl.getMaper());

    console.log('初始化结束');
    // 监听删除;
    dayMapControl.listenDeletePoi();

    // 创建拉动功能
    $('.day_detail').sortable({
        //items: ':not(.disabled)',
        connectWith: '.day_detail',
        placeholder: "ui-state-highlight",
    });

}
/*------DayMapControl END-----*/


// google地图调用
$(function() {
    var h = "http://ditu.google.cn/maps/api/js?v=3&sensor=false&key=AIzaSyCuXDkC1uoHaSctnrsGSGfpj9QVCUrfw1w",
        f = document.createElement("script");
    f.type = "text/javascript";
    f.src = h + "&callback=initMaper";
    document.body.appendChild(f)
});


// 设置地图高度
$(function() {
    function h() {
        var f = $(window).height() - 108;
        $(".edit_region").css({
            height: f
        })
    }
    var f = null;
    $(window).resize(function() {
        clearTimeout(f);
        f = setTimeout(h, 200)
    });

    h();

    var l = 0;
    //控制上下用的tab
    // $(".day_tab").on("click", ".control", function() {
    //     var f = $(".day_tab .tab_ul .day").length;
    //     $(this).hasClass("top") && 20 + l < f ? (l++, f = -(27 * l), $(".tab_ul").animate({
    //         top: f
    //     }, 150)) : $(this).hasClass("down") && 0 < l && (l--, f = -(27 * l), $(".tab_ul").animate({
    //         top: f
    //     }, 150))
    // });
    // $('.map_chk input[type="checkbox"]').on("change", function() {
    //     if ($(this).hasClass("chkhotel"))
    //         if ($(this).attr("checked")) {
    //             var f = dayMapControl.getCurDayNum();
    //             INTERFACE.showHotelRequestFn(f, function(f) {
    //                 dayMapControl.addNearbyPoi("hotel", f)
    //             })
    //         } else dayMapControl.removeNearbyPoi("hotel");
    //     else $(this).attr("checked") ? (f = dayMapControl.getCurDayNum(), INTERFACE.showRestaurantRequestFn(f, function(f) {
    //         dayMapControl.addNearbyPoi("restaurant", f)
    //     })) : dayMapControl.removeNearbyPoi("restaurant")
    // })
});


/*---- 五个tab的切换 BEGIN ----*/
var tabMapControl = function() {
    var that = this,
        activedTabName = '',
        activedTabDom = null,
        activedClassName = '',
        spotArray = {}, // itemId : htmlContent 缓存点击过的点
        map = null,
        tabUlDom = $('.select_tab'),
        map_box = $('.map_box');

    that.init = function(mapObj) {
        map = mapObj;
        that.tabSwitch();
        that.search();
    };

    // tab切换功能
    that.tabSwitch = function() {
        $(tabUlDom).children('li').on('mouseenter', function() {
            $(this).addClass('hover');
        }).on('mouseleave', function() {
            $(this).removeClass('hover');
        }).on('click', function() {
            var classString = $(this).attr('class');

            activedClassName = classString.split(' ')[0],
            activedTabName = $(this).text(),
            activedTabDom = $(this);
            // 多次点击同一个tab的动作：缩回<-->展开
            $(this).hasClass('active') ? that.actived() : that.notActived();
            $(this).siblings().removeClass('active');
        });
    };

    that.actived = function() {
        $(activedTabDom).removeClass('active');
        $('.content_' + activedClassName).slideUp(400);
        $(map_box).css({
            'margin': '0px 0px 0px 320px',
            'width': '74%',
        });
    };

    that.notActived = function() {
        $(activedTabDom).addClass('active');
        that.getListAjax();
        map_box.css({
            'margin': '0px 0px 0px 600px',
            'width': '51%',
        });
    };

    // searchAjax 可以复用这个函数，加入keyword
    that.getListAjax = function() {
        // TODO get data
        console.log("get " + activedClassName + ' data');
        var postData = {
            'type': activedClassName,
            'option': {
                'locId': INTERFACE.basicInfo.locId,
                'pageSize': 4,
                'page': 1,
            },
        };
        $.ajax({
            url: "/edit/ajaxList",
            type: "post",
            dataType : "json",
            //async: true,
            data: postData,
            success: function (data) {
                // to add html dom and markers in the map
                that.addElement();
                // 功能实现后要加上下面这句话
                //$('.content_' + activedClassName).slideDown(400).siblings().slideUp(400);
            }
        });
        // 功能实现后要删除语句
        $('.content_' + activedClassName).slideDown(400).siblings().slideUp(400);
    };

    // 搜索功能
    that.search = function() {
        $('input').on('focus', function() {
            $(this).css({
                'background': 'none',
            });
            that.listenEnterKey(this);
        }).on('blur', function() {
            $(this).val() ? '' :
            $(this).css({
                'background': 'url("/images/plans/edit/icon-magnifier.png") no-repeat scroll 4px 6px',
            });
        })
    };

    that.listenEnterKey = function(that) {
        $(document).unbind('keydown'); //取消上一次的监听
        $(document).keydown(function(event){
            var e = event || window.event;
            var k = e.keyCode || e.which;
            if (13 === k) {
                var searchText = $(that).val();
                that.searchAjax(searchText, that.addElement);
            };
        });
    };

    that.searchAjax = function(searchText, callback) {
        var postData = {
            "searchText": searchText,
            "type": activedClassName,
            "pageSize": 4,
            "pageNum": 0,
        };
        $.ajax({
            url: "/ajax/request/url",
            type: "post",
            async: true,
            data: postData,
            success: function (data) {
                // to add html dom and markers in the map
                callback(data);
            }
        });
    };

    that.addElement = function(data) {
        // to add html dom to the list
        // then add markers to map, and
        //that.addMarker(spotInfo);
        //that.addInfoWindow(spotInfo);
    };

    that.addMarker = function() {
        console.log('addMarker');
    };

    that.addInfoWindow = function() {
        console.log('addInfoWindow');
    };
};
/* ---- 五个tab的切换 END ---- */


