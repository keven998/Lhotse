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
	        layer=$('.layer');
	    
        lgLayer.show(500);
        layer.show();

        lgLayer.show(500,function(){ 
            layer.on('click',function(e){
                lgLayer.hide(500);
                $(this).hide();
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
