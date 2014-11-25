'use strict';
/*----marker animate BEGIN----*/
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
            s < u && f(h);
        });
    }
    f();
}
/*----marker animate END----*/


/*------DayMapControl BEGIN-----*/
var DayMapControl = function(constructInput) {
        var that = this, // [f]
            map = null, // 地图   [l]
            inputBuff = null, // 输入参数h的缓存     [m]
            spotId = [], //数组，每个元素依然是数组，代表一天的景点数，数据是spotID   [u]
            mapDiv = $("#map_inner"), // 地图dom元素     [s]
            spotCount = 0,
            dayNavi = $(".map_side .day_tab"), // 日期栏    [z]
            allDay = $(".J_all_day"),
            dayNaviUl = $("#day_list"), // 天数1，2，3，4，5......  [x]
            dayDetail = $(".J_day_detail_list"), // 景点列表     [y]
            spotType = { // [p]
                1: "hotel",
                2: "restaurant",
                3: "sight",
                4: "default",
                5: "shopping",
                6: "amusement"
            },
            inputLen = 0, // 缓存的长度，即输入的数据，物理意义是行程天数     [D]
            currDayNum = 0, // 被激活的日期，1，2，3，4.。。。   [q]
            mapConfig = [], //每天一天的地图配置, index为天元素是对象，包含center和zoom字段   [J]
            hotelBuff = [], // hotel 容器，元素是spotId     [U]
            restaurantBuff = []; //  restaurantBuff容器，元素是spotId    []
        // 获取地图对象
        that.getMaper = function() {
            if (map) return map;
        };
        // 获得当前选中日期
        that.getCurDayNum = function() {
            return currDayNum - 1; // 减去1，从0开始
        };
        // 初始化：新建地图，初始化地图，添加所有POI，执行回调函数
        that.init = function(poiData, callback) {
            poiData && (0 < poiData.length && 0 < poiData[0].length &&
                poiData[0][0].lng && poiData[0][0].lat) && (inputBuff =
                poiData, map = new GMaper({
                    clickListener: function() {
                        that.removeMarkerCurrent();
                        that.removeNearbyCurrent();
                    },
                    idleListener: function(center, zoom) {
                        mapConfig[currDayNum] || (mapConfig[
                            currDayNum] = {});
                        mapConfig[currDayNum].center = center;
                        mapConfig[currDayNum].zoom = zoom;
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
                that.addAllPoi(), that.setView(-1), $.isFunction(
                    callback) && callback());
        };
        // 添加所有景点，并且设置“全程”、D1,D2...、POI详情栏的鼠标事件（enter，leave，click）
        that.addAllPoi = function() {
            var length = inputBuff.length,
                i = 0;
            for (inputLen = length; i < length; i++) that.addDayPoi(
                inputBuff[i], i);
            //添加一天的行程
            // 当length大于20时，启动“向上点击”按钮
            // 20 < length && $(".day_tab .control").show();
            // 点击"全程"，天数设置为 -1，从0开始
            allDay.on("click", function() {
                that.changeDay(-1);
                that.removeMarkerCurrent();
            });
            // D1,D2...点击动作
            dayNaviUl.find("li.day")
                .on("click", function() {
                    that.changeDay($(this)
                        .index()); // index()可以获得数组的维度
                });
            // POI详情栏的鼠标事件（enter，leave，click）
            dayDetail.find(".spot_detail")
                .on("mouseenter", function() {
                    that.poiEnter($(this));
                })
                .on("mouseleave", function() {
                    that.poiLeave($(this));
                })
                .on("click", function() {
                    var id = $(this)
                        .children('.spot_name')
                        .attr("data-id");
                    $("#" + id)
                        .trigger("click.open-info"); // 激活，显示infoWindow
                });
        };
        // dayData是一天的景点，dayNum是天数
        that.addDayPoi = function(dayData, dayNum) {
            spotId[dayNum] = [];
            // 添加D1,D2,D3...子元素
            dayNaviUl.append('<li class="day" data-num=' + (dayNum + 1) +
                '>D' + (dayNum + 1) + "</li>");
            var m = '<li data-num=' + (dayNum + 1) + ' class="day_item"></li>';
            dayDetail.append(m);

            var dayTitle = '<div class="day_detail_title"><span class="day_num">第' + (dayNum + 1) + '天</span><span class="day_abstract">(需要被替代)</span></div>';
            $('.day_item:last').append(dayTitle);

            var dayListUl = '<ul data-num=' + (dayNum + 1) + ' class="day_detail"></ul>';
            $('.day_item:last').append(dayListUl);

            for (var len = dayData.length, j = 0; j < len; j++) {
                spotCount++;
                var spot = dayData[j];
                spotId[dayNum].push(spot.id); // 填充景点天数，只保存其中的id
                that.addPoi(spot, j, spotCount); // 添加详细的spot信息
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
            detailHtmlElements.push('<i data-id=' + id + ' title=' + name + ' class="spot_name"><nobr>' + name + '</nobr></i>');
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
            that.addMarker(spot);
        };
        // 输入是上面的spot，包含name，type，id，num，markerHtml
        // 超级长的回调函数！而且有两个，回调再回调。。。
        that.addMarker = function(spot) {
            map.addMarker(spot, function(dom, latLng) {
                console.log('addMarker\'s callback running');
                var id = dom.attr("id"),
                    type = dom.attr("data-type"),
                    // ajax请求参数
                    ajaxConfig = {
                        id: spot.id,
                        //cityId: spot.cityId,
                        type: spot.type
                    };
                    console.log(ajaxConfig);
                    console.log('show dom');
                    console.log(dom);
                dom.on("click.open-info", function(e) {
                    map.setCenter(latLng);
                    map.setZoom(12);
                    console.log('click the marker');
                    console.log('type is ' + type);
                    "4" != type ?
                    map.checkInfo(id) ? map.openInfo(id) : constructInput.getInfoData(ajaxConfig, function(infoHtml) {
                            infoHtml && map.createInfo({
                                id: id,
                                latLng: latLng,
                                infoHtml: infoHtml.html,
                                gOffset: [-48, 68]
                            }, function(h) { //创建好info后添加事件
                                h.find(".btn_close").click(function(e) {
                                    map.hideInfoWindow(id);
                                    that.removeMarkerCurrent();
                                    e.stopPropagation();
                                });
                                h.click(function(e) {
                                    e.stopPropagation();
                                });
                                // 添加动作
                                h.find(".btn_add_to_plan").click(function(e) {
                                    // 填入参数
                                    // to do:获取参数！
                                    that.addToPlan();
                                    e.stopPropagation();
                                });
                            });
                        }) : map.hideInfoWindows();
                    that.addMarkerCurrnt(dom, null);
                    e.stopPropagation();
                });
                dom.on("mouseenter", function() {
                        that.markerEnter(dom);
                    })
                    .on("mouseleave", function() {
                        that.markerLeave(dom);
                    });
            });
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
            if ("全程" === currentDay) {
                alert("请在左侧日期列表中选中一天");
                return;
            } else {
                // 选择当前天的dom
                var curDetailDom = $('.J_day_detail_list').find('li.day_item.current'),
                    curDay = curDetailDom.attr('data-num');
                console.log(curDay);
                spotId[curDay - 1].push(id);
                console.log(spotId);
            }
            var lastLi = curDetailDom.children('ul').find('li:last'),
                indexInAllSpots = parseInt(lastLi.attr('data-indexinall')) + 1,
                indexInOneDay = parseInt(lastLi.attr('data-indexinday')) + 1;
            // 向日程详情加入spot
            detailHtmlElements.push('<li data-indexinall=' + indexInAllSpots + ' data-indexinday=' + indexInOneDay + ' data-type=' + type + ' class="spot_detail" draggable="true">');
            detailHtmlElements.push('<i class="icon_sight"></i>');
            detailHtmlElements.push('<i class="marker_number">' + indexInAllSpots + '</i>');
            detailHtmlElements.push('<i data-id=' + id + ' class="spot_name">' + name + '</i>');
            detailHtmlElements.push('<i href="javascript:;" class="delete"></i>');
            detailHtmlElements.push('</li>');
            curDetailDom.children('ul').append(detailHtmlElements.join(""));
            console.log(curDetailDom.children('li'));
            curDetailDom.children('li').last()
                .on("mouseenter", function() {
                    console.log('mouseenter');
                    that.poiEnter($(this));
                })
                .on("mouseleave", function() {
                    that.poiLeave($(this));
                })
                // .on("hover", function() {
                //     $(this).children('i').eq(0).addClass(type + '_hover');
                //     $(this).children("i.delete").addClass("delete_icon")
                // })
                .on("click", function() {
                    console.log('新加入的点点击生效');
                    that.removeMarkerCurrent();
                    $(this).addClass('current');
                    var id = $(this).attr("data-id");
                    $("#" + id).trigger("click.open-info"); // 激活，显示infoWindow
                });
            // 监听删除操作
            that.listenDeletePoi();
            console.log('添加成功');
        };
        // 点击一天的动作  很重要的一个函数
        that.changeDay = function(num) {
            that.resortIndex();
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
            ) : (
                dayNaviUl.find("li.day").eq(num).addClass("current").siblings(".day")
                .removeClass("current"),
                allDay.removeClass("current"),
                dayDetail.find(".day_item").eq(num).addClass('current').slideDown(400)
                .siblings(".day_item").removeClass('current').slideUp(400),
                console.log(num),
                that.hideDayMarkers(currDayNum - 1), //影藏上一次的点
                that.showDayMarkers(num)
            );
            that.drawRoute(num);
            map.hideInfoWindows();
            that.removeMarkerCurrent();
            that.setView(num);
        };
        /* 以下部分全部是上面函数的调用函数 */
        // 设置一天的连线地图
        that.setView = function(num) {
            currDayNum = num + 1;
            if (mapConfig[currDayNum]) {
                map.setCenter(mapConfig[currDayNum].center),
                map.setZoom(mapConfig[currDayNum].zoom);
            } else {
                var h = null;
                - 1 == num ?
                1 == inputBuff.length && 1 == inputBuff[0].length && (h = inputBuff[0][0])
                : 1 == inputBuff[num].length && (h = inputBuff[num][0]);

                h ? (h.lat && h.lng && map.setCenterByLatLng(h.lat, h.lng), "4" == h.type
                        ? map.setZoom(12) : map.setZoom(15))
                : map.setFitView();
                map.setZoom(map.getZoom() - 1);
            }
        };
        // 画连线
        that.drawRoute = function(num) {
            map.clearRoute();
            var currDayData = [];
            if (-1 === num) {
                var length = inputBuff.length;
                for (var p = 0; p < length; p++)
                    currDayData = currDayData.concat(inputBuff[p]);
            } else {
                currDayData = inputBuff[num];
            }
            1 !== currDayData.length && map.drawDriveRoute(currDayData, function() {});
        };
        // 隐藏一天的点
        that.hideDayMarkers = function(num) {
            if (-1 === num) {
                num = spotId.length;
                for (var h = 0; h < num; h++) map.hideMarkers(spotId[h]);
            } else map.hideMarkers(spotId[num]);
        };
        // 显示一天的点
        that.showDayMarkers = function(num) {
            if (-1 === num) {
                num = spotId.length;
                for (var h = 0; h < num; h++) map.showMarkers(spotId[h]);
            } else map.showMarkers(spotId[num]);
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
            new MarkerAnimate(f);
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
                });
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
                dayDetail.find("i[data-id='" + h + "']").parent().removeClass("active");
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
            l.addClass("current");
        };
        // 删除左侧日期栏中选中的POI和地图上当前选中的点
        that.removeMarkerCurrent = function() {
            mapDiv.find(".map_marker.current").removeClass("current");
            // 清除详情栏点中的点
            //dayDetail.find("li.day").removeClass("current")
            dayDetail.find(".spot_detail").removeClass("current");
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
                that.resortIndex();
            });
        };
        // 重排整体spot的index
        that.resortIndex = function() {
            var index = 1;
            $('.spot_detail').each(function() {
                $(this).attr('data-indexinall', index);
                $(this).children('.marker_number').text(index);
                index++;
            });
        };
        that.addNearbyCurrent = function(h) {
            that.removeNearbyCurrent();
            h.addClass("current");
        };
        that.removeNearbyCurrent = function() {
            mapDiv.find(".map_marker_type").removeClass("current");
        };
    };
/*------DayMapControl END-----*/

var dayMapControl = null,
    tabMapControl = null;


/*----function for map initial BEGIN----*/
function initMaper() {
    dayMapControl = new DayMapControl({
        getInfoData: function(spotInfo, callback) {
            INTERFACE.getInfoData(spotInfo, function(ajaxData) {
            console.log('getInfoData\'s callback running, console out the ajaxData');
                callback(ajaxData);
            });
        }
    });
    dayMapControl.init(INTERFACE.spotData, function() {});

    tabMapControl = new tabMapControl();
    tabMapControl.init(dayMapControl.getMaper());

    dayMapControl.listenDeletePoi();
    $('.day_detail').sortable({
        //items: ':not(.disabled)',
        connectWith: '.day_detail',
        placeholder: "ui-state-highlight",
    });
    console.log('初始化结束');
}
/*----function for map initial END----*/


/*----function for creating google map BEGIN----*/
var const_topNaviBarHeight = 60,
    const_topTitleHeight = 45,
    const_mapMarginLeft = 320;
$(function() {
    /* width, height adjust BEGIN */
    var docHeight = $(window).height(),
        docWidth = $(window).width(),
        height = docHeight - const_topNaviBarHeight - const_topTitleHeight,
        width = docWidth - const_mapMarginLeft;
    $('.edit_region').css({
        height: height
    });
    $('.map_box').css({
        width: width
    });
    /* width, height adjust END */

    var h = "http://ditu.google.cn/maps/api/js?v=3&sensor=false&key=AIzaSyCuXDkC1uoHaSctnrsGSGfpj9QVCUrfw1w",
        f = document.createElement("script");
    f.type = "text/javascript";
    f.src = h + "&callback=initMaper";
    document.body.appendChild(f);
});
/*----function for creating google map END----*/


/*----set the map height and width while resize browser widnow BEGIN----*/
$(function() {
    function h() {
        var height = $(window).height() - const_topNaviBarHeight - const_topTitleHeight,
            width = $(window).width() - const_mapMarginLeft;

        $(".map_box").css({
            height: height,
            width: width
        });
    }

    var tempTimer = null;
    $(window).resize(function() {
        clearTimeout(tempTimer);
        tempTimer = setTimeout(h, 200);
    });
    h();
});
/*----set the map height and width while resize browser widnow END----*/


/*---- 五个tab的切换 BEGIN ----*/
var tabMapControl = function() {
    var that = this,
        activedTabName = '',
        activedTabDom = null,
        activedClassName = '',
        spotArray = {}, // itemId : htmlContent 缓存点击过的点
        map = null,
        tabUlDom = $('.select_tab'),
        map_box = $('.map_box'),
        tabListContent_viewspot = $('.list_spotview');

    that.init = function(mapObj) {
        map = mapObj;
        that.tabSwitch();
        that.search();
    };
    // tab切换功能
    that.tabSwitch = function() {
        $(tabUlDom).children('li')
        .on('mouseenter', function() {
            $(this).addClass('hover');
        })
        .on('mouseleave', function() {
            $(this).removeClass('hover');
        })
        .on('click', function() {
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
        that.clearSpots();
        var width = $(window).width() - const_mapMarginLeft + 'px';
        $(map_box).css({
            'margin': '0px',
            'width': width,
        });
    };
    that.clearSpots = function() {
        var idArray = Object.keys(spotArray);
        map.hideMarkers(idArray);//只是影藏了
    };
    that.notActived = function() {
        $(activedTabDom).addClass('active');
        that.getListAjax();
    };
    that.mapBoxSilderToLeft = function() {
        var width = $(window).width() - 280 - const_mapMarginLeft + 'px';
        map_box.css({
            'margin': '0px 0px 0px 280px',
            'width': width,
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
                'pageSize': 10,
                'page': 1,
            },
        };
        $.ajax({
            url: "/edit/tabContent",
            type: "post",
            dataType: "json",
            data: postData,
            success: function(respondData) {
                console.log(respondData);
                that.mapBoxSilderToLeft();
                that.addElement(respondData.html);
                // 功能实现后要加上下面这句话
                $('.content_' + activedClassName).slideDown(400).siblings().slideUp(400);
                that.addOneGroupPoiToMap(respondData.detailData);
                that.savePois(respondData.detailData);
            }
        });
    };
    // 搜索功能
    that.search = function() {
        $('input')
        .on('focus', function() {
            $(this).css({
                'background': 'none',
            });
            that.listenEnterKey(this);
        })
        .on('blur', function() {
            $(this).val() ? '' :
            $(this).css({
                'background': 'url("/images/plans/edit/icon-magnifier.png") no-repeat scroll 4px 6px',
            });
        });
    };
    that.listenEnterKey = function(that) {
        $(document).unbind('keydown'); //取消上一次的监听
        $(document).keydown(function(event) {
            var e = event || window.event;
            var k = e.keyCode || e.which;
            if (13 === k) {
                var searchText = $(that).val();
                that.searchAjax(searchText, that.addElement);
            }
        });
    };
    that.searchAjax = function(searchText, callback) {
        var postData = {
            "searchText": searchText,
            "type": activedClassName,
            "pageSize": 8,
            "pageNum": 0,
        };
        $.ajax({
            url: "/ajax/request/url",
            type: "post",
            async: true,
            data: postData,
            success: function(result) {
                // to add html dom and markers in the map
                callback(result);
            }
        });
    };
    that.addElement = function(data) {
        tabListContent_viewspot.empty(); //删除子元素
        tabListContent_viewspot.append(data);
        tabListContent_viewspot.children()
            .on('click', function() {
                var id = $(this).children('.spotview_info').attr("data-id");
                $("#" + id).trigger("click.open-info"); // 激活，显示infoWindow
            })
            .on('mouseenter', function() {
                var id = $(this).children('.spotview_info').attr('data-id'),
                    marker = $("#" + id),
                    lat = spotArray[id].lat,
                    lng = spotArray[id].lng;
                map.setCenterByLatLng(lat, lng);
                marker.addClass("active");
                marker.parent().css({
                    "z-index": 2
                });
                map.hideInfoWindows();
                new MarkerAnimate(marker);
            })
            .on('mouseleave', function() {
                var id = $(this).children('.spotview_info').attr('data-id'),
                    marker = $("#" + id);
                marker.removeClass("active");
                marker.parent().css({
                    "z-index": 1
                });
            });
    };
    that.addMarker = function(spot) {
        dayMapControl.addMarker(spot);
    };
    that.addOneGroupPoiToMap = function(Array) {
        for (var key in Array) {
            that.addOnePoi(Array[key]);
        }
    };
    that.addOnePoi = function(spot) {
        var name = spot.name,
            type = spot.type,
            id = spot.id,
            //num = spot.num, // 点在整个行程的次序号
            markerHtmlElements = [];
        markerHtmlElements.push('<a class="map_marker" id="' + id +
            '" data-type="' + type +
            '" href="javascript:;" title="' + name + '">');
        markerHtmlElements.push("\t<i>" + "+_+" + "</i>");
        markerHtmlElements.push("\t<em>" + name + "</em>");
        markerHtmlElements.push("</a>");
        spot.markerHtml = markerHtmlElements.join("");
        that.addMarker(spot);
    };
    that.savePois = function(pois) {
        for(var key in pois){
            if('traffic' !== pois[key].type) {
                spotArray[pois[key].id] = pois[key];
            }
        }
    }
};
/* ---- 五个tab的切换 END ---- */

/* ---- 修改title, 日历, 保存路线 BEGIN----- */
$('.J_calendar').datetimepicker({
    buttonText: "Select date",
    minDate: 0, // 不能选择过去过去的日期
    timepicker: false,
    lang:'ch',
    format:'Y-m-d'
});

function currentTime () {
    var tempTime = new Date(),
        year = tempTime.getFullYear(),
        month = tempTime.getMonth() + 1,
        day = tempTime.getDate();
    return year + "-" + month + "-" + day;
}

$('.J_calendar').val(currentTime());


/* ---- 修改title, 日历, 保存路线 END----- */
