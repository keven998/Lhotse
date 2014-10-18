/*删除一个计划*/
$("i.delete").on("click",function(){
    var planID = $(this).attr("data-id");
    $.ajax({
        url:    '/plans/mine/delete/' + planID + '/',
        type:   'GET',
        success:    function (msg) {
            console.dir(msg);
        },
        error:  function () {
            console.log('error!!!');
        }
    });
    $(this).parents(".plan_item").remove();
})


/*修改计划名称*/
$(".plan_title").click(function(){
    var planEdit = $(this).next(),
        planInput =  planEdit.children(".plan_input"),
        planPreName = $(this).text(),
        planId = planInput.attr("data-id"),
        planEditBtn = planEdit.siblings(".edit_btn");

    $(this).css("display","none");
    planEdit.css("display","inline-block");
    planEditBtn.css("display","inline-block");

    var planTitle = $(this);//子函数可以使用
    /*确定按钮*/
    planEditBtn.children('.confirm').click(function(){
        var planName = planEdit.children(".plan_input").val();
        $.ajax({
            url:    '/plans/mine/altername',
            data:   {
                "planName": planName,
                "planId":   planId
            },
            dataType:   "json",
            type:   'GET',
            success:    function (msg) {
                console.dir(msg);
            },
            error:  function () {
                console.log('error!!!');
            }
        });
        if (planName.length > 9){
            var abbrName = planName.substring(0,8);
            planTitle.children(".plan_name").text(abbrName + "...");
        }
        else
            planTitle.children(".plan_name").text(planName);
        planTitle.children(".plan_name").attr("title",planName);
//        planTitle.children(".plan_name").text(planName);
        planEdit.css("display","none");
        planEditBtn.css("display","none");
        planTitle.css("display","inline-block");
    })

    /*取消按钮*/
    planEditBtn.children('.cancel').click(function(){
        planEdit.css("display","none");
        planEditBtn.css("display","none");
        planTitle.css("display","inline-block");
        planInput.val(planPreName);
    })
})

