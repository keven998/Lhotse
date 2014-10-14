/*
    tagFlag 标志当前tag
    0：酒店
    1：景点
*/
var tagFlag = 1;
// page的计数器，存放两个tab下的已请求page数,当用户主动输入搜索信息时，置位[0，0]
var pageArr = [0, 0];
// 缓存用户上次输入的搜索信息，方便用户切换tab时，不失去相应tab中输入的信息
var uesrInput = ['', ''];

// 景点&酒店搜索
var searchInput = $(".s-input");
var tagViewspot = $("#item01");
var tagHotel = $("#item02");
// 目的地页面
var arrLocName = $('h1.t').html().substring($('h1.t').html().indexOf('--') + 2, $('h1.t').html().indexOf('<'));

$(function () {
    // tab切换
    var tab01=$('#tab01'),
        tab02=$('#tab02'),
        item01=$('#item01'),
        item02=$('#item02');
    
    tab01.click(function(){
        // tag置位 : 景点
        tagFlag = 1;
        uesrInput[0] = searchInput.val();
        searchInput.val(uesrInput[tagFlag]);

        if(!$(this).hasClass('item01-select')){
            $(this).addClass('item01-select').removeClass('item01-normal');
            tab02.removeClass('item02-select').addClass('item02-normal');
            item02.hide();
            item01.show();
        }else{
            return false;
        }
    })
    
    tab02.click(function(){
        // tag置位 : 酒店
        tagFlag = 0;
        uesrInput[1] = searchInput.val();
        searchInput.val(uesrInput[tagFlag]);

        if(!$(this).hasClass('item02-select')){
            $(this).addClass('item02-select').removeClass('item02-normal');
            tab01.removeClass('item01-select').addClass('item01-normal');
            item01.hide();
            item02.show();
        }else{
            return false;
        }
    })
    

    // 定位到左边图片区域
    var imgs = $('.imgs');
    
    // 当+号icon被点中时，触发添加景点动作
    imgs.on('click', 'a .ico02', function (e) {
        // 如果旅程天数大于0
        if ( $('.edit-list').length > 0 ) {
            // 添加景点
            start($(this).parent('a')); //这个东西的a父类-->a .ico02 
        } else {
            alert('请先添加一天!')
        }
    });
    
    // 获取当前时间
    var Time=new Date(),
        year=Time.getFullYear(),
        month=Time.getMonth()+ 1,
        day=Time.getDate(),
        curDateTime=year+'-';
    if(month<10) curDateTime+='0';
    curDateTime+=month+'-';
    if(day<10) curDateTime+="0";
    curDateTime+=day;
    // 添加当前时间到日历
    $('#datetimepicker').val(curDateTime);
    $('#datetimepicker').datetimepicker({
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        
        timepicker: false,
        lang:'ch',
        format:'Y-m-d',
        //showAnim: 'Slide down',
    });

    // 添加一天
    var addBtn = $('.add');
    addBtn.on('click', function (e) {
        // 设置新的一天的参数
        var cur_day=$('.edit-list').length+1;
        var listC = '<ul class="edit-list" data-day="' + cur_day + '">' +
            '<li data-flag="new" class="driver disabled">' +
            '<i class="ico01-d">D' + cur_day + '</i>' +
            '<i class="ico01 ico01-close"></i>' +
            '</li></ul>';
        
        // 加入到旅程列表中
        $('.t-left').append(listC);
        $('.edit-list').sortable('destroy');
        $('.edit-list').sortable({
            items: ':not(.disabled)',
            connectWith: '.edit-list'
        }).on('sortupdate',function(e, ui){
                //console.dir(ui.item);
                //ui.item.animate({height:0},200,'swing');
            });
        cur_day++;
        deleteBind();//注册删除事件
        dayActive();//天数容器激活
    });
    
    
    $('.edit-list').sortable({
        items: ':not(.disabled)',
        connectWith: '.edit-list'
    })
    
    deleteBind();//注册删除事件
    dayActive();
    
    /*
        固定导航栏的位置
    */
    // $(document).ready(function(e) {         
    //     t = $('.t-left').offset().top; // 起始头部离顶部的位置
    //     mh = $('.t-right').height();
    //     fh = $('.t-left').height(); //高度

    //     $(window).scroll(function(e){
    //         s = $(document).scrollTop();    
    //         if(s > t - 10){
    //             $('.t-left').css('position','fixed');
    //              // if(s + fh > mh){    
    //              //     $('.t-left').css('top',mh-s-fh + 60+'px');    
    //              // }               
    //         }else{
    //             $('.t-left').css('position','');
    //         }
    //     })
    // });

    /*
     * 添加景点飞行轨迹开始回调函数
     * */
    function start($this) {
        var objX,
            objY,
            imgC = $this,
            // 是否选中某一天
            addC = $('.edit-list .active'),
            img = $this.find('div').html(),
            title = '',
            id = $this.find('.id').text(),
            type = $this.find('.type').text();
            // 作为clear函数的参数
            if (tagFlag == 1) {
                title = $this.find('.spot-name').text();    
            } else {
                title = $this.find('.hotel-name').text();    
            }
            
        
        if(addC.length<1) {
             alert('请在左侧选择添加到哪一天！');
            return false;
        }
        // 设置飞行路径
        objX = addC.offset().left - imgC.offset().left + 150 + "px";
        objY = addC.offset().top - imgC.offset().top + "px";
        
        // 设置一个暂时的容易，来存放飞动的图片
        var $appmt = $("<span class=box>" + img + "</span>");
        $this.append($appmt);
        var imgobj = $(".box");
        imgobj.animate({
            top : objY,
            left: objX
        }, 1000, function () {
            //  添加title, id, type (hotel|view-spot)
            clear(title, id, type); // 传递三个参数给clear
        });
    }

    /*
     * 添加景点飞行轨迹结束回调函数
     作用：设置名称，删除图片容器
     * */
    function clear(title, id, type) {
        // 删除飞动的图片
        $('.box').remove();
        
        var itemHtml = 
            '<li draggable="true" style="height: 40px;">' + title + 
                '<i class="ico01 ico01-close"></i>' +
                '<div style="display:none" class="id">' + id + '</div>' +
                '<div style="display:none" class="type">' + type + '</div>' + 
            '</li>';
        $('.edit-list .active').parent('.edit-list').append(itemHtml);
        
        deleteBind();
        
        //实例化拖拽
        $('.edit-list').sortable('destroy');
        $('.edit-list').sortable({
            items: ':not(.disabled)',
            connectWith: '.edit-list'
        }).on('sortupdate',function(e,ui){
                //console.dir(ui.item);
                //ui.item.animate({height:0},200,'swing');
            });
    }

    /*
     * 删除图标按钮事件绑定函数
     * */
    function deleteBind() {
        var editList = $('.edit-list li');
        editList.each(function (index) {
            var day = $(this).parent().attr('data-day');
            if ( $(this).hasClass('driver') ) {
                $(this).find('.ico01-close').off('click');
                $(this).find('.ico01-close').on('click', function (e) {
                    var self = $(this);
                    if ( confirm('确定删除第' + day + '天行程？') ){
                        $(this).parents('.edit-list').remove();//删除一天的所有已添加行程
                        resetDaysort();//重置天数排序
                    }
                })
            } else {
                $(this).find('.ico01-close').off('click');
                $(this).find('.ico01-close').on('click', function (e) {
                    var self = $(this),
                        item = $(this).parents('li'),
                        //itemName = item[0].innerText;
                        //innerText在Firefox中不支持，下面用字符串索引截取
                        itemName = item.html(),
                        endFlag = itemName.search('<i');
                    itemName = itemName.substr(0, endFlag);

                    if ( confirm('确定要将"' + itemName + '"从D' + day + '中删除？') ){
                        $(this).parents('li').remove();
                    }
                })
            }
        });
    }

    /*
     * 行程天数添加容器激活函数
     * */
    function dayActive() {
        var lists = $('.edit-list li.driver');
        lists.each(function (index) {
            var Index = index,
                self=$(this);
            self.off('click');
            self.on('click',function(e){
                // 获取所有同胞，为景点和酒店数据
                var childList=$(this).parent().children('li');
                if($(this).hasClass('active')){
                    // 下面的代码注视掉，但不要删除
                    //  $(this).removeClass('active');
                    // childList.each(function(index){
                    //     if(index!==0){
                    //         $(this).animate({height:0},200,'swing');
                    //     }
                    // })
                }else{
                    $(this).addClass('active');
                    childList.each(function(index){
                        if(index!==0){
                            $(this).animate({height:40},200,'swing');
                        }
                    })
                }
                lists.each(function (index) {
                    var childListOther=$(this).parent().children('li');
                    if ( $(this).hasClass('active') && index !== Index ) {
                        $(this).removeClass('active');
                        childListOther.each(function(index){
                            if(index!==0){
                                $(this).animate({height:0},200,'swing');
                            }
                        })
                    }
                })
            });
        });
    }
    
    
    /*
    * 重排天数函数
    * */
    function resetDaysort(){
        var  lists = $('.edit-list');
        lists.each(function(index){
            $(this).attr('data-day',index+1);
            $(this).children('.driver').children('.ico01-d').text('D'+(index+1));
        })
    }    
    
    
    /* 
    *   路线编辑，保存时的操作
    */
    $('a.confirm').click(function () {
        // 检测是否登录
        if (checkLogin() === "unlogin") {
            return ;
        }

        //$('.edit-list')[0].children[1].children[1].innerText  
        var dayList = $('.edit-list');
        var dayCount = dayList.length;
        console.log(dayCount);
        var spotArray = new Array();
        var hotelCnt = new Array();
        var hotelFlag = 0;//记录酒店超过一个的天数
        for (var i = 0; i < dayCount; i++) {
            var daySpot = dayList[i];
            var spotList = daySpot.children;
            var spotCount = spotList.length;
            var oneDaySpot = new Array();
            hotelCnt[i] = 0;
            // 从第一个元素开始
            for (var j = 1; j < spotCount; j++) {
                var spotObj = new Object(),
                    spot = spotList[j],
                    name = $(spot).html(),
                    //var name = spot.innerText;
                    itemId = $(spot.children[1]).text(),
                    type = $(spot.children[2]).text();
                var endFlag = name.search('<i');
                name = name.substr(0, endFlag);
                
                if (type == 'hotel')
                    hotelCnt[i] = hotelCnt[i] + 1;
                // 添加景点和酒店
                spotObj['itemId'] = itemId;
                spotObj['type'] = type;
                oneDaySpot.push(spotObj); 
            }
            if (hotelCnt[i] > 1)
                hotelFlag = hotelFlag + 1;
            spotArray.push(oneDaySpot);
        }
        
        //一天内的酒店数大于1时会提示
        if (hotelFlag > 0){
            var warnWords = '您的行程中';
            var d;//记录day
            for (var i = 0; i < dayCount; i++) {
                if (hotelCnt[i] > 1){
                    d = i + 1;
                    warnWords = warnWords + " D" + d;
                }
            }
            warnWords = warnWords + "有两家以上的酒店，确定要保存吗？";
            if ( !confirm(warnWords) ){
                return ;
            }
        }
                //获取其它参数
                var startDate = $('#datetimepicker').val();
                var uid = $('.user').attr('data-id');
                //var uid = userId;
                var fromLocId = getQueryString('fromLocId');
                var ugcId = $('.ugcId').text();

                var timeArr = startDate.split('-');
                var t = new Date(timeArr[0],timeArr[1]-1,timeArr[2]);
                t.setDate(t.getDate() + dayCount -1);

                var year = t.getFullYear();
                var month = t.getMonth() + 1;
                var day = t.getDate();
                var endDate = year + '-';
                if(month < 10) endDate += '0';
                endDate += month + '-';
                if(day < 10) endDate += "0";
                endDate += day;

                var dataObj = new Object();
                dataObj.startDate = startDate;
                dataObj.endDate = endDate;
                dataObj.uid = uid;
                dataObj.fromLocId = fromLocId;
                dataObj.ugcId = ugcId;
                dataObj.spotArray = spotArray;
                console.log(dataObj);
                $.ajax({  //动画结束，写入数据
                        url    : '/plans/edit/post',
                        data   : dataObj,
                        dataType : "json",
                        type : 'POST',
                        success: function (msg) {
                            if (msg.code === 0) {
                                window.location.href="/plans/mine/";
                            } else {
                               alert('保存失败');
                            }
                        },
                        error  : function () {
                            alert('保存失败...');
                        }
                });
    });

    
    // 获得url参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]); return null;
    }
    
    
    
    searchInput.keypress(function (e) {
        // 获取搜索文本
        var searchText = searchInput.val() || arrLocName;
        //e.which是按键的值， 13 是回车键
        var key = e.which;
        // tagFlag = 1,搜景点
        if (key == 13) {
            // 将当前的tag的page计数置零
            pageArr[tagFlag] = 0;
            ajaxSearch(tagFlag, searchText);
        }
    });
    
    // 搜索并填充文本
    function ajaxSearch(tagFlag, text) {
         var requestUrl = ['/hotel/search', '/viewspot/search']; 

         var data = {
            searchText : text,
         };
         $.ajax({ 
                url    : requestUrl[tagFlag],
                data   : data,
                dataType : "json",           
                type : 'POST',
                
                success: function (msg) {  //成功返回后删除加载状态样式，插入dom
                    ajaxAddDom (msg, tagFlag);       
                },
                error  : function () {
                    return false;
                }
            });
    }
    
    /*
        搜索景点和酒店--添加DOM
    */
    function ajaxAddDom (msg, tagFlag) {
        
        var data = msg.result;
        var len = data.length;
        if (len === 0) {
            return;
        }
        if (tagFlag == 1) {
            tagViewspot.empty();
            viewspotData(data, tagViewspot);
        } else {
            tagHotel.empty();
            hotelData(data, tagHotel);    
        } 
    }
    
    
    /*
        从返回的数据中提取酒店数据
    */
    function hotelData(data, tagDom) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
                var temp = data[i];
                var content = new Object();

                content.src = temp.imageList[0];
                content.phone = temp.contact.phoneList ? temp.contact.phoneList[0] : '';
                content.address =temp.addr.addr;
                content.id = temp._id;
                content.rank = temp.ratings.starLevel;
                content.name = temp.name;
                content.price = temp.price;
                
                var dom = '<a><div><img src=' + content.src + ' width="213" height="144"></div><div style="display:none" class="id">' + content.id + '</div><div style="display:none" class="type">hotel</div><div class="value"><em class="ranking">' + content.rank + '星级</em><em class="price">￥' + content.price + '起</em></div><div class="hotel-name"><em>' + content.name + '</em></div><div class="phone"><i class="ico-phone"></i>' + content.phone + '</div><div class="addr"><i class="ico-addr"></i>' + content.address + '</div><i class="ico02 ico02-add"></i></a>';
                
                tagDom.append(dom);    
        }
    }
    
    /*
        从返回的数据中提取景点数据
    */
    function viewspotData(data, tagDom) {
        var len = data.length;
        for (var i = 0; i < len; i++) {
                var temp = data[i];
                var content = new Object();
                
                var taglen = temp.tags.length;
                var tags = '';
                for (var j = 0; j < taglen; j++) {
                    tags += temp.tags[j] + ' ';
                }
                
                content.tags = tags;
                content.src = temp.imageList[0];
                content.id = temp._id;
                content.name = temp.name;
                content.timeCost = temp.timeCost;
                
                var dom = '<a><div><img src=' + content.src + ' width="213" height="144"></div><div style="display:none" class="id">' + content.id + '</div><div style="display:none" class="type">vs</div><em class="spot-name">' + content.name + '</em><br><i class="ico01 ico01-good"></i>0.3<i class="ico01 ico01-sugg"></i>建议游玩' + content.timeCost + '小时<em class="label">' + content.tags + '</em><i class="ico02 ico02-add"></i></a>';

                tagDom.append(dom);
        }
    }
    
    
    /*
        ajax滚动加载
        分为两种情况：
        1. 搜索栏有输入信息，代表是特定的查找
        2. 搜索栏没有输入信息，代表是特定城市的景点或者酒店的信息
    */
    
    // 记录滚动加载是否结束
    var dataOver = false;
    var ajaxStatus = true;
    var requestUrl = ['/hotel/ajax/more', '/viewspot/ajax/more'];
            
    $(window).on("scroll", function () {
        var top = document.documentElement.scrollTop + document.body.scrollTop;
        var textheight = $(document).height();
        // 判断下拉菜单位置，加载更多数据        
        if ( textheight - top - $(window).height() <= 50  && !dataOver && ajaxStatus ) {
            ajaxStatus = false;           
            
            // 如果搜索输入框为空，则代表时按照地点来加载数据(景点和酒店）
            var searchText = searchInput.val() || arrLocName;                                    
            

            // 记录当前的page数
            pageArr[tagFlag] =  pageArr[tagFlag] + 1;
            
            // ajax的post数据
            var data = {
                searchText : searchText,
                page : pageArr[tagFlag],
            };
            
            // 显示缓冲图标
            if (!dataOver) {
                $('.more').show();
            }

            $.ajax({ 
                url    : requestUrl[tagFlag],
                data   : data,
                dataType : "json",           
                type : 'POST',
                
                success: function (msg) {  //成功返回后删除加载状态样式，插入dom
                    $('.more').hide();
                    ajaxAddMore(msg);       
                    ajaxStatus = true;                    
                },
                error  : function () {
                    return false;
                }
            });
        }
    });
    
    
    /*
        ajax动态添加DOM元素
        switch : 
                -- 0 用于选择主题和天数
                -- 1 用于ajax动态加载更多 
    */
    function ajaxAddMore (msg) {
        var data = msg.result;
        var len = data.length;
        
        if (len == 0) {
            if (!dataOver) {
                dataOver = true;
                // routeList.append("<h1 font='50px'>数据加载完了...</h1>");
            }
            return ;
        }
        
        // 添加新的DOM数据
        if (tagFlag == 1) {
            viewspotData(data, tagViewspot);
        } else {
            hotelData(data, tagHotel);    
        }                           
    }
    
    /*---end---*/
})
