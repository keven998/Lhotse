(function () {
    /*
     * 中部导航根据滚动条设置地位效果
     * */
    $(window).scroll(function () {
        var btop = $(this).scrollTop();
        var boxTop = $(".pl_fixed_menu").offset().top;
        var bleft = $(this).scrollLeft();
        var boxLeft = $(".pl_fixed_menu").offset().left;
        var width = $(".pl_fixed_menu").width();
        if ( btop > boxTop ) {
            $(".pl_fixed_menu .pl_fixed_menu_box").css({"position": "fixed", "left": boxLeft, "top": 0, width: width});
            // $(".pl_fixed_menu .pl_fixed_menu_box .link .mapbtn").show();
        } else {
            $(".pl_fixed_menu .pl_fixed_menu_box").css({"position": "", "left": "", "top": ""})
            // $(".pl_fixed_menu .pl_fixed_menu_box .link .mapbtn").hide();
        }
    });
    return null;
})();

