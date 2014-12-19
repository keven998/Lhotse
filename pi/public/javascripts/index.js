//切换"路线推荐"维度
$(function(){
    $(".new").click( function() {
        $(".new_routes").show();
        $(".editor_routes").hide();
        $(".mustgo_routes").hide();
        $(".pop_routes").hide();
        $(this).css("color",'#a22');
        $(".editor").css("color",'#08DCA9');
        $(".mustgo").css("color",'#08DCA9');
        $(".pop").css("color",'#08DCA9');
    });

    $(".editor").click( function() {
        $(".new_routes").hide();
        $(".editor_routes").show();
        $(".mustgo_routes").hide();
        $(".pop_routes").hide();
        $(this).css("color",'#a22');
        $(".new").css("color",'#08DCA9');
        $(".mustgo").css("color",'#08DCA9');
        $(".pop").css("color",'#08DCA9');
    });

    $(".mustgo").click( function() {
        $(".new_routes").hide();
        $(".editor_routes").hide();
        $(".mustgo_routes").show();
        $(".pop_routes").hide();
        $(this).css("color",'#a22');
        $(".editor").css("color",'#08DCA9');
        $(".new").css("color",'#08DCA9');
        $(".pop").css("color",'#08DCA9');
    });

    $(".pop").click( function() {
        $(".new_routes").hide();
        $(".editor_routes").hide();
        $(".mustgo_routes").hide();
        $(".pop_routes").show();
        $(this).css("color",'#a22');
        $(".editor").css("color",'#08DCA9');
        $(".mustgo").css("color",'#08DCA9');
        $(".new").css("color",'#08DCA9');
    });


    //图片的二态
    var mList = $('.main');
    $(mList).on('mouseenter', '.m-list', function (e) {
        $('.layer').stop(false,true);
        $(this).find('.layer').fadeIn(200);
    });
    $(mList).on('mouseleave', '.m-list', function (e) {
        $('.layer').stop(false,true);
        $(this).find('.layer').fadeOut(200);
    })
});

// JavaScript DIVCSS5 Document

(function($){
    var goToTopTime;
    $.fn.goToTop=function(options){
        var opts = $.extend({},$.fn.goToTop.def,options);
        var $window=$(window);
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
        //$(this).hide();
        var $this=$(this);
        clearTimeout(goToTopTime);
        goToTopTime=setTimeout(function(){
            var controlLeft;
            if ($window.width() > opts.pageHeightJg * 2 + opts.pageWidth) {
                controlLeft = ($window.width() - opts.pageWidth) / 2 + opts.pageWidth + opts.pageWidthJg;
            }else{
                controlLeft = $window.width()- opts.pageWidthJg-$this.width();
            }

            var controlTop=$window.height() - $this.height()-opts.pageHeightJg;

            var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;

            if (shouldvisible){
                $this.stop().show();
            }else{
                $this.stop().hide();
            }

            $this.css({
                position:  'fixed',
                top: controlTop,
                left: controlLeft
            });
        },30);

        $(this).click(function(event){
            $body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
            $(this).blur();
            event.preventDefault();
            event.stopPropagation();
        });
    };

    $.fn.goToTop.def={
        pageWidth:1000,//页面宽度
        pageWidthJg:22,//按钮和页面的间隔距离
        pageHeightJg:130,//按钮和页面底部的间隔距离
        startline:130,//出现回到顶部按钮的滚动条scrollTop距离
        duration:3000,//回到顶部的速度时间
        targetObg:"body"//目标位置
    };

    /*
     * 滚动加载
     * */
    // $(window).on("scroll", function () {
    //     var top = document.documentElement.scrollTop + document.body.scrollTop;
    //     var textheight = $(document).height();
    //     if ( textheight - top - $(window).height() <= 100 ) {
    //         $('.more').show();
    //         $.ajax({ //ajax获取加载的数据
    //             type   : "get",
    //             url    : ".../listLoad.php",
    //             success: function (msg) {  //成功返回后删除加载状态样式，插入dom
    //                 console.dir(msg);
    //                 $('.more').hide();
    //                 //todo insert dom
    //             },
    //             error  : function () {
    //                 //alert("参数出错，刷新后重试");
    //                 return false;
    //             }
    //         });
    //     }
    // });

    /*
     * 图片轮播
     * */
//    startTimer();
//    /** Main Slider **/
//    var timer;
//    var slideCount = 3;
//    var currSlide = 0;
//    var nextSlide = currSlide + 1;
//    var fadeSpeed = 1000;
//    //Start slides timer functions
//    function startTimer() {
//        timer = setInterval(function () {
//            $('.slide-item').eq(currSlide).fadeOut(fadeSpeed);
//            $('.slide-item').removeClass('curr');
//            $('.slide-item').eq(nextSlide).addClass('curr').fadeIn(fadeSpeed);
//            $('.thumbs li').eq(nextSlide).addClass('curr');
//            currSlide = nextSlide;
//            nextSlide = currSlide + 1 < slideCount ? currSlide + 1 : 0;
//        }, 6000);
//    }
})(jQuery);


$(function(){
    $('<a href="javascript:;" class="backToTop" title="返回顶部"></a>').appendTo("body");
});

//返顶效果
$(function(){
  $(".backToTop").goToTop();
      $(window).bind('scroll resize',function(){
        $(".backToTop").goToTop({
          pageWidth:960,
          duration:400
        });
    });
});


// 通过IP获取地理地址-城市名字

$(function(){
    var cityName = remote_ip_info["city"];// + remote_ip_info["city"];
    if (!getCookie('userInputFrom')) {
        document.getElementById('from').innerHTML = cityName;
    }else{
        document.getElementById('from').innerHTML = getCookie('userInputFrom');//function getcookie defined in common.js
    }
    setCookie('fromLoc',encodeURI(cityName), 1);
})


/********* City Selector *********/
var fromWrap = new Vcity.CitySelector({input:'fromWrap'});
// var arrive = new Vcity.CitySelector({input:'arrive'});
/*********** City End ************/

/* ---end--- */
          



