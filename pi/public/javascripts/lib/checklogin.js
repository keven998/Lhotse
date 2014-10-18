var checkLogin = function() {
	var isLogin = $('.user');
	if (isLogin == null || isLogin.length == 0) {
		// 弹出登录界面
		showLoginPage();

		return "unlogin";
	} else {
		
		return "logined";
	}

	function showLoginPage() {
		var topHd=$('#top'),
	        lgLayer=$('.lg-layer'),
	        layer=$('.layer'),
            navHeight = 100,
            wHeight = $(window).height()
            lgHeight = wHeight - navHeight,
	        qq_call_back = $(".qq").attr("href") + "&referer=" + window.location.href;
        $(".qq").attr("href",qq_call_back);
        lgLayer.css('height', lgHeight);
        layer.fadeIn("fast");
        lgLayer.show();
        lgLayer.animate({
            right: 0
        }, 300, "swing", function(){
            layer.on('click',function(e){
                lgLayer.animate({
                    right: -600
                }, 300, 'swing');
                layer.fadeOut("fast");
            })
        });
		
	}
}


// 用户点击“我的计划”时，检测是否登录。并设置“我的计划”点击链接
$(function() {
	$('.myplans').click(function(){
		// 检测是否登录
		if (checkLogin() === "unlogin") {
		    return ;
		} else {
			//var uid = $('b.b1').attr('data-id');
			var hrefValue = '/plans/mine/';

		    $('.myplans').attr('href', hrefValue);
		}
	})
})
