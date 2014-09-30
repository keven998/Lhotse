$(function () {
    /* ---- BEGIN: login layer ---- */
    var topHd = $('#top'),
        lgLayer = $('.lg-layer'),
        layer = $('.layer');
        
    topHd.on('click','a.login',function(e){
        lgLayer.show(500);
        layer.show();
        lgLayer.show(500,function(){ 
            $.ajax({
              
            }) 
            layer.on('click',function(e){
                lgLayer.hide(500);
                $(this).hide();
            })
        });
    })
    /* ---- END: login layer ---- */
})

/* ---- BEGIN: suggestion ---- */
// from location
function select_from(input, poi_type){
    $('#from').val(input);
    $('#from').attr('poi_type', poi_type);
    $("#suggestion_from").empty();
    $("#suggestion_from").hide();
}

//  arrive location
function select_to(input, poi_type){
    $('#arrive').val(input);
    $('#arrive').attr('poi_type', poi_type);
    $("#suggestion_to").empty();
    $("#suggestion_to").hide();
}

// onclick event
function suggestion_to(input){
    var slug = 'to';
    var inputText = $('#arrive').val();
    if(inputText !== $('#arrive').attr('tem')){
        $('#arrive').attr('tem', inputText);
        if (inputText) {
            suggestion(slug, myTrim(input));                    
        }
    }
    
}

// onclick event
function suggestion_from(input){
    var slug = 'from';
    var inputText = $('#from').val();
    if(inputText !== $('#from').attr('tem')){
        $('#from').attr('tem', inputText);
        if (inputText) {
            suggestion(slug, myTrim(input));                    
        }
    }
}


function suggestion(slug, input){
    $.ajax({
        url: "/suggestion?type=" + slug +"&input="+input,
        cache: false,
        success: function(result){
            var html = '';
            var obj = result;

            if(obj.length == 0){
                html += '很遗憾，没有找到相关内容～<br>';
            }else{
                for(var k=0;k<obj.length;k++){
                    html += "<p onclick='select_" + slug + "(\"" + obj[k].name + "\", \""+obj[k].type+"\")'>" + obj[k].name + "</p>";
                }
            }
            $("#suggestion_"+slug).css("display","block");
            $("#suggestion_"+slug).empty();
            $("#suggestion_"+slug).append(html);
        }
    });    
}


/* ---- BEGIN: select suggestion ---- */
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

var arriveInput = $('#arrive'),
    arriveSuggestions = $('#suggestion_to'),
    fromInput = $('#from'),
    fromSuggestions = $('#suggestion_from');

var arrInput = [[arriveInput, arriveSuggestions, "suggestion_to", "arrive"],
                [fromInput, fromSuggestions, "suggestion_from", "from"]];
arrInput.forEach(function(t){
    if (!t[0].val()) {
        t[1].css({
            'display' : 'none'
        });
    } 
    // 鼠标点击屏幕
    $(document).click(function(e) {
        var el = e.srcElement || e.target;
        if (
            el.parentNode
                && el.parentNode.id !== t[2]
                && el.id !== t[3]
            )
        {
            // $(t[1]).find('p')[0].click();
            // t[1].css({
            //     'display': 'none'
            // });

        }
    }); 
});

var array = [arriveSuggestions, fromSuggestions];
array.forEach(function(t){
    //// 清除‘选中’
    function clearSelectedStyle() {
        var items = t.find('p');
        var len = items.length;
        console.log('clear');
        for (var i = 0; i < len; i++) {
            if ($(items[i]).hasClass('selected')) {
                $(items[i]).removeClass('selected');
            }
        }
    }

    //// 上下方向键选择联想的输入
    $(document).keydown(function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        var display = t.css('display');

        if (display !== 'none') {
            var items = t.find('p');
            var len = items.length;
            //console.log(len);
            var curSelectedObj; // 当前选中的那一个，即上下键盘按下时选择的起始位置
            // 获取当前选中的提示
            for (var i = 0; i < len; i++) {
                if ($(items[i]).hasClass('selected')) {
                    curSelectedObj = {
                        elem: items[i],
                        index: i
                    }
                    break;
                }
            }
            console.log('当前' + curSelectedObj);

            if (keyCode == 40) { // 下
                // 当前有选中提示
                if (curSelectedObj) {
                    // 当前位置到了末尾
                    if (curSelectedObj.index + 1 === len) {
                        // 先清除当前选中，然后跳到第一个
                        clearSelectedStyle();
                        $(items[0]).addClass('selected');
                    }
                    else {
                        clearSelectedStyle();
                        $(items[curSelectedObj.index + 1]).addClass('selected');
                    }
                }
                // 当前没有选中的提示，将第一个选中
                else {
                    curSelectedObj = {
                        elem: items[0],
                        index: 0
                    }
                    console.log(curSelectedObj);
                    $(items[curSelectedObj.index]).addClass('selected');
                    console.log($(items[curSelectedObj.index]).attr('class'));
                }
                e.stopPropagation();
                e.preventDefault();
            }
            else if (keyCode == 38) { // 上
                if (curSelectedObj) {
                    if (curSelectedObj.index === 0) {
                        clearSelectedStyle();
                        $(items[len - 1]).addClass('selected');
                    }
                    else {
                        clearSelectedStyle();
                        $(items[curSelectedObj.index - 1]).addClass('selected');
                    }
                }
                else {
                    curSelectedObj = {
                        elem: items[len - 1],
                        index: len - 1
                    }
                    $(items[curSelectedObj.index]).addClass('selected');
                }
                e.stopPropagation();
                e.preventDefault();
            }
            else if(keyCode == 13) { // 回车
                setTimeout(function(){
                    // window.location.href = curSelectedObj.elem.getAttribute('href');
                    curSelectedObj.elem && curSelectedObj.elem.click();
                }, 10);
                e.stopPropagation();
                e.preventDefault();
            }
        }
    });
    

    //// 设置鼠标在联想选项中移动的效果
    t.mouseover(function(e) {
        var target = e.target || e.srcElement;
        var targetTagName = target.tagName.toLowerCase();
        if (targetTagName == 'p') {
            $(target).addClass('selected');
        }
    }).mouseout(function(e) {
        var target = e.target || e.srcElement;
        var targetTagName = target.tagName.toLowerCase();
        if (targetTagName == 'p') {
            clearSelectedStyle();
        }
});
})




/* ---- zanbai code ---- */


// 点击GO时, 跳转
function go_plan_list(){
    var arr_name = $('#arrive').val(),
        arr_poi_type = $('#arrive').attr('poi_type'),
        from_name = $('#from').val(),
        from_poi_type = $('#from').attr('poi_type'),
        url = '/route';

    if (from_poi_type == 'loc'){
        if (arr_poi_type == 'loc'){
            url += '/city/';
        }else if(arr_poi_type == 'vs'){
            url += '/include/';
        }
        url += '?arrName=' + arr_name + '&fromName=' + from_name;
        window.location.href = url;
    }else{
        alert('not support');
    }
}

/* ---- END: suggestion ---- */
