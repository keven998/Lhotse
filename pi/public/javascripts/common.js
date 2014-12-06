/* ---- BEGIN: enum var ----*/
var zone = {
    level: {
        country: 0,
        province: 1,
        city: 2,
    },
    type: {
        country: 'country',
        province: 'province',
        city: 'loc',
        viewspot: 'vs',
    },
    searchRoutesUrl: {
        country: '/country/',
        province: '/province/',
        city: '/city/',
        viewspot: '/include/',
    }
};
/* ---- END: enum var---- */

$(function () {
    /* ---- BEGIN: login layer ---- */
    var topHd = $('#top'),
        lgLayer = $('.lg-layer'),
        layer = $('.shadow_layer');
        navHeight = 100,
        wHeight = $(window).height()
        lgHeight = wHeight - navHeight;

    topHd.on('click','a.login',function(e){
        //qq登录时的当前页面的记录
        var qq_call_back = $(".qq").attr("href") + "&referer=" + window.location.href;
        $(".qq").attr("href",qq_call_back);
        lgLayer.css('height', lgHeight);
        layer.fadeIn("fast");
        lgLayer.show();
        lgLayer.animate({
            right: 0
        }, 300, "swing", function(){
            $.ajax({
              
            })
            layer.on('click',function(e){
//                lgLayer.hide(500);
                lgLayer.animate({
                    right: -600
                }, 300, 'swing');
//                $(this).hide();有两个layer...
                layer.fadeOut("fast");
            })
        });
    })
    /* ---- END: login layer ---- */
})


/* ---- BEGIN: cookies ---- */
var getCookie = function(c_name) {
    if (document.cookie.length > 0)
        {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";",c_start);

                if (c_end == -1)
                    c_end = document.cookie.length;

                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
    return "";
};

var setCookie = function(c_name,value,expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);

    document.cookie=c_name+ "=" + escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";path=/";
};
/* ---- END: cookies ---- */

/* ---- BEGIN : user setting ---- */
// 鼠标悬停头像时弹出下拉菜单
$(function (){
    var userIcon = $('.user-avatar'),
        dropMenu = $('.drop-menu');
    var slug = false;

    userIcon.mouseover(
        function(e){
            dropMenu.css('display') == 'none' ? 
                dropMenu.css({'display': 'block'}) : null//dropMenu.css({'display': 'none'})
        }).mouseout(
         function(e){
            dropMenu.css('display') == 'block' && slug ? null :  dropMenu.css({'display': 'none'});
            slug = false; 
        });

    $('.drop-menu').mouseover(
        function(e){
            slug = true;
    }).mouseout(
        function(e){
            dropMenu.css({'display': 'none'});
        });
    
})
/* ---- END : user setting ---- */