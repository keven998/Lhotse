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