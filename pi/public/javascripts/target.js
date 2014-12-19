$(function(){
    //切换
    $('.dMapSwch a').eq(1).click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.mapTabSpWord').removeClass('sphl');
        $('.mapTabSpCn').addClass('sphl').find('.dMapLayer').addClass('sphl');
        $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
        return false
    });
    $('.dMapSwch a').eq(0).click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.mapTabSpCn').removeClass('sphl');
        $('.mapTabSpWord').addClass('sphl').find('.dMapLayer').addClass('sphl');
        $('.dMapName').removeClass('sphl')
        $(window).resize()
        return false;
    });
    $('.AsiaCn').hover(
        function(){$('.Asia').unbind('click')},
        function(){$('.Asia').click(
            function(event){
                event.stopPropagation();
                var dataname = $(this).attr('data'),dataw = $('.dMapLayer[layer-data='+dataname+']').width(),datah = $('.dMapLayer[layer-data='+dataname+']').height();
                $('.dMapLayer[layer-data='+dataname+']').css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150).siblings('.dMapLayer').addClass('sphl');
            return false
        })
    });
    $('.AsiaCn').click(function(){
        $('.dMapSwch a').eq(0).click();
        return false
    })

    //世界地图
    $('.wordMap a').click(function(event){
        event.stopPropagation();
        var dataname = $(this).attr('data'),dataw = $('.dMapLayer[layer-data='+dataname+']').width(),datah = $('.dMapLayer[layer-data='+dataname+']').height();
        $('.dMapLayer[layer-data='+dataname+']').css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
      return false
    })
    $(document).click(function (event) { $('.mapTabSpWord .dMapLayer').addClass('sphl')});
    $('.destnMap-merc').vectorMap({
        map: 'cn_merc_en',
        backgroundColor: 'transparent',
        zoomOnScroll: false,
        regionsSelectable: true,
        regionsSelectableOne: true,
        regionStyle: {
            initial: {
                fill: '#f7b552'
            },
            hover: {
                fill: '#ffffff',
                "fill-opacity": 1,
                stroke: '#ec6909',
                "stroke-width": 2
            },
            selected: {
                fill: '#ffffff',
                stroke: '#ec6909',
                "stroke-width": 2
            }
        },
        //鼠标移入省份区域，改变鼠标状态
        onRegionOver: function(event, code){
　　 },
    onRegionOut: function(event, code){},
    onRegionClick: function(event, code){}
});


$('.dMapName h2').hover(
    function(){
        var cls = $(this).attr('class'),n=cls.slice(4,cls.length+1);
        $("*[data-code='CN-"+ n +"']").trigger('mouseover');/*绑定事件*/
    },function(){
        var cls = $(this).attr('class'),n=cls.slice(4,cls.length+1);
        $("*[data-code='CN-"+ n +"']").trigger('mouseout');/*绑定事件*/
    }
)
$('.dMapName h2').click(function(event){
    event.stopPropagation();
    var cls = $(this).attr('class'),n=cls.slice(4,cls.length+1),dataw = $(".dMapbg"+n).width(),datah = $(".dMapbg"+n).height();
    if(cls=='name99'){
        $(".dMapbg99").css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
    $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
        return false
    }else if(cls=='name95'){
        $(".dMapbg95").css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
    $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
        return false
    }
    $("*[data-code='CN-"+ n +"']").mousedown().mouseup();
    $(".dMapbg"+n).css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
    })
    $(document).click(function (event) {
        $('.mapTabSpCn .dMapLayer').addClass('sphl');
        $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
    });
    $('.jvectormap-region').click(function(event){
        event.stopPropagation();
        var dataLayer = $(this).attr('data-code'),dataw = $('.'+dataLayer).width(),datah = $('.'+dataLayer).height();
        $('.'+dataLayer).css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
    })
    $('.mapTabSpWord').addClass('sphl')
});

function target_go_plan_list(arr_name, arr_poi_type){
    var from_name = $('#from').val(),
        from_poi_type = $('#from').attr('poi_type') || 'loc';
    href_plan_list(from_name, from_poi_type, arr_name, arr_poi_type);
}

/*
    loc : 城市
    vs : 景点
    province : 省份
*/
function href_plan_list(from_name, from_poi_type, arr_name, arr_poi_type){
    var url = '/route';

    if(from_name == ""){
        alert('请先填写起点。');
    }else if (from_poi_type == zone.type.locality){
        if (arr_poi_type == zone.type.locality){
            url += "?" + zone.type.locality + "=" + arr_name + '&fromName=' + from_name;
        }else if(arr_poi_type == zone.type.viewspot){
            url += "?" + zone.type.viewspot + "=" + arr_name + '&fromName=' + from_name;
        }
        window.location.href = url;
    }else{
        alert('not support');
    }
}