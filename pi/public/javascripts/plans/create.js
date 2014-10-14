//城市的跳转需要获取出发城市
$('.city_nav').children('a').click(function(){
    var fromLocName = $('#from').val(),
        arrLocName = $(this).text();
    if (!fromLocName) {
        fromLocName = getCookie('fromLoc');
    }
    if ($(this).attr('data-type') === 'city') {
        $(this).attr('href','/route/city/?&fromName=' + fromLocName + '&arrName=' + arrLocName);
    } else if ($(this).attr('data-type') === 'viewspot') {
        $(this).attr('href','/route/include/?&fromName=' + fromLocName + '&arrName=' + arrLocName);
    } else if ($(this).attr('data-type') === 'province') {
        $(this).attr('href','/route/province/?&fromName=' + fromLocName + '&arrName=' + arrLocName);
    }
})


/* 回车后，直接跳转 */
$(function(){
    $(document).keydown(function(e) {
        var f1 = arriveSuggestions = $('#suggestion_to').css('display'),
            f2 = fromSuggestions = $('#suggestion_from').css('display'),
            keyCode = e.keyCode ? e.keyCode : e.which;
        if (f1 == 'none' && f2 == 'none' && keyCode === 13) {
            go_plan_list();
        }
    });
}())
/* ---end--- */