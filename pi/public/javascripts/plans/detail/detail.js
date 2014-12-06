var page_id = page_var.id;
var page_path = page_var.path;

/* load css */
loadCss(page_path, page_id);

function loadCss(page_path, page_id) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = '/stylesheets/' + page_path + page_id + '.css';
    document.getElementsByTagName("head")[0].appendChild(link);
}
console.log('toLoadScript...');
/* load js */
require.config({
    baseUrl: '/javascripts/',
    paths: {
        "sliderBar": 'plans/detail/sliderBar',
        "googlemapApi": "lib/googlemap.api",
        "siderBarBlock": 'plans/detail/siderBarBlock',
        "gmapControl": "plans/detail/gmapControl",
    },
});

$(function() {
        var h = "http://ditu.google.cn/maps/api/js?v=3&sensor=false&key=AIzaSyCuXDkC1uoHaSctnrsGSGfpj9QVCUrfw1w",
            f = document.createElement("script");
        f.type = "text/javascript";
        f.src = h + "&callback=main";
        document.body.appendChild(f);
    });


function main() {
    console.log('map callback');
}

require(['sliderBar', 'googlemapApi', 'gmapControl', 'siderBarBlock'],
    function(sliderBar, googlemapApi, gmapControl, siderBarBlock){

    var index = function () {
        //$('.scrollImg').qyerSlidImg();//右侧图片组图切换效果，即调用qyerSlidImg插件


        var mapControl = new gmapControl.mapControlPanel(null, "mapContainer");
        mapControl.init();

        function main(){
                console.log('callback main');
            };
        var infoBlock = new siderBarBlock.InfoBlock();
        infoBlock.init();

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
        $(window).on('scroll',scrollAction);
        function scrollAction(){
            var scrollTop = $(this).scrollTop() - 0,
                timelistId ='#' + trigVal(scrollTop, itemArr);
            $(timelistId).addClass('current');
            $(timelistId).siblings().removeClass('current');
        }

        /*
         * 导航栏对详情列表的互动
         */
        $(timelistitem).on('click', function() {
            $(document).scrollTop($(this).attr('id'));
        })


        /*
         * 距离间隔栏点击效果
         */
        $(".day_list .line").on("click", function () {
            // TODO
            var index = $(this).attr('data-index'),
                distance = mapControl.calcuDistance(index);
            $(this).find('.js_showPoiTrafficPopup').text(distance);
        });


        /*
         * 距离间隔栏获取距离
         */
        setTimeout(addDistance, 15000);
        function addDistance() {
            $(".day_list .line").each(function(){
                var index = $(this).attr('data-index');
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
                dataUrl = '';
                console.log(id);
            switch ( mode ) {
                case 'trainStation':
                    dataUrl = '/traffic.php';
                    break;
                case 'trainRoute':
                    dataUrl = '/xxxxxxxxx';
                    break;
                case 'airport':
                    dataUrl = '/xxxxxxxxx';
                    break;
                case 'airRoute':
                    dataUrl = '/xxxxxxxxxx';
                    break;
                case 'viewspot' :
                    dataUrl = '/edit/detail';
                    break;
                case 'hotel':
                    dataUrl = '/hotel.php';
                    break;
                default:
                    break;
            }
            //siderBarBlock.js 弹出渲染窗口
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


    //if not add following sentence, error in calculating itemArr
    window.onload = index;
    //$(document).ready(index());  // don't use this, as picture not onload, height will not right
});