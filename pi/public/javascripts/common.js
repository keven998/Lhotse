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
    suggestion(slug, input);
}

// onclick event
function suggestion_from(input){
    var slug = 'from';
    suggestion(slug, input);
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
                    html += "<a onclick='select_" + slug + "(\"" + obj[k].name + "\", \""+obj[k].type+"\")'>" + obj[k].name + "</a>";
                }
            }
            $("#suggestion_"+slug).css("display","block");
            $("#suggestion_"+slug).empty();
            $("#suggestion_"+slug).append(html);
        }
    });
}


/* ---- zanbai code ---- */
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

var arriveInput = $('#arrive'),
    arriveSuggestions = $('#suggestion_to');

//// focus事件，清楚默认提示文字，设置输入框颜色
arriveInput.on('focus', function(e){
    var that = $(this);
    if (myTrim(that.val()) === '请输入') {
        that.val('');
        that.css({
            color: '#000'
        });
    }
});

//// 失去焦点的时候填写默认提示
arriveInput.on('blur', function(e){
    var that = $(this);
    if (myTrim(that.val()) === '') {
        that.val('请输入');
        that.css({
            color: '#999'
        });
    }
});

// //// ajax 请求联想输入的数据
// arriveInput.on('keyup', function(e) {
//     var $this = $(this);
//     if ($this.val() !== $this.data('val')) {
//         $this.data('val', $this.val());
//         if (util.str.trim($this.val())) {
//             $.ajax({
//                 url: config.AJAX.SEARCH_SUGGESTION + $this.val(),
//                 dataType: 'jsonp',
//                 jsonp: 'callback',
//                 success: function(data) {
//                     if (data && data.shop) {
//                         var html = '';
//                         var len  = data.shop.length;
//                         for (var i = 0; i < len; i++) {
//                             html += '<a target="_blank" '
//                                  + 'href="http://www.zanbai.com/shop?shop_id='
//                                  + data.shop[i].word_id
//                                  + '">'
//                                  + data.shop[i].word
//                                  + '</a>';
//                         }
//                         arriveSuggestions.css({
//                             'display': ''
//                         });
//                         arriveSuggestions.html(html);
//                     }
//                     else {
//                         arriveSuggestions.css({
//                             'display': 'none'
//                         });
//                         arriveSuggestions.html('');
//                     }
//                 }
//             });
//         }
//         else {
//             arriveSuggestions.css({
//                 'display': 'none'
//             });
//             arriveSuggestions.html('');
//         }
//     }
//     // 阻止事件冒泡
//     e.stopPropagation();
//     e.preventDefault();
// });

// 鼠标点击屏幕
$(document).click(function(e) {
    
    var el = e.srcElement || e.target;
    if (
        el.parentNode
            && el.parentNode.id !== 'suggestion_to'
            && el.id !== 'arrive'
        )
    {
        // 鼠标点开后，清除输入
        arriveInput.val('')
        arriveSuggestions.css({
            'display': 'none'
        });
    }

    // var cityLayer = view.$cityLayer[0];
    // if (cityLayer && cityLayer.style.display !== 'none') {
    //     if (
    //         !util.dom.contains(cityLayer, el)
    //         &&
    //         el.getAttribute('id') != 'change-city'
    //     ) {
    //         cityLayer.style.display = 'none';
    //         popup.createModuleMask.hide();
    //     }
    // }

});

//// 清除‘选中’
function clearSelectedStyle() {
    var items = arriveSuggestions.children();
    var len = items.length;
    for (var i = 0; i < len; i++) {
        if ($(items[i]).hasClass('selected')) {
            $(items[i]).removeClass('selected');
        }
    }
}

//// 上下方向键选择联想的输入
$(document).keydown(function(e) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    var display = arriveSuggestions.css('display');
    if (display !== 'none') {
        var items = arriveSuggestions.children();
        var len = items.length;
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
                $(items[curSelectedObj.index]).addClass('selected');
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
arriveSuggestions.mouseover(function(e) {
    var target = e.target || e.srcElement;
    var targetTagName = target.tagName.toLowerCase();
    if (targetTagName == 'a') {
        $(target).addClass('selected');
    }
}).mouseout(function(e) {
    var target = e.target || e.srcElement;
    var targetTagName = target.tagName.toLowerCase();
    if (targetTagName == 'a') {
        clearSelectedStyle();
    }
});

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
