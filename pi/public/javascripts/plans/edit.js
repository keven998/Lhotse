$(function () {
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
        timepicker:false,
        lang:'ch',
        format:'Y-m-d'
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
                console.dir(ui.item);
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
            //  添加title
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
                console.dir(ui.item);
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
})



