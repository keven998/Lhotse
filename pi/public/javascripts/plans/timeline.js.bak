$(function () {
    /*
     * timeLine 手风琴效果
     * */
    var timeLine = $('#timeLine'),
        timeLimeList = $('#timeLine li');
    timeLine.on('click', 'li', function (e,type) {
        var self = $(this),
            subId = "#" + self.attr('data-for'),
            listDetailItemId="#" + self.attr('data-item');
        self.attr('data-status', 'active');
        self.find('a.btn02').addClass('btn02-c1');
        self.find('i.point').addClass('point-01');
        self.find('i.arr').addClass('arr-down').removeClass('arr-up');
        $(subId).show();
        if(type!=='istrigger'){
            $('.t-left').animate({
                scrollTop: $(listDetailItemId).position().top
            });
        }
        timeLimeList.each(function (index) {
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
    })
    var timeLineSpotImg = $('.timeline-detail ul').find('img'),
        sider = $('.sider'),
        layer = $('.layer'),
        wheight = $(window).height();
    timeLineSpotImg.each(function () {
        $(this).on('click', function (e) {
            var requestUrl = $(this).attr('data-url');
            console.dir(requestUrl);
            sider.css('height', wheight);
            layer.show();
            sider.show(500, function () {
                $.ajax({
                    url    : requestUrl,
                    data   : {},
                    success: function (msg) {
                        console.dir(msg); //请求成功后，写入dom,打开侧栏、遮罩
                        //alert(msg.result.name);
                        $('div').children('h3.t3').text(msg.result.name);
                        $('div.left').children('img').attr('src', msg.result.imageList[0]);
                    },
                    error  : function () {
                        console.log('error!!!')
                    }
                });
                layer.on('click', function (e) {
                    sider.hide(500);
                    $(this).hide()
                })
            });
        })
    })
    var wHeight = $(window).height(),
        timelineDetailCon = $('.t-left');
    timelineDetailCon.css('height', wHeight - 100);
    var timelineDetailList = $('.timeline-detail>ul'),
        timelineList = $('#timeLine>li');
    var itemArr = [];
    timelineDetailList.each(function (index) {
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

    timelineDetailCon.on('scroll',scrollAction);
    function scrollAction(){
        var scrollTop = $(this).scrollTop() - 0;
        var timelItemId ='#'+trigVal(scrollTop, itemArr);
        $(timelItemId).trigger('click','istrigger')
    }
    function trigVal(val, arr) {
        for ( var i in arr ) {
            if ( val >= arr[i] - 50 && val <= arr[i] + 50 ) return arr[i];
        }
    }
})
