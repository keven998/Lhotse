(function () {
    /*
     * 行程总览 ｜ 日历模式 等的切换
     * */
    var curLi = $('.menu').find('li.current');

    $('.menu').children().on('click', function() {
        var curContent = $(curLi).attr('class').split(' ')[0],
            toShowContent = $(this).attr('class');
        $(curLi).removeClass("current");
        $(this).addClass("current");
        $('.' + curContent + '_contents').hide();
        $('.' + toShowContent + '_contents').show();
        curLi = $(this);
    });
})();