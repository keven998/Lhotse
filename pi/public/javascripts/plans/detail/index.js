(function () {
    //$('.scrollImg').qyerSlidImg();//右侧图片组图切换效果，即调用qyerSlidImg插件
    var sliderbar = new sliderBar();//实例化SliderBar 对象
    sliderbar.init(); //初始化
    new timeList({//实例化timeList组件
        "data": [
            {
                "day"   : 'D1',
                "anchor": 'day1',
                "name"  : '上海浦东新区,札幌'
            },
            {
                "day"   : 'D2',
                "anchor": 'day2',
                "name"  : '札幌,登别'
            }
        ]
    });

    /*
    * 左侧列表条目事件绑定
    * */
    $(".day_list").on("click",'li', function () {
        var mode = $(this).attr("data-mode"), id = $(this).attr("data-id");
        var dataUrl;//侧栏数据请求地址
        switch ( mode ) {
            case 'traffic':
                dataUrl = '/traffic.php'
                break;
            case 'poi' :
                dataUrl = '/poi.php'
                break;
            case 'hotel':
                dataUrl = '/hotel.php'
                break;
        }
        InfoBlock.render({url: dataUrl, mode: mode, id: id});//siderBarBlock.js ——InfoBlock 对象
    })
    var daylistitem=$('.day_item');
    var timelistitem=$('.sideCatalog-list li');
    var itemArr = [];
    daylistitem.each(function (index) {
        var self = $(this),
            Index = index,
            count = parseInt(self.position().top+500),
            h=self.height(),
            item={};
        //console.log(h);
        self.attr('data-position', count);
        timelistitem.eq(Index).attr('id', count);
        item={
            "pos":count,
            "height":h
        };
        itemArr.push(item);
    });
    $(window).on('scroll',scrollAction);
    function scrollAction(){
        var scrollTop = $(this).scrollTop() - 0,
            timelistId ='#'+trigVal(scrollTop, itemArr);
        //console.log(scrollTop);
        $(timelistId).trigger('click',[true]);//触发时间线‘天数’点击事件
    }
    /*
     * 判断滚动条滚动位置，返回触发值
     * */
    function trigVal(val, arr) {
        var item;
        //console.dir(arr)
        for ( var i in arr ) {
            item=arr[i];
            if ( val >= item.pos-50 && val <= item.pos+item.height-50 ) return item.pos;
            //if ( val === item.pos|| val === item.pos+item.height ) return item.pos;
        }
    }
})();

