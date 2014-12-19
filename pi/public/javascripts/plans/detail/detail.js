'use strict';

require.config({
    baseUrl: "/javascripts/",
    paths: {
        "sliderBar"     : "plans/detail/sliderBar",
        "googlemapApi"  : "lib/googlemap.api",
        "siderBarBlock" : "plans/detail/siderBarBlock",
        "gmapControl"   : "plans/detail/gmapControl",
        "PopLayer"      : "lib/popLayer"
    },
});

require(['sliderBar', 'googlemapApi', 'gmapControl', 'siderBarBlock', 'PopLayer'],
    function(sliderBar, googlemapApi, gmapControl, siderBarBlock, PopLayer){

    var index = function () {

        var mapControl = new gmapControl.mapControlPanel(null, "mapContainer");
        mapControl.init();

        var infoBlock = new siderBarBlock.leftSiderBar();
        infoBlock.init();
        // 如果不抛到window全局域，就会导致关闭左侧栏时，出现infoBlock is undefined
        window.infoBlock = infoBlock;

        /*
        * 复制行程
        */
        $('#J_copy_plan').on('click', function() {
            var id  = $('.main_title').attr('data-id'),
                url = '/plans/edit/' + id;
            window.open(url);
        })
        /*
         * 取消顶部导航栏的fixed状态
         */
         $('.hd').css({
            "position": "absolute",
            //"margin-bottom": "60px"
         });
         $('.line.line_traffic:last').empty();
        /*
         * 左侧列表和地图的交互：动态效果还没有出来，问题不明
         */
        $(".day_list").on("mouseenter", 'li', function () {
            var id = $(this).attr("data-id"),
                dayIndex = $(this).find('.local').attr('data-day');
            mapControl.showMarker(id, dayIndex);
        });

        /*
         *导航栏和详情列表的互动--获取scroll参数
         */
        var daylistitem     = $('.pl_day_list').children(),
            daylistLen      = daylistitem.length,
            timelistitem    = $('.sideCatalog-list li'),
            itemArr         = [];

        for(var i = 0; i < daylistLen; i++) {
            var height = $('.pl_day_list').children().eq(i).height(),
                count = parseInt($('.pl_day_list').children().eq(i).position().top + 450),
                item = {};
            timelistitem.eq(i).attr('id', count);
            item = {
                "pos": count,
                "height": height
            };
            itemArr.push(item);
        }

        /*
         * 详情列表滚动对导航栏的互动
         */
        $(window).on('scroll', scrollAction);
        function scrollAction(){
            var scrollTop = $(this).scrollTop(),
                timelistId ='#' + trigVal(scrollTop, itemArr);
            $(timelistId).addClass('current');
            $(timelistId).siblings().removeClass('current');
        }


        /*
         * 导航栏对详情列表的互动
         */
        $(timelistitem).on('click', function() {
            $(window).scrollTop($(this).attr('id'));
        })


        /*
         * 距离间隔栏点击效果
         */
        var googleMap = new googlemapApi.GMaper({});
        var poplayer  = new PopLayer.PopLayer({
            targetCls : ".day_list .line",
            title     : "ck",
        });
        var latlngs   = mapControl.getLatLngs(),
            spotsName = mapControl.getSpotsName();

        $(".day_list .line").each(function (index, item) {
            $(item).unbind('click');
            $(item).bind('click', function() {
                var index     = $(this).attr('data-index'),
                    startName = spotsName[index-1],
                    endName   = spotsName[index],
                    title     = startName + " 至 " + endName;
                // todo get traffic data
                var content = "<div id='pop_traffic_info'>"
                            + "</div>"
                            + "<div id='pop_MapInner' width='430px' height='450px'></div>";

                poplayer.setTitle(title);
                poplayer.pop(content, 'text');
                googleMap.init({
                    mapInner    : "pop_MapInner",
                    lat         : '27.441219',
                    lng         : '111.75401'
                });
                var dom = document.getElementById("pop_traffic_info");
                var traffic_instructions = [];
                googleMap.drawTransitRoute(latlngs[index-1], latlngs[index], null,
                function(result){
                    if(result.status == "OK"){
                        var routes = result.routes[0],
                            legs   = routes.legs[0],
                            steps  = legs.steps;
                        for(var i in steps){
                            var step     = steps[i],
                                tempStep = {};
                            tempStep.mode         = step.travel_mode;
                            tempStep.instructions = step.instructions;
                            tempStep.distance     = step.distance.text;
                            tempStep.duration     = step.duration.text;
                            if(tempStep.mode == "TRANSIT"){
                                tempStep.arrival_stop = step.transit.arrival_stop.name;
                                tempStep.departure_stop = step.transit.departure_stop.name;
                                tempStep.headsign = step.transit.headsign;
                                tempStep.num_stops = step.transit.num_stops;
                                tempStep.line_name = step.transit.line.short_name;
                            }
                            traffic_instructions.push(tempStep);
                        }
                    }
                    // to add html
                    var html = [];
                    for(var i in traffic_instructions){
                        var instruction = traffic_instructions[i],
                            tempHtml    = '';
                        switch(instruction.mode){
                            case "DRIVING":
                                tempHtml = "<div class='drive'>" + '<span>' + "<img src='/images/plans/detail/pop_layer_drive.png'></span><span>" + instruction.instructions + "</span></div><div class='traffic_desc'>" + instruction.distance + "--约" + instruction.duration + "</div>";
                                html.push(tempHtml);
                                break;
                            case "TRANSIT":
                                tempHtml = "<div class='transit'>" + '<span>' + "<img src='/images/plans/detail/pop_layer_bus.png'></span><span>" + instruction.line_name + " " + instruction.instructions + "</span></div><div class='traffic_desc'>" + instruction.num_stops + "站" + "  约" +instruction.duration + "</div>";
                                html.push(tempHtml);
                                break;
                            case "WALKING":
                                tempHtml = "<div class='walk'><span><img src='/images/plans/detail/pop_layer_walk.png'></span><span>" + instruction.instructions + "</span></div><div class='traffic_desc'>" + instruction.distance + "</div>";
                                html.push(tempHtml);
                                break;
                            default :
                                break;
                        }
                    }
                    html = html.join("");
                    $('#pop_traffic_info').append(html);
                });
            });
        })


        /*
         * 距离间隔栏获取距离
         */
        setTimeout(addDistance, 1000);
        function addDistance() {
            $(".day_list .line").each(function(){
                var index = $(this).attr('data-index'),
                    distance = mapControl.calcuDistance(index);
                $(this).find('.js_showPoiTrafficPopup').text(distance);
            });
        };

        /*
         *左侧列表条目事件绑定
         */
        $(".day_list").on("click", 'li', function () {
            var mode    = $(this).attr("data-mode"),
                id      = $(this).attr("data-id"),
                dataUrl = '/edit/detail';
            infoBlock.render({url: dataUrl, mode: mode, id: id});
        })

        /*
         *判断滚动条滚动位置，返回触发值
         */
        function trigVal(val, arr) {
            var item;
            for ( var i in arr ) {
                item = arr[i];
                if ( val >= (item.pos - 105) && val <= item.pos + item.height - 105 ) return item.pos;
            }
            /*
                为了满足最后一个的判决，将游标卡尺向上移动了90px。去掉后，最后一天的联动失效
            */
        }

        var sliderbar = new sliderBar.sliderBar();//实例化SliderBar 对象
        sliderbar.init(); //初始化
    };
    window.onload = index;
});