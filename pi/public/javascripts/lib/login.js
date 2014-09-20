$(function () {
    var topHd = $('#top'),
        lgLayer = $('.lg-layer');
        layer = $('.layer');
        
    topHd.on('click','a.login',function(e){
        lgLayer.show(500);
        layer.show();
        lgLayer.show(500,function(){ 
            $.ajax({
              
            }) 
            layer.on('click',function(e){
                lgLayer.hide(500);
                $(this).hide();
            })
        });
    })
    
    var weibo = $('#weibo_login'),
        qq = $('#qq_login');
    weibo.mousedown(function(e){
        $(this).attr("src","/images/common/login/weibo_login_hover.png");
    })
    weibo.mousedown(function(e){
        $(this).attr("src","/images/common/login/weibo_login_hover.png");
    })   
})
