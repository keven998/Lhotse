//我所在位置
$(function(){
    var pro = remote_ip_info["province"];
    input.fromLocName.value = pro;
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
                            console.log(data);
                            $("#linkDataProperty").autocomplete({
                                source: data,
                            });
                        }
    });
}

