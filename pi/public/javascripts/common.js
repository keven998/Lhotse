/* ---- BEGIN: enum var ----*/
var zone = {
    type: {
        locality: 'loc',
        viewspot: 'vs',
    }
};
/* ---- END: enum var---- */

$(function () {
    /* ---- BEGIN: login layer ---- */
    var topHd = $('#top'),
        lgLayer = $('.lg-layer'),
        layer = $('.shadow_layer');
        navHeight = 100,
        wHeight = $(window).height()
        lgHeight = wHeight - navHeight;

    topHd.on('click','a.login',function(e){
        //qq登录时的当前页面的记录
        var qq_call_back = $(".qq").attr("href") + "&referer=" + window.location.href;
        $(".qq").attr("href",qq_call_back);
        lgLayer.css('height', lgHeight);
        layer.fadeIn("fast");
        lgLayer.show();
        lgLayer.animate({
            right: 0
        }, 300, "swing", function(){
            $.ajax({
              
            })
            layer.on('click',function(e){
//                lgLayer.hide(500);
                lgLayer.animate({
                    right: -600
                }, 300, 'swing');
//                $(this).hide();有两个layer...
                layer.fadeOut("fast");
            })
        });
    })
    /* ---- END: login layer ---- */
})


/* ---- BEGIN: cookies ---- */
var getCookie = function(c_name) {
    if (document.cookie.length > 0)
        {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";",c_start);

                if (c_end == -1)
                    c_end = document.cookie.length;

                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
    return "";
};

var setCookie = function(c_name,value,expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);

    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
};
/* ---- END: cookies ---- */

/* ---- BEGIN : user setting ---- */
// 鼠标悬停头像时弹出下拉菜单
$(function (){
    var userIcon = $('.user-avatar'),
        dropMenu = $('.drop-menu');
    var slug = false;

    userIcon.mouseover(
        function(e){
            dropMenu.css('display') == 'none' ? 
                dropMenu.css({'display': 'block'}) : null//dropMenu.css({'display': 'none'})
        }).mouseout(
         function(e){
            dropMenu.css('display') == 'block' && slug ? null :  dropMenu.css({'display': 'none'});
            slug = false; 
        });

    $('.drop-menu').mouseover(
        function(e){
            slug = true;
    }).mouseout(
        function(e){
            dropMenu.css({'display': 'none'});
        });
    
})
/* ---- END : user setting ---- */



/* ---- BEGIN: innerText ---- */
function compatible_innerText(domElement) {
    if (navigator.userAgent.toLowerCase().indexOf("firefox")>0) {
        return domElement.textContent;
    }

    return domElement.innerText;
}
/* ---- END: innerText ---- */


/* ---- BEGIN: suggestion ---- */

//  假如出发地已经存在，则记录到cookies
(function(){
    var userInput = getCookie('userInputFrom');    //userInputFrom用户自己输入的地址
    if (!userInput) {
        userInput = getCookie('fromLoc');   //fromLoc是IP定位的地址
    };
    $('#from').val(decodeURI(userInput));
})()


var arriveInput = $('#arrive'),
    arriveSuggestions = $('#suggestion_to'),
    fromInput = $('#from'),
    fromSuggestions = $('#suggestion_from');

var arrInput = [[arriveInput, arriveSuggestions, "suggestion_to", "arrive"],
                [fromInput, fromSuggestions, "suggestion_from", "from"]];

//  arrive location
function select_to(input, poi_type){
    $('#arrive').val(input);
    $('#arrive').attr('poi_type', poi_type);
    $("#suggestion_to").empty();
    $("#suggestion_to").hide();
}

// onclick event (used in html)
function suggestion_to(input){
    var slug = 'to';
    var inputText = $('#arrive').val();
    if(inputText !== $('#arrive').attr('tem')){
        $('#arrive').attr('tem', inputText);
        if (myTrim(inputText)) {
            suggestion(slug, myTrim(inputText));                    
        }else {
            $('#suggestion_to').css({
                'display' : 'none'
            });        
        }
    }    
}

// onclick event (used in html)
// function suggestion_from(input){
//     var slug = 'from';
//     var inputText = $('#from').val();
//     if(inputText !== $('#from').attr('tem')){
//         $('#from').attr('tem', inputText);
//         if (myTrim(inputText)) {
//             suggestion(slug, myTrim(inputText));
//         }else {
//             $('#suggestion_from').css({
//                 'display' : 'none'
//             });
//         }
//     }
// }


function suggestion(slug, input){
    $.ajax({
        url: "/suggestion?type=" + slug +"&input="+input,// type:['from','to'],input:
        cache: false,
        success: function(result){
            var html = '';
            var obj = result;

            if(obj.length == 0){
                //html += '很遗憾，没有找到相关内容～<br>';
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

//input文本框的隐藏
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
            t[1].css({
                'display': 'none'
            });

        }
    });

});

var array = [[arriveSuggestions, arriveInput], [fromSuggestions, fromInput]];
array.forEach(function(t){
    //// 清除‘选中’
    function clearSelectedStyle() {
        var items = t[0].find('p');
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
        var display = t[0].css('display');

        if (display !== 'none') {
            var items = t[0].find('p');
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
                var tempLocName;
                // 当前有选中提示
                if (curSelectedObj) {
                    // 当前位置到了末尾
                    if (curSelectedObj.index + 1 === len) {
                        // 先清除当前选中，然后跳到第一个
                        clearSelectedStyle();
                        $(items[0]).addClass('selected');
                        tempLocName = $(items[0]).text();
                    }
                    else {
                        clearSelectedStyle();
                        $(items[curSelectedObj.index + 1]).addClass('selected');
                        tempLocName = $(items[curSelectedObj.index + 1]).text();
                        
                    }
                }
                // 当前没有选中的提示，将第一个选中
                else {
                    curSelectedObj = {
                        elem: items[0],
                        index: 0
                    }
                    $(items[curSelectedObj.index]).addClass('selected');
                    tempLocName = $(items[curSelectedObj.index]).text();
                }
                t[1].attr('tem', tempLocName)
                t[1].val(tempLocName);
                e.stopPropagation();
                e.preventDefault();
            }
            else if (keyCode == 38) { // 上
                var tempLocName;
                if (curSelectedObj) {
                    if (curSelectedObj.index === 0) {
                        clearSelectedStyle();
                        $(items[len - 1]).addClass('selected');
                        tempLocName = $(items[len - 1]).text();
                    }
                    else {
                        clearSelectedStyle();
                        $(items[curSelectedObj.index - 1]).addClass('selected');
                        tempLocName = $(items[curSelectedObj.index - 1]).text();
                    }
                }
                else {
                    curSelectedObj = {
                        elem: items[len - 1],
                        index: len - 1
                    }
                    $(items[curSelectedObj.index]).addClass('selected');
                    tempLocName = $(items[curSelectedObj.index]).text();
                }
                t[1].attr('tem', tempLocName)
                t[1].val(tempLocName);
                e.stopPropagation();
                e.preventDefault();
            }
            //加入display判别，以免别的页面中得enter被这里吃掉
            else if(display && keyCode == 13) { // 回车
                setTimeout(function(){
                    // window.location.href = curSelectedObj.elem.getAttribute('href');
                    curSelectedObj.elem && curSelectedObj.elem.click();
                    t[1].attr('tem', compatible_innerText(curSelectedObj.elem));
                }, 50);
                e.stopPropagation();
                e.preventDefault();
            }
        }
    });
    

    //// 设置鼠标在联想选项中移动的效果
    t[0].mouseover(function(e) {
        var target = e.target || e.srcElement;
        var targetTagName = target.tagName.toLowerCase();
        if (targetTagName == 'p') {
            $(target).addClass('selected');
            var tempLocName = $(target).text();
            t[1].attr('tem', tempLocName)
            t[1].val(tempLocName);
        }
    }).mouseout(function(e) {
        var target = e.target || e.srcElement;
        var targetTagName = target.tagName.toLowerCase();
        if (targetTagName == 'p') {
            clearSelectedStyle();
        }
});
})
/* ----END: suggestion code ---- */


// 点击GO时, 跳转
function go_plan_list(){
    var arr_name = $('#arrive').val(),
        arr_poi_type = $('#arrive').attr('poi_type'),
        from_name = $('#from').text(),
        from_poi_type = $('#from').attr('poi_type'),
        url = '/route';
/*
    if (! arr_poi_type){
        arr_poi_type = zone.type.locality;
    }
    if (! from_poi_type){
        from_poi_type = zone.type.locality;
    }
*/
    if (!from_name || !arr_name){
        alert('请输入出发地和目的地');
    } 
    else if (from_poi_type == zone.type.locality){
        if (arr_poi_type ==zone.type.locality){
            url += "?" + zone.type.locality + "=" + arr_name;
        }else if(arr_poi_type == zone.type.viewspot){
            url += "?" + zone.type.viewspot + "=" + arr_name;
        }else {
            alert('未查到该地点，请再次输入您的目的地！');
            return ;
        }
        url += '&fromName=' + from_name;
        window.location.href = url;
    }else{
        alert(from_name + '不可以作为出发地，请您输入大一些的地点名称，如：北京');
        $('#from').val('');
    }
}
