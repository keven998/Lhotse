/*删除一个计划*/
$("i.delete").on("click",function(){;
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
    var planTitle = $(this),
        planEdit = $(this).next(),
        planInput =  planEdit.children(".plan_input"),
        planPreName = document.getElementById("plan_input").value,
        planId = planInput.attr("data-id"),
        planEditBtn = planEdit.siblings(".edit_btn");

    $(this).css("display","none");
    planEdit.css("display","inline-block");
    planEditBtn.css("display","inline-block");

    /*确定按钮*/
    planEditBtn.children('.confirm').click(function(){
        var planName = document.getElementById("plan_input").value;
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
        planTitle.children(".plan_name").text(planName);
        planEdit.css("display","none");
        planEditBtn.css("display","none");
        planTitle.css("display","inline-block");
    })

    /*取消按钮*/
    planEditBtn.children('.cancel').click(function(){
        document.getElementById("plan_input").value = planPreName;
        planEdit.css("display","none");
        planEditBtn.css("display","none");
        planTitle.css("display","inline-block");
        //planInput.value = planPreName;
    })
})

