//我所在位置
$(function(){
    var pro = remote_ip_info["province"];
    input.fromLocName.value = pro;
})


//城市的跳转需要获取出发城市
$('.city_nav').children('a').click(function(){
    var fromLocName = input.fromLocName.value,
        arrLocName = $(this).text();
    $(this).attr('href','/search?fromLocName=' + fromLocName + '&arrLocName=' + arrLocName);
})


//搜索框的联想功能
function getLinkData() {
    var linkDataProperty = document.getElementById("linkDataProperty");
    $.ajax({
        type:           "GET",
        contentType:    "application/json",
        url:            "/suggestion",
        data:           {
                            input : linkDataProperty.value
                        },
                        //从前台传递到后台的查询语句的参数
        dataType:       "json",
        error:          function(){
                        },
        success:        function(data) {
                            //当Ajax提交成功时调用的方法
                            //返回的是json对象！键值对 alert(data.key)
                            data = data.suggestion;
                            if(data.length==0){
                                return;
                            }
                            $("#linkDataProperty").autocomplete({
                                source: data,
                            });
                        }
    });
}


