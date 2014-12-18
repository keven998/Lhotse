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
            dropMenu.css('display') == 'block' && slug ? null : dropMenu.css({'display': 'none'});
            slug = false; 
        });

    $('.drop-menu').mouseover(
        function(e){
            slug = true;
    }).mouseout(
        function(e){
            dropMenu.css({
                'display': 'none'
            });
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
// from location
// function select_from(input, poi_type){
//     $('#from').val(input);
//     $('#from').attr('poi_type', poi_type);
//     $("#suggestion_from").empty();
//     $("#suggestion_from").hide();
//     setCookie('userInputFrom', input, 1);//将用户填写的地址记录到cookies
// }

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

// var arrInput = [[arriveInput, arriveSuggestions, "suggestion_to", "arrive"],
//                 [fromInput, fromSuggestions, "suggestion_from", "from"]];

var arrInput = [[arriveInput, arriveSuggestions, "suggestion_to", "arrive"]];

//  arrive location (used in "function suggestion()" by "slug")
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
    //tem is the register for the formar text
    if(inputText !== $('#arrive').attr('tem')){
        $('#arrive').attr('tem', inputText);
        if (myTrim(inputText)) {
            suggestion(slug, myTrim(inputText));                    
        }else {
            $('#suggestion_to').css({
                'display': 'none'
            });
        }
    }    
}

function suggestion(slug, input){
    $.ajax({
        url: "/suggestion?type=" + slug + "&input=" + input,// type:['from','to'],input:
        cache: false,
        success: function(result){
            var html = '';
            var obj = result;

            //不需要这个判断，因为在路由中已经判断了！
            if(obj.length == 0){
                $('#suggestion_' + slug).css({
                    'display': 'none'
                });
                //html += '很遗憾，没有找到相关内容～<br>';
            }else{
                for(var k = 0;k < obj.length;k++){
                    html += "<p onclick='select_" + slug + "(\"" + obj[k].name + "\", \"" + obj[k].type + "\")'>" + obj[k].name + "</p>";
                }
                $("#suggestion_" + slug).css("display", "block");
                if (slug == "to"){
                    var obj = "#arrive";
                }else if (slug == "from"){
                    var obj = "#from";
                }
                $("#suggestion_" + slug).empty();
                var padding = 5, border = 2;
                $("#suggestion_" + slug).css("left",$(obj).offset().left - padding - border + "px");
                //the difference in route page. why?
                if ($('#arrive').attr('data-page') == 'route'){
                    $("#suggestion_" + slug).css("top","50px");
                }else{
                    $("#suggestion_" + slug).css("top",$(obj).offset().top + $(obj).height() + "px");
                }
                $("#suggestion_" + slug).append(html);
            }
        }
    });    
}


function myTrim(x) {
    //delete the blank
    return x.replace(/^\s+|\s+$/gm, '');
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
        // 判断条件很奇怪???一定要有父节点？？
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

// var array = [[arriveSuggestions, arriveInput], [fromSuggestions, fromInput]];
var array = [[arriveSuggestions, arriveInput]];
array.forEach(function(t){
    //// 清除‘选中’
    function clearSelectedStyle() {
        // var items = t[0].find('p'),
        //     len = items.length;
        var items = t[0].find('p');
        var len = items.length;
        for (var i = 0; i < len; i++) {
            if ($(items[i]).hasClass('sugg_selected')) {
                $(items[i]).removeClass('sugg_selected');
            }
        }
    }
    //// 上下方向键选择联想的输入
    $(document).keydown(function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which,
            display = t[0].css('display');

        if (display !== 'none') {
            var items = t[0].find('p'),
                len = items.length,
                curSelectedObj; // 当前选中的那一个，即上下键盘按下时选择的起始位置

            // 获取当前选中的提示
            for (var i = 0; i < len; i++) {
                if ($(items[i]).hasClass('sugg_selected')) {
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
                        $(items[0]).addClass('sugg_selected');
                        tempLocName = $(items[0]).text();
                    }
                    else {
                        clearSelectedStyle();
                        $(items[curSelectedObj.index + 1]).addClass('sugg_selected');
                        tempLocName = $(items[curSelectedObj.index + 1]).text();
                    }
                }
                // 当前没有选中的提示，将第一个选中
                else {
                    curSelectedObj = {
                        elem: items[0],
                        index: 0
                    };
                    $(items[curSelectedObj.index]).addClass('sugg_selected');
                    tempLocName = $(items[curSelectedObj.index]).text();
                }
                t[1].attr('tem', tempLocName);
                t[1].val(tempLocName);
                e.stopPropagation();
                e.preventDefault();
            }
            else if (keyCode == 38) { // 上
                var tempLocName;
                if (curSelectedObj) {
                    if (curSelectedObj.index === 0) {
                        clearSelectedStyle();
                        $(items[len - 1]).addClass('sugg_selected');
                        tempLocName = $(items[len - 1]).text();
                    }
                    else {
                        clearSelectedStyle();
                        $(items[curSelectedObj.index - 1]).addClass('sugg_selected');
                        tempLocName = $(items[curSelectedObj.index - 1]).text();
                    }
                }
                else {
                    curSelectedObj = {
                        elem: items[len - 1],
                        index: len - 1
                    }
                    $(items[curSelectedObj.index]).addClass('sugg_selected');
                    tempLocName = $(items[curSelectedObj.index]).text();
                }
                t[1].attr('tem', tempLocName)
                t[1].val(tempLocName);
                e.stopPropagation();
                e.preventDefault();
            }
            //加入display判别，以免别的页面中的enter被这里吃掉
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
            $(target).addClass('sugg_selected');
            var tempLocName = $(target).text();
            t[1].attr('tem', tempLocName);
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
        arr_poi_type = ($('#arrive').attr('poi_type')) ? $('#arrive').attr('poi_type') : zone.type.locality,
        from_name = $('#from').text(),
        from_poi_type = ($('#from').attr('poi_type')) ? $('#from').attr('poi_type') : zone.type.locality,
        url = '/route';

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


$(function(){
    $(document).keydown(function(e) {
        /* why "= arriveSuggestions" */
        var f1 = arriveSuggestions = $('#suggestion_to').css('display'),
            // f2 = fromSuggestions = $('#suggestion_from').css('display'),
            keyCode = e.keyCode ? e.keyCode : e.which;
        if (f1 == 'none' && keyCode === 13) {
            go_plan_list();
        }
    });
})