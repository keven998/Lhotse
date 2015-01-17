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
});


/*修改计划名称*/
$(".plan_title").click(function(){
    var planEdit = $(this).next(),
        planInput =  planEdit.children(".plan_input"),
        planPreName = $(this).text(),
        planId = planInput.attr("data-id"),
        planEditBtn = planEdit.siblings(".edit_btn");

    $(this).css("display", "none");
    planEdit.css("display", "inline-block");
    planEditBtn.css("display", "inline-block");
    planInput.focus();
    var planTitle = $(this);//子函数可以使用
    /*确定按钮*/
    planEditBtn.children('.confirm').off('click');
    planEditBtn.children('.confirm').click(function(){
        var planName = planEdit.children(".plan_input").val();
        $.ajax({
            url: '/plans/mine/altername',
            data: {
                "planName": planName,
                "planId": planId
            },
            dataType: "json",
            type: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (msg) {
                console.dir(msg);
            },
            error: function () {
                console.log('error!!!');
            }
        });
        planTitle.text(planName);
        planTitle.attr("title", planName);
        planEdit.css("display", "none");
        planEditBtn.css("display", "none");
        planTitle.css("display", "inline-block");
    });

    /*取消按钮*/
    planEditBtn.children('.cancel').off('click');
    planEditBtn.children('.cancel').click(function(){
        planEdit.css("display", "none");
        planEditBtn.css("display", "none");
        planTitle.css("display", "inline-block");
        planInput.val(planPreName);
    });
});

