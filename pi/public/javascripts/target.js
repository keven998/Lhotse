// var NewLine = '\n';
// var temp = '';
// temp += '<style>' + NewLine;
// temp += '.ltQRCode{z-index:9;width:155px;height:189px;position:fixed;background:url(http://img1.lotour.com/home/QRCode.png) no-repeat;left:50%;margin-left:500px;bottom:250px;_background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://img1.lotour.com/home/QRCode.png\');_position:absolute;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)-250));}.ltQRCode a{position:absolute;width:12px;height:12px;background:url(http://img1.lotour.com/home/QRCls.png) no-repeat;_background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'http://img1.lotour.com/home/QRCls.png\');display:block;left:25px;bottom:3px}.ltQRCode a:hover{-webkit-transition-property:-webkit-transform;-webkit-transition-duration:1s;-moz-transition-property:-moz-transform;-moz-transition-duration:1s;-webkit-animation:rotate 2s linear infinite;-moz-animation:rotate 2s linear infinite;-o-animation:rotate 2s linear infinite;animation:rotate 2s linear infinite;}@-webkit-keyframes rotate{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-o-keyframes rotate{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(359deg)}}@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}@-webkit-keyframes rotate2{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-moz-keyframes rotate2{from{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(359deg)}}@-o-keyframes rotate2{from{-o-transform:rotate(0deg)}to{-o-transform:rotate(359deg)}}@keyframes rotate2{from{transform:rotate(0deg)}to{transform:rotate(359deg)}}' + NewLine;
// temp += '</style>' + NewLine;
// temp += '<div class="ltQRCode" id="ltQRCode">' + NewLine;
// temp += '<a href="javascript:void(0)" onclick="javascript:document.getElementById(\'ltQRCode\').style.display=\'none\'"></a>' + NewLine;
// temp += '</div>' + NewLine;
// $('body').append(temp);
          
// //Scroll to Top
// (function () {
//     var $backToTopTxt = "", $backToTopEle = $('<a title="回到顶部" class="gotop"></a>').appendTo($("body")).text($backToTopTxt).attr("title", $backToTopTxt).click(function () { $("html, body").animate({ scrollTop: 0 }, 120); }), $backToTopFun = function () {
//         var st = $(document).scrollTop(), winh = $(window).height();
//         (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
//     };
//     $(window).bind("scroll", $backToTopFun);
//     $(function () { $backToTopFun(); });
// })();


// $(function(){
//     //切换
//     $('.dMapSwch a').eq(0).click(function(){
//         $(this).addClass('cur').siblings().removeClass('cur');
//         $('.mapTabSpWord').removeClass('sphl');
//         $('.mapTabSpCn').addClass('sphl').find('.dMapLayer').addClass('sphl');
//         $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
//         return false
//     });
//     $('.dMapSwch a').eq(1).click(function(){
//         $(this).addClass('cur').siblings().removeClass('cur');
//         $('.mapTabSpCn').removeClass('sphl');
//         $('.mapTabSpWord').addClass('sphl').find('.dMapLayer').addClass('sphl');
//         $('.dMapName').removeClass('sphl')
//         $(window).resize()
//         return false;
//     });
//     $('.AsiaCn').hover(
//         function(){$('.Asia').unbind('click')},
//         function(){$('.Asia').click(
//             function(event){
//                 event.stopPropagation();
//                 var dataname = $(this).attr('data'),dataw = $('.dMapLayer[layer-data='+dataname+']').width(),datah = $('.dMapLayer[layer-data='+dataname+']').height();
//                 $('.dMapLayer[layer-data='+dataname+']').css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150).siblings('.dMapLayer').addClass('sphl');
//             return false
//         })    
//     });
//     $('.AsiaCn').click(function(){
//         $('.dMapSwch a').eq(1).click();
//         return false
//     })

//     //世界地图
//     $('.wordMap a').click(function(event){
//         event.stopPropagation();
//         var dataname = $(this).attr('data'),dataw = $('.dMapLayer[layer-data='+dataname+']').width(),datah = $('.dMapLayer[layer-data='+dataname+']').height();
//         $('.dMapLayer[layer-data='+dataname+']').css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
//       return false
//     })    
//     $(document).click(function (event) { $('.mapTabSpWord .dMapLayer').addClass('sphl')});
//     $('.destnMap-merc').vectorMap({
//         map: 'cn_merc_en',
//         backgroundColor: 'transparent',
//         zoomOnScroll: false,
//         regionsSelectable: true,
//         regionsSelectableOne: true,
//         regionStyle: {
//             initial: {
//                 fill: '#f7b552'
//             },
//             hover: {
//                 fill: '#ffffff', 
//                 "fill-opacity": 1,
//                 stroke: '#ec6909',
//                 "stroke-width": 2
//             },
//             selected: {
//                 fill: '#ffffff',
//                 stroke: '#ec6909',
//                 "stroke-width": 2
//             }
//         },
//         //鼠标移入省份区域，改变鼠标状态
//         onRegionOver: function(event, code){
// 　　 },
//     onRegionOut: function(event, code){},
//     onRegionClick: function(event, code){}
// });


// $('.dMapName h2').hover(
//     function(){
//         var cls = $(this).attr('class'),n=cls.slice(4,cls.length+1);
//         $("*[data-code='CN-"+ n +"']").trigger('mouseover');/*绑定事件*/
//     },function(){
//         var cls = $(this).attr('class'),n=cls.slice(4,cls.length+1);
//         $("*[data-code='CN-"+ n +"']").trigger('mouseout');/*绑定事件*/
//     }
// )
// $('.dMapName h2').click(function(event){
//     event.stopPropagation(); 
//     var cls = $(this).attr('class'),n=cls.slice(4,cls.length+1),dataw = $(".dMapbg"+n).width(),datah = $(".dMapbg"+n).height();
//     if(cls=='name99'){
//         $(".dMapbg99").css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
//     $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
//         return false
//     }else if(cls=='name95'){
//         $(".dMapbg95").css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
//     $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
//         return false
//     }
//     $("*[data-code='CN-"+ n +"']").mousedown().mouseup();
//     $(".dMapbg"+n).css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
//     })
//     $(document).click(function (event) { 
//         $('.mapTabSpCn .dMapLayer').addClass('sphl');
//         $('.jvectormap-region').attr({'fill':'#f7b552','stroke':'none','stroke-width':'0'})
//     });
//     $('.jvectormap-region').click(function(event){
//         event.stopPropagation(); 
//         var dataLayer = $(this).attr('data-code'),dataw = $('.'+dataLayer).width(),datah = $('.'+dataLayer).height();
//         $('.'+dataLayer).css({'width':'0px','height':'0px'}).toggleClass('sphl').animate({'width':dataw,'height':datah},150,function(){ $(this).css({overflow:'visible'})}).siblings('.dMapLayer').addClass('sphl')
//     })
//     $('.mapTabSpWord').addClass('sphl')
// });