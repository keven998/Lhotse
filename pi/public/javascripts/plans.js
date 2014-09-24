$(function () {

    /*
     * routeList
     * */
    var tab01 = $('#tab01'),
        tab02 = $('#tab02'),
        item01 = $('#item01'),
        item02 = $('#item02');
        
    tab01.on('click', function (e) {
        console.dir($(this))
        if ( !$(this).hasClass('item01-hover') ) {
            $(this).addClass('item01-hover').removeClass('item01-normal');
            tab02.removeClass('item02-hover').addClass('item02-normal');
            item01.show();
            item02.hide();
        } else {
            return false;
        }
    })
    
    tab02.on('click', function (e) {
        if ( !$(this).hasClass('item02-hover') ) {
            $(this).addClass('item02-hover').removeClass('item02-normal');
            tab01.removeClass('item01-hover').addClass('item01-normal');
            item02.show();
            item01.hide();
        } else {
            return false;
        }
    })    
    
    
    
    var routeList=$('.routelist'),
        sider=$('.sider'),
        layer=$('.layer'),
        wheight=$(window).height();
    /*
    * 将线路列表项的事件委托在外围容器上
    */
    routeList.on('click','a.c-img,h2,a.btn02-c1',function(e){
        var requestUrl = $(this).parents('li').attr('data-url');//假设单项的数据请求地址写在父级dom li中
        sider.css('height' , wheight);
        layer.show();
        sider.show(500,function(){
            $.ajax({
                url : requestUrl,
                data : {},
                success : function (msg) {
                    $("span.day span").text("全程 " + msg.details.days+ " 天");
                    $("span.cost span").text("人均 " + msg.details.budget[0] + "-" +msg.details.budget[1] + "元");
                    var tags = "旅途印象: ";
                    for (var i = 0; i < msg.details.tags.length-1; i++) {
                        tags += msg.details.tags[i] + ", ";
                    }
                    tags += msg.details.tags[i];
                    $("span.tags span").text(tags);
                    $("ul.l").empty();
                    for (var i = 0; i < msg.details.summary.length; i++) {
                        $("ul.l").append("<li><b class='date'>D" + (i+1) + "</b>" + msg.details.summary[i] + "</li>");
                    }
                    $(".c .routename").text(msg.details.title);
                    $(".c .moredesc").append(msg.details.moreDesc);
                    //请求成功后，写入dom,打开侧栏、遮罩
                    var noteList = $('#item02').children('ul'),
                        note, noteItem;
                    for (var i = 0; i < msg.notes.length; i++){
                        note = msg.notes[i];
                        noteList.append('<li><a class="n' + i + '"></a></li>');
                        noteItem = noteList.find('a.n'+ i);//在DOM中定位
                        noteItem.attr('href',note.sourceUrl);
                        noteItem.append('<img class="sider-userimg" src="/images/plans/user02.png">');
                        if (!note.authorAvator)
                            noteItem.find('img').attr('src',note.authorAvator);
                        noteItem.append('<h1 class="t1">' + note.title +'</h1>');
                        noteItem.append('<em class="time">' + '2014-10-01' + '</em>');//时间未提供
                        noteItem.append('<em><span class="au">' + note.authorName + '</span>发表</em>');
                        noteItem.append('<p class="txt">' + note.summary.substring(0,100) + "..." + '</p>');
                        noteItem.append('<p class="ico-g"><i class="ico01 ico01-eye"></i><b>浏览' + note.viewCnt + '</b></p>');
                        var source;
                        switch (msg.notes[0].source){
                            case 'baidu':
                                source = "来自百度旅游";
                                break;
                            case 'qyer':
                                source = "来自穷游网";
                                break;
                            case 'mafengwo':
                                source = "来自蚂蜂窝";
                                break;
                            default:
                                source = "";
                        }
                        noteItem.append('<p class="ico-g"><i class="ico01 ico01-source"></i><b>' + source + '</b></p>');
                    }
                },
                error : function () {
                    console.log('error!!!')
                }
            });
            layer.on('click',function(e){
                sider.hide(500);
                $(this).hide();
            });
        });
    });
    
    
    var playthemeList=$('.play-theme a'),
        outDaylist=$('.out-days a'),
        fromId = $('h1.t').attr('data-fromId'),
        arrId = $('h1.t').attr('data-arriveId');
    
    // page设置
    var page = 0;
    // 记录滚动加载是否结束
    var dataOver = false;
        
    radioCheck(playthemeList,'btn02-c1');
    radioCheck(outDaylist,'btn02-c1');
    
    // 检测是否有主题或者天数选中，激活ajax请求，动态生成DOM
    function radioCheck(lists,　activeClass)　{
        lists.each(function(index)　{
            var Index=index;
            $(this).on('click',function(e)　{
                $(this).addClass(activeClass);
                lists.each(function(index)　{
                     if(index!==Index && $(this).hasClass(activeClass))　{
                         $(this).removeClass(activeClass);
                     }
                })
                
                // 每次有主题和天数选中时，page要清零,dataOver要置为false
                page = 0;
                dataOver = false;
                // 读取主题tag 和 天数 days
                var tag = $('.play-theme').children('a.btn02-c1').text(),
                    days = $('.out-days').children('a.btn02-c1').attr('data-days');
                
                // ajax的post数据
                var selection = {
                    "tag" : tag,
                    "days" : days,
                    'fromId' : fromId,
                    'arrId' : arrId,
                    'page' : 0,
                };

                $.ajax({  
                    url    : '/route/selection',
                    data   : selection,
                    dataType : "json",           
                    type : 'POST',
                    
                    error  : function () {
                        alert('Error...');
                    },
                    
                    success: function (msg) {
                        var switchTag = 0;
                        ajaxAddDom(msg, switchTag); 
                    },
                });
            })
        })
    }
    
    /*
        ajax滚动加载
    */
    var ajaxStatus = true;    
    $(window).on("scroll", function () {
        var top = document.documentElement.scrollTop + document.body.scrollTop;
        var textheight = $(document).height();
        // 判断下拉菜单位置，加载更多数据        
        if ( textheight - top - $(window).height() <= 50  && !dataOver && ajaxStatus ) {
            ajaxStatus = false;           
            // 下面函数将要用到这四个参数
            var tag = $('.play-theme').children('a.btn02-c1').text(),
                days = $('.out-days').children('a.btn02-c1').attr('data-days');
                    
            // ajax的post数据
            var selection = {
                "tag" : tag,
                "days" : days,
                'fromId' : fromId,
                'arrId' : arrId,
                'page' : ++page,
            };

            // 显示缓冲图标
            if (!dataOver) {
                $('.more').show();
            }

            $.ajax({ 
                url    : '/route/selection',
                data   : selection,
                dataType : "json",           
                type : 'POST',
                
                success: function (msg) {  //成功返回后删除加载状态样式，插入dom
                    //console.dir(msg);
                    $('.more').hide();
                    ajaxAddDom (msg, 1);       
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
    function ajaxAddDom (msg, switchTag) {
        var result = msg.result;
        var len = result.length;
        
        if (len == 0) {
            if (switchTag == 0) {
                routeList.empty();
                routeList.append("<h1 font='50px'>没有数据...</h1>");
            } else {
                if (!dataOver) {
                    dataOver = true;
                    routeList.append("<h1 font='50px'>数据加载完了...</h1>");
                }
            }
            return ;
        }    
        
        if (switchTag == 0) {
            routeList.empty();
        }
        
        // 添加新的DOM数据
        for (var i = 0; i < len; i++) {
            var route = result[i];
            // 提取tag数据
            var taglen = route.tags.length;
            var tags = '';
            for (var j = 0; j < taglen; j++) {
                tags += route.tags[j] + ' ';
            }
            
            //alert(route._id);
            // 配置DOM元素                                
            var childElement = '<li data-url=/plans/detail/' + route._id + '><a class="c-img"><img src=' + route.imageList[0] + '></a><div class="c2"><h2>' + route.title + '</h2><p class="txt">' + (route.desc === undefined ? "" : route.desc.substring(0, 60)) + '... <a class="btn02 btn02-c1">点击更多</a></p><p class="ico-g fl w50"><i class="ico01 ico01-route"></i><b>线路特色- </b>' + tags + '</p><p class="ico-g fl w50"><i class="ico01 ico01-spot"></i><b>' + route.vsCnt + '个景点，共' + route.days + '天</b></p><p class="ico-g fl w50"><i class="ico01 ico01-cost"></i><b>预计花费 ￥' + route.budget[0] + '-￥' + route.budget[1] + '</b></p><a href=/plans/timeline/' + route._id + "?_fromLoc=" + fromId + ' class="btn02 btn02-c4">复制路线</a></div></li>';
            
            routeList.append(childElement);
        }   
    }
    
    /* ---end line--- */
})
