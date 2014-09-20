/*
    tagFlag 标志当前tag
    0：酒店
    1：景点
*/
var tagFlag = 1;

$(function () {
    // tab切换
    var tab01=$('#tab01'),
        tab02=$('#tab02'),
        item01=$('#item01'),
        item02=$('#item02');
    
    tab01.click(function(){
        // tag置位 : 景点
        tagFlag = 1;
        if(!$(this).hasClass('item01-hover')){
            $(this).addClass('item01-hover').removeClass('item01-normal');
            tab02.removeClass('item02-hover').addClass('item02-normal');
            item02.hide();
            item01.show();
        }else{
            return false;
        }
    })
    
    tab02.click(function(){
        // tag置位 : 酒店
        tagFlag = 0;
        if(!$(this).hasClass('item02-hover')){
            $(this).addClass('item02-hover').removeClass('item02-normal');
            tab01.removeClass('item01-hover').addClass('item01-normal');
            $(this).addClass('item01-hover').removeClass('item01-normal');
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
     * 添加景点飞行轨迹开始回调函数
     * */
    function start($this) {
        var objX,
            objY,
            imgC = $this,
            // 是否选中某一天
            addC = $('.edit-list .active'),
            img = $this.find('div').html(),
            // 作为clear函数的参数
            title = $this.find('.spot-name').text();
            id = $this.find('.id').text();
            type = $this.find('.type').text();
        
        if(addC.length<1) {
             alert('请在左侧选择添加到哪一天！');
            return false;
        };
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
            if ( $(this).hasClass('driver') ) {
                $(this).find('.ico01-close').off('click');
                $(this).find('.ico01-close').on('click', function (e) {
                    var self=$(this);
                    if ( confirm('确定删除整天行程？') ){
                        $(this).parents('.edit-list').remove();//删除一天的所有已添加行程
                        resetDaysort();//重置天数排序
                    }
                })
            } else {
                $(this).find('.ico01-close').off('click');
                $(this).find('.ico01-close').on('click', function (e) {
                    var self=$(this);
                    if ( confirm('确定删除该行程？') ){
                        $(this).parents('li').remove()
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
                var childList=$(this).parent().children('li');
                if($(this).hasClass('active')){
                     $(this).removeClass('active');
                    childList.each(function(index){
                        if(index!==0){
                            $(this).animate({height:0},200,'swing');
                        }
                    })
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
                        $(this).removeClass('active')
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
    $('a.btn02.btn02-c4').click(function () {
        //$('.edit-list')[0].children[1].children[1].innerText  
        var dayList = $('.edit-list');
        var dayCount = dayList.length;
        var spotArray = new Array();
        
        for (var i = 0; i < dayCount; i++) {
            var daySpot = dayList[i];
            var spotList = daySpot.children;
            var spotCount = spotList.length;
            
            var oneDaySpot = new Array();
            // 从第一个元素开始
            for (var j = 1; j < spotCount; j++) {
                var spotObj = new Object();
                var spot = spotList[j];
                var name = spot.innerText;
                var itemId = spot.children[1].innerText;
                var type = spot.children[2].innerText;
                
                // 添加景点和酒店
                spotObj['itemId'] = itemId;
                spotObj['type'] = type;
                oneDaySpot.push(spotObj); 
            }
            spotArray.push(oneDaySpot);
        }
        
        //获取其它参数
        var startDate = $('#datetimepicker').val();
        var uid = $('.user .b1').attr('data-id');
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

        $.ajax({  //动画结束，写入数据
                url    : '/plans/edit/post',
                data   : dataObj,
                dataType : "json",           
                type : 'POST',
                success: function (msg) {
                    if (msg.code == 0) {
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
        if (r != null) return unescape(r[2]); return null;
    }
    
    
    // 景点&酒店搜索
    var searchInput = $(".s-input");
    var tagViewspot = $("#item01");
    var tagHotel = $("#item02");
    searchInput.keypress(function (e) {
        // 获取搜索文本
        var searchText = searchInput.val();
        //e.which是按键的值， 13 是回车键
        var key = e.which;
        // tagFlag = 1,搜景点
        if (key == 13) {
            ajaxSearch(tagFlag, searchText);
        }
    });
    
    // 搜索并填充文本
    function ajaxSearch(tagFlag, text) {
         var requestUrl = ['/hotel/search', '/viewspot/search']; 
         var data = {
            searchText : text,
         }
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
        if (len == 0) {
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
    */
    // page设置
    var page = 0;
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
            
            var searchText = searchInput.val();                                    
            
            // ajax的post数据
            var data = {
                searchText : searchText,
                page : ++page,
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
                    console.dir(msg);
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
                routeList.append("<h1 font='50px'>数据加载完了...</h1>");
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
