$(function () {
    /*
     * timeLine 手风琴效果
     * */
    var timeLine = $('#timeLine'),
        timeLineList = $('#timeLine li');
    timeLine.on('click', 'li', function (e,type) {  //'type'--事件触发来自滚动条标识
        var self = $(this),
            subId = "#" + self.attr('data-for'),
            listDetailItemId="#" + self.attr('data-item'),
            suList,
            titleTxt,
            timelineDetailCon=$('.t-left');
        titleTxt=$(this).children('a').text();
        updataTitle(titleTxt);
        self.attr('data-status', 'active');
        self.find('a.btn02').addClass('btn02-c1');
        self.find('i.point').addClass('point-01');
        self.find('i.arr').addClass('arr-down').removeClass('arr-up');
        $(subId).show();
        suList=$(subId+' a');
        radioToggle(suList,'btn02-c1'); //子项单击高亮效果绑定
        if(type!=='istrigger'){   //手动点击时右侧滚动条联动效果
            timelineDetailCon.off('scroll');
            $('.t-left').animate({
                scrollTop: $(listDetailItemId).position().top
            },function(){
                timelineDetailCon.on('scroll',scrollAction);
            });
            //timelineDetailCon.on('scroll',scrollAction);
        }
        timeLineList.each(function (index) {  //隐藏非当前选中‘天数’的子项容器
            var dataFor = $(this).attr("data-for");
            if ( dataFor !== self.attr('data-for') && $(this).attr('data-status') === 'active' ) {
                var oldsubId = "#" + dataFor;
                $(oldsubId).hide();
                $(this).attr('data-status', '');
                $(this).find('a.btn02').removeClass('btn02-c1');
                $(this).find('i.point').removeClass('point-01');
                $(this).find('i.arr').addClass('arr-up').removeClass('arr-down');
            }
        })
    });
    
    
    radioToggle(timeLineList.eq(0).next().children(),'btn02-c1'); //左侧时间线首相展开初始化切换事件绑定
    /*
    * 时间线详细列表图片事件绑定，隐藏侧栏切换
    * */
    var timeLineSpotImg = $('.timeline-detail ul').find('img'),
        sider = $('.sider'),
        layer = $('.layer'),
        wheight = $(window).height();
    timeLineSpotImg.each(function () {
        $(this).on('click', function (e) {
            var requestUrl = $(this).attr('data-url');
            sider.css('height', wheight);
            layer.fadeIn("slow");
            sider.animate({
                right: 0
            }, 300, "swing", function () {
                $.ajax({  //动画结束，写入数据
                    url    : requestUrl,
                    data   : {},
                    success: function (msg) {
                        console.dir(msg) //请求成功后，写入dom,打开侧栏、遮罩
                    },
                    error  : function () {
                        console.log('error!!!')
                    }
                });
                layer.on('click', function (e) {   //动画结束，隐藏遮罩
                    sider.animate({
                        right: -600
                    }, 300, 'swing')
                    $(this).fadeOut("slow")
                })
            });
        })
    });
    var wHeight = $(window).height(),
        timelineDetailCon = $('.t-left');
    timelineDetailCon.css('height', wHeight - 100); //初始化时间线详细列表外围容器高度

    /*
    * 时间线项目、时间线详情列表项数据关联
    * */
    var timelineDetailList = $('.timeline-detail>ul'),//详情列表，按天
        timelineList = $('#timeLine>li'), //时间线项，按天
        timelineDetailListItem=$('.timeline-detail li'), //详情列表，按子项
        timelineListItem=$('#timeLine>div>a'); //时间线项，按子项，同上一一对应
    var itemArr = [];//按天项，滚动条位置
    timelineDetailList.each(function (index) {   //数据关联写入
        var self = $(this),
            Index = index,
            count = self.position().top,
            time=new Date().getTime();
        self.attr('data-position', count);
        self.attr('id', count+time);
        timelineList.eq(Index).attr('id', count);
        timelineList.eq(Index).attr('data-item', count+time);
        itemArr.push(count);
    })
    var subitemArr=[];  //按子项，滚动条位置
    timelineDetailListItem.each(function (index) {  //数据关联写入
        var self = $(this),
            Index = index,
            count = self.position().top,
            time=new Date().getTime();
        self.attr('data-position', '_'+count);
        self.attr('id', count+time);
        timelineListItem.eq(Index).attr('id', '_'+count);
        timelineListItem.eq(Index).attr('data-item', count+time);
        subitemArr.push(count);
    })

    timelineListItem.each(function(index){ //所有时间线子项点击事件绑定
        var detailItem;
        $(this).on('click',function(e,type){  //'type'--事件触发来自滚动条标识
            if(type!=='istrigger'){ //手动点击时右侧滚动条联动效果
                detailItem='#'+$(this).attr('data-item'),
                timelineDetailCon=$('.t-left');
                timelineDetailCon.off('scroll');
                console.log(true);
                timelineDetailCon.animate({
                    scrollTop: $(detailItem).position().top
                },function(){
                    timelineDetailCon.on('scroll',scrollAction);
                });
            }else{
                return false;
            }
        })
    });
    /*
    * 滚动条时间监听
    * */
    timelineDetailCon.on('scroll',scrollAction);
    function scrollAction(){
        var scrollTop = $(this).scrollTop() - 0,
            timelItemId ='#'+trigVal(scrollTop, itemArr),
            sutimelItemId ='#_'+trigVal(scrollTop, subitemArr);
        $(timelItemId).trigger('click','istrigger');//触发时间线‘天数’点击事件
        $(sutimelItemId).trigger('click','istrigger');//触发时间线‘天数’子项点击事件
    }
    /*
    * 判断滚动条滚动位置，返回触发值
    * */
    function trigVal(val, arr) {
        for ( var i in arr ) {
            if ( val >= arr[i] - 50 && val <= arr[i] + 50 ) return arr[i];
        }
    }
    /*
    * 模拟单选框高亮点击对象
    * */
    function radioToggle(lists,activeClass){
        lists.each(function(index){
            var Index=index;
            $(this).on('click',function(e){
                $(this).addClass(activeClass);
                lists.each(function(index){
                    if(index!==Index && $(this).hasClass(activeClass)){
                           $(this).removeClass(activeClass);
                    }
                })
            })
        })
    }
    function updataTitle(title){
        $('.d-title').text(title);
    }
    
    // 保存PDF
    function downloadPDF() {
      //
      
    }
})

$('a.pdf').click( function(e){
  var doc = new jsPDF();
  var requestUrl = $('b.requestUrl').text();
  $.ajax({  //动画结束，写入数据
      url    : requestUrl,
      data   : {},
      dataType : "json",           
      type : 'GET',
      success: function (result) {
        //console.dir(msg) //请求成功后，写入dom,打开侧栏、遮罩
        for (var i = 0; i < result.length; i++) {
          var dateCount = '第' + (i + 1) + '天';
          doc.text(20, 20 * (i+1), "第一天");
          var actv = result[i].actv;
          for (var j = 0; j < actv.length; j++) {
            var spot = actv[j];
            doc.text(20, 20 * (i + j + 2), "123");
          }  
        }
        
        //doc.addPage();
        //doc.text(20, 20, 'Do you like that?');
        doc.save('Test.pdf');        
      },
      error  : function () {
          console.log('error!!!')
      }
  });
  
});