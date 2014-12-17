'use strict';

require.config({
    baseUrl: '/javascripts/',
    paths: {
        "googlemapApi": "lib/googlemap.api",
        "citySelector": "lib/cityselector",
        "idTabs": "lib/jquery.idTabs.min",
        "iCheck": "lib/icheck.min"
    }
});

require(['googlemapApi','citySelector','idTabs','iCheck'], function(GMaper) {

    var Travelpi = {},
        selectPanel = null;

    $(function () {
        container_initial();
        /*导航筛选器————点击空白处收起导航下拉项*/
        //效果不好，点击其它的"a"元素也不能收起
        var navLayers = $('.filter-nav>li .layer'),  //筛选器   筛选条件列表
            sortLayer = $('#sort + .layer'),    //排序    条件列表
            moreLayer = $('.ico-more-list + .layer');   //登录注册列表
        //$(document).on('click', '.g-bd,.g-hd,.filter-nav', function (e) {
        $(document).on('click', '.full-screen', function (e) {
            var target = e.target;
            if ( target.nodeName !== 'A' && target.nodeName !== 'I' && target.nodeName !== 'B' && target.nodeName !== 'LI' ) {
                //判定方式是触发的元素是否与列表中的元素类型一样...太泛了(除非其它地方都不用这些元素！)
                navLayers.each(function () {
                    if ( $(this).css('display') === 'block' ) {
                        $(this).hide('fast');
                        var tabSelect = $(this).parents('li').children('a');
                        tabSelect.children('i').removeClass('ico-arr02').addClass('ico-arr01');
                        // tabSelect.children('b').css('border-bottom','none');
                    }
                });


                //有很多个筛选器，只有一个排序列表和一个登录列表
                if ( sortLayer.css('display') === 'block' ) {
                    sortLayer.hide('fast');
                    sortLayer.parents('.t1').find('.ico').removeClass('ico-08').addClass('ico-07');
                }
                if ( moreLayer.css('display') === 'block' ) {
                    moreLayer.hide();
                }
            }
        })


        /*条件筛选————tab点击效果*/
        /********* Filter Select *********/
        var navList = $('.filter-nav>li>a');
        navList.each(function (index) {
            $(this).on('click', function () {
                var Index = index,
                    $this = $(this),
                    $thisParent = $this.parent();

                //下拉箭头的切换
                var icoClass = $this.children('i');
                if ( icoClass.hasClass('ico-arr01') ) {
                    icoClass.removeClass('ico-arr01').addClass('ico-arr02');
                    // $this.children('b').css('border-bottom', '3px solid #4fa7bd');
                } else {
                    icoClass.removeClass('ico-arr02').addClass('ico-arr01');
                    // $this.children('b').css('border-bottom', 'none');
                }

                //绑定下拉的收回事件,此处需要off ?         绑定了最后的last类(可点击的小三角)
                $thisParent.children('.layer').find('.list-last').on('click', function () {
                    $(this).parents('.layer').hide('fast');
                    icoClass.removeClass('ico-arr01').addClass('ico-arr02');
                    // $this.children('b').css('border-bottom', 'none');
                })

                //筛选条件列表下拉
                $thisParent.children('.layer').fadeToggle('fast');

                //下拉列表的回滚判定       二次点击筛选器时，判断是否是同一个筛选器,假如不是得处理自身
                navList.each(function (index) {
                    var $this = $(this),
                        $thisParent = $this.parent();
                    var Display = $thisParent.children('.layer').css('display');
                    if ( index !== Index && Display === 'block' ) {
                        $thisParent.children('.layer').hide('fast');
                        // $this.children('b').css('border-bottom', 'none');
                        $this.children('i').removeClass('ico-arr02').addClass('ico-arr01');
                    }
                })
            })
        })


        /*条件筛选按钮列表操作函数*/
        var travelPi = {
            selectListUpdate: function (selectItemId, value) {
                var value = value,
                    dataFrom = selectItemId,
                    selectListHtml,
                    selectListContent = $('.select-list');
                selectListHtml = '<a data-from="' + dataFrom + '" class="bluebg option">' + value + '<i class="btn-close2"></i></a>';
                selectListContent.append(selectListHtml);
                travelPi.selectListClose(dataFrom);
            },
            //close the filterList-item will make the selectList-item with the special value closed
            selectListRemove: function (value) {
                var value = value,
                    selectListContent = $('.select-list');
                selectListContent.find('a').each(function (index) {
                    if ( $(this).text() === value ) {
                        $(this).remove();
                    }
                })
            },
            //close the selectList-item will make the filterList-item with the special Id closed
            selectListClose : function (dataFrom) {
                var selectList = $('.select-list>a'),
                    dataFrom = dataFrom,
                    aDataFrom = [],
                    dataFromID;
                selectList.each(function () {
                    if ($(this).attr('data-from') === dataFrom){
                        $(this).on('click', function () {
                            dataFromID = '#' + dataFrom;
                            $(dataFromID).iCheck('uncheck');
                            $(this).remove();
                        })
                    }
                })
            }
        };


        $('input.cb').iCheck({
            checkboxClass: 'icheckbox_square-blue'
            // radioClass   : 'iradio_square-blue'
        });
        $('input.cb').on('ifChecked', function (e) {
            var selectItemId = $(this).attr('id');
            travelPi.selectListUpdate(selectItemId, $(this).attr('data-item'));
        }).on('ifUnchecked', function (e) {
            travelPi.selectListRemove($(this).attr('data-item'));
        });

        /*滑竿*/
        /*
        //原先在筛选条件中，选数字范围时使用(如价格范围)
        var Price_selectVal = 0,
            Strength_selectVal = 0,
            parentId,
            itemVal,
            itemValSelect,
            currentVal;
        $('.slider').slider({min: 0, max: 5, animate: true, value: 0});
        $('.slider').slider('pips');
        $('.slider').slider('float');
        $('.slider').on('slidechange', function (event, ui) {  //滑竿值改变时触发
                currentVal = ui.value;
                parentId = '#' + $(this).parent('.layer').attr('id');
                if ( currentVal !== 0 ) {
                    if ( parentId === '#ly04' ) {  //价格范围
                        itemVal = '价格范围：0~' + currentVal;
                        if ( Price_selectVal !== 0 ) {
                            itemValSelect = '价格范围：0~' + Price_selectVal;
                            travelPi.selectListRemove(itemValSelect);
                        }
                        dataItem.dataNavItem = 'ly04';
                        dataItem.selectItem = currentVal;
                        travelPi.selectListUpdate(dataItem, itemVal);
                        travelPi.selectListClose();
                        Price_selectVal = currentVal;
                        $(this).parents('.layer').hide('fast');
                        $(this).parents('li').find('.ico').removeClass('ico-02').addClass('ico-03');
                        $(this).parents('.layer').parent().children('a').css('border-bottom', '3px solid #111');
                    }
                    if ( parentId === '#ly05' ) {    //强度范围
                        itemVal = '强度范围：0~' + currentVal;
                        if ( Strength_selectVal !== 0 ) {
                            itemValSelect = '强度范围：0~' + Strength_selectVal;
                            travelPi.selectListRemove(itemValSelect);
                        }
                        dataItem.dataNavItem = 'ly05';
                        dataItem.selectItem = currentVal;
                        travelPi.selectListUpdate(dataItem, itemVal);
                        travelPi.selectListClose();
                        Strength_selectVal = currentVal;
                        $(this).parents('.layer').hide('fast');
                        $(this).parents('li').find('.ico').removeClass('ico-02').addClass('ico-03');
                        $(this).parents('.layer').parent().children('a').css('border-bottom', '3px solid #111');
                    }
                } else {
                    if ( parentId === '#ly04' )itemValSelect = '价格范围：0~' + Price_selectVal;
                    if ( parentId === '#ly05' )itemValSelect = '价格范围：0~' + Strength_selectVal;
                    travelPi.selectListRemove(itemValSelect);
                    $(this).parents('.layer').hide('fast');
                    $(this).parents('li').find('.ico').removeClass('ico-02').addClass('ico-03');
                    $(this).parents('.layer').parent().children('a').css('border-bottom', 'none');
                }
            }
        );
        */
        /********** Filter End ***********/


        /*列表显隐切换*/
        /********* Route DropLayer *********/
        var routeList = $('.routelist>li'),
            locked = false;

        function addTabNav($this){
            var tabNav =
                '<div class="drop_layer">' +
                   ' <ul class="tab_nav">' +
                        //<li><a href="#route-tab1">线路简介</a></li>
                        '<li><a href="#route-tab1">景点列表</a></li>' +
                        '<li><a href="#route-tab2">图片</a></li>' +
                        '<li><a href="#route-tab3">相关游记</a></li>' +
                        '<li><a id="route">更多>></a></li>' +
                        '<span class="nav_close" id="drop_close"><i class="btn-close3"></i></span>' +
                    '</ul>' +
                    '<div class="loading">' +
                        '<i class="ico02 ico02-loading"></i>' +
                        '<a class="btn"></a>' +
                    '</div>' +
                '</div>';
            $this.after(tabNav);
            return ;
        }
        routeList.each(function () {
            var $this = $(this);
            $this.on('click', function (e) {
                var target = e.target,
                    dropClassName = "drop_layer",
                    layerClass = "." + dropClassName,
                    tabUl = layerClass + ' ul';
                var requestUrl = "/route/layer/" + $(this).attr('data-id');
                if ( target.className !== 'fork ico-fork' ) {//排除‘复制路线’按钮事件，未改
                    //judge the next class and his data-id
                    if (! locked){
                        locked = true;
                        if ($this.next().hasClass(dropClassName)){
                            if ( $(layerClass).css('display') === 'none' ) {
                                $(layerClass).show('fast');
                                locked = false;
                            } else {
                                $(layerClass).hide(400);
                                locked = false;
                            }
                        }else{
                            $(layerClass).remove();
                            $('.slider_layer').remove();
                            addTabNav($this);
                            $.ajax({
                                url: requestUrl,
                                async: true,
                                type: "GET",
                                data: {},
                                success : function (msg) {
                                    $('.tab_nav').after(msg.dropLayerHtml);
                                    $('.loading').remove();

                                    //show the map @CK
                                    selectPanel.updateData(msg.mapView);

                                    $(tabUl).idTabs();//实例化列表内tab选项卡  =>  实现tab功能

                                    /*create the routedetail layer*/
                                    $this.parent('ul.routelist').append(msg.sliderLayerHtml);
                                    $('.moredesc').append(msg.moreDesc);
                                    $('#route').on('click',function(){
                                        var sliderLayer = $('.slider_layer');
                                        sliderLayer.show();

                                        //adjust the slider height
                                        $('.slider_layer').css('height',$('#map_inner').height());
                                        var sliderHdPadding = 30,
                                            sliderHdHeight = $('.slider_hd').height() + sliderHdPadding,
                                            sliderTabHeight = 31;
                                        $('.tab-c').css('height',$('#map_inner').height()-sliderHdHeight-sliderTabHeight);

                                        sliderLayer.animate({
                                            left: 0
                                        },500,"swing")

                                        //tab
                                        var tab01 = $('#tab01'),
                                            tab02 = $('#tab02'),
                                            item01 = $('#item01'),
                                            item02 = $('#item02');
                                        tab01.on('click', function (e) {
                                            if (item01.css('display') == 'none'){
                                                item01.show();
                                                item02.hide();
                                            } else {
                                                return false;
                                            }
                                        })
                                        tab02.on('click', function (e) {
                                            if (item02.css('display') == 'none'){
                                                item02.show();
                                                item01.hide();
                                            } else {
                                                return false;
                                            }
                                        })

                                        //fork
                                        $('.slider_layer').find('.fork').on('click', popLayer);

                                        $('#slider_close').on('click',function(){
                                            sliderLayer.animate({
                                                left: -650
                                            },500,"swing")
                                        })
                                    })
                                    $(layerClass).show('fast');

                                    //close the droplayer by the close btn
                                    //add the data-for to .close , for close the layer
                                    var closdBtn = $(layerClass).find('#drop_close');
                                    closdBtn.on('click', function (e) {
                                        $(layerClass).hide(400);
                                    })

                                    //图片滚动
                                    var id = function(el) {
                                        return document.getElementById(el);
                                    };

                                    var c = id('photo-list'),
                                        ul = id('scroll'),
                                        lis = ul.getElementsByTagName('li'),
                                        itemCount = lis.length,
                                        //width = lis[2].offsetWidth;//获得每个img容器的宽度 100+9+（1+2）*20
                                        width = 300,
                                        marginLeft = 315;
                                    ul.style.width = (width + 20) * itemCount + 'px';
                                    c.scrollLeft = marginLeft;
                                    $('#next').click(function(){
                                        if(c) {
                                            var marquee = function() {
                                                c.scrollLeft += 2;
                                                console.log(c.scrollLeft);
                                                if(c.scrollLeft % marginLeft <= 1){
                                                    //ul.append(ul.children('li')[0]);
                                                    ul.appendChild(ul.getElementsByTagName('li')[0]);
                                                    c.scrollLeft = marginLeft;
                                                    clearInterval(timer);
                                                }
                                            },
                                            speed = 1; //数值越大越慢，50ms
                                            ul.style.width = (marginLeft + 20) * itemCount + 'px'; //加载完后设置容器长度   !!!
                                            var timer = setInterval(marquee, speed);
                                        }
                                    })
                                    $('#prev').click(function(){
                                        if(c) {
                                            var marquee = function() {
                                                    c.scrollLeft -=2;
                                                    if(c.scrollLeft % marginLeft <= 1){
                                                        ul.insertBefore(lis[itemCount - 1],lis[0]);
                                                        c.scrollLeft = marginLeft;
                                                        clearInterval(timer);
                                                    }
                                                },
                                                speed = 5;
                                            ul.style.width = (marginLeft + 20) * itemCount + 'px';
                                            var timer = setInterval(marquee, speed);
                                        }
                                    })
                                    locked = false;
                                },
                                error : function () {
                                    console.log('error!!!');
                                    locked = false;
                                }
                            });
                        }
                    }
                }else{
                    //
                }
            })
        });
        /************ Drop End *************/


        //排序事件
        $('.sort').on('click',function(){
            if($(this).children('i').hasClass('ico-arr03')){
                $(this).children('i').removeClass('ico-arr03').addClass('ico-arr04');
            }
            else{
                $(this).children('i').removeClass('ico-arr04').addClass('ico-arr03');
            }
        })


        //复制路线-弹层
        /********* Fork poplayer *********/
        function getParamsFromRadio(flag, name){
            var elems = document.getElementsByName(name);
            for(var i in elems){
                if (elems[i].checked && elems[i].value!="none")
                    return (flag + "=" + elems[i].value + "&");
            }
            return "";
        }
        function getId(id){
            return typeof id === "string" ? document.getElementById(id) : id;
        }
        function $$(oParent, elem){
            return (oParent || document).getElementsByTagName(elem);
        }
        function $$$(oParent, sClass){
            var aElem = $$(oParent, '*');
            var aClass = [];
            var i = 0;
            for(i = 0;i < aElem.length;i++)
                if(aElem[i].className == sClass)
                    aClass.push(aElem[i]);
            return aClass;
        }
        function Alert(){
            this.initialize.apply(this, arguments);
        }
        Object.extend = function(destination, source){
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        };
        Alert.prototype = {
            initialize : function(obj, frame, onEnd){
                if(obj){
                    var _this = this;
                    this.obj = obj;
                    this.frame = frame;
                    this.oEve(onEnd);
                    this.oTitle = this.onEnd.title;
                    this.oContent = this.onEnd.content;
                    this.iWidth = this.onEnd.width;
                    this.iHeight = this.onEnd.height;
                    this.iTop = this.onEnd.top;
                    this.iLeft = this.onEnd.left;
                    this.iFixed = this.onEnd.fixed;
                    this.iClose = this.onEnd.close;
                    this.route_id = this.onEnd.route_id;
                    _this.create();
                    // this.obj.onclick = function(){_this.create(),_this.backg();};
                    // window.onresize = function(){_this.backg();};
                }
            },
            create : function(){
                this.oDiv = document.createElement('div');
                this.oAlert_backg = document.createElement('div');
                this.oAlert_frame = document.createElement('div');
                this.oTop_l = document.createElement('div');
                this.oTop_c = document.createElement('div');
                this.oTop_r = document.createElement('div');
                this.oCon = document.createElement('div');
                this.oCon_l = document.createElement('div');
                this.oCon_c = document.createElement('div');
                this.oCon_r = document.createElement('div');
                this.oBot_l = document.createElement('div');
                this.oBot_c = document.createElement('div');
                this.oBot_r = document.createElement('div');
                this.oDiv.id = this.frame;
                this.oAlert_backg.className = 'alert_backg';
                this.oAlert_frame.className = 'alert_frame';
                this.oTop_l.className = 'top_l';
                this.oTop_c.className = 'top_c';
                this.oTop_r.className = 'top_r';
                this.oCon.className = 'con';
                this.oCon_l.className = 'con_l';
                this.oCon_c.className = 'con_c';
                this.oCon_r.className = 'con_r';
                this.oBot_l.className = 'bot_l';
                this.oBot_c.className = 'bot_c';
                this.oBot_r.className = 'bot_r';
                document.body.appendChild(this.oDiv);
                this.box = getId(this.frame);
                this.box.appendChild(this.oAlert_backg);
                this.box.appendChild(this.oAlert_frame);
                this.oFra = $$$(this.box, 'alert_frame')[0];
                this.oFra.appendChild(this.oTop_l);
                this.oFra.appendChild(this.oTop_c);
                this.oFra.appendChild(this.oTop_r);
                this.oFra.appendChild(this.oCon);
                this.oFra.appendChild(this.oBot_l);
                this.oFra.appendChild(this.oBot_c);
                this.oFra.appendChild(this.oBot_r);
                this.oCone = $$$(this.box, 'con')[0];
                this.oCone.appendChild(this.oCon_l);
                this.oCone.appendChild(this.oCon_c);
                this.oCone.appendChild(this.oCon_r);
                this.tit = getId(this.frame);
                this.con = $$$(this.tit, 'con_c')[0];
                this.oAlert_tit = document.createElement('div');
                this.oAlert_con = document.createElement('div');
                this.oH2 = document.createElement('h2');
                this.oAlert_tit.className = 'alert_tit';
                this.oAlert_con.className = 'alert_con';
                if(this.oTitle != ""){
                    this.con.appendChild(this.oAlert_tit);
                    this.con.appendChild(this.oAlert_con);
                    this.oAlert_tit = $$$(this.tit, 'alert_tit')[0];
                    this.oH2.innerHTML = this.oTitle;
                    this.oAlert_tit.appendChild(this.oH2);
                }
                this.content();
                this.width();
                this.height();
                this.top();
                this.left();
                this.fixed();
                this.close();
                this.Top = this.oFra.offsetTop;
                this.oFra.style.top = (this.Top - 40) +'px';
                this.oFra.style.marginTop = 0;
                this.sMove(this.oFra, {top:this.Top, opacity:100});
                this.sMove(this.oBackg, {opacity:50});
            },
            oEve: function(onEnd){
                this.onEnd = {};
                Object.extend(this.onEnd, onEnd || {});
            },
            content : function(){
                this.conent = $$$(this.tit, 'alert_con')[0];
                this.conent == undefined ? this.con.innerHTML = this.oContent : this.conent.innerHTML = this.oContent;
                this.oButton = $$(this.tit, 'button');
                var i = 0;
                var _this = this;
                for(i = 0;i < this.oButton.length;i++){
                    this.oButton[i].onclick = function(){
                        if ($(this).hasClass('mkplan')){
                            var params = "?",
                                flags = ["trafficFlag", "hotelFlag", "restaurantFlag"],
                                names = ["traffic", "hotel", "restaurant"];
                            for (var index in flags){
                                params += getParamsFromRadio(flags[index], names[index]);
                            }
                            window.location.assign("/plans/detail/" + _this.route_id + params);
                        }else if ($(this).hasClass('skip')){
                            window.location.assign("/plans/detail/" + _this.route_id);
                        }
                        _this.em.onclick();
                    };
                }
            },
            width : function(){
                this.oBackg = $$$(this.tit, 'alert_backg')[0];
                this.oFrame = $$$(this.tit, 'alert_frame')[0];
                this.oCon = $$$(this.oFrame, 'con')[0];
                this.oTop_c = $$$(this.oFrame, 'top_c')[0];
                this.oCon_c = $$$(this.oFrame, 'con_c')[0];
                this.oBot_c = $$$(this.oFrame, 'bot_c')[0];
                this.oAlert_tit = $$$(this.oFrame, 'alert_tit')[0];
                this.oAlert_con = $$$(this.oFrame, 'alert_con')[0];
                if(this.iWidth != ""){
                    this.oFrame.style.width = parseInt(this.iWidth) +'px';
                    this.oFrame.style.marginLeft = -parseInt(this.iWidth) / 2 +'px';
                    this.oTop_c.style.width = parseInt(this.iWidth) - 10 +'px';
                    this.oCon_c.style.width = parseInt(this.iWidth) - 10 +'px';
                    this.oBot_c.style.width = parseInt(this.iWidth) - 10 +'px';
                    this.oAlert_tit.style.width = parseInt(this.iWidth) - 12 +'px';
                    this.oAlert_con.style.width = parseInt(this.iWidth) - 10 +'px';
                }
            },
            height : function(){
                if(this.iHeight != ""){
                    this.oFrame.style.height = parseInt(this.iHeight) +'px';
                    this.oFrame.style.marginTop = -parseInt(this.iHeight) / 2 +'px';
                    this.oCon.style.height = parseInt(this.iHeight) - 10 +'px';
                    this.oAlert_con.style.height = parseInt(this.iHeight) - 40 +'px';
                }
            },
            top : function(){
                if(this.iTop != "")this.oFrame.style.top = parseInt(this.iTop) +'px',this.oFrame.style.marginTop = 0;
            },
            left : function(){
                if(this.iLeft != "")this.oFrame.style.left = parseInt(this.iLeft) +'px',this.oFrame.style.marginLeft = 0;
            },
            backg : function(){
                this.oScrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                this.oScrollWidth = document.documentElement.scrollWidth || document.body.scrollWidth;
                this.oBackg.style.width = document.documentElement.clientWidth + (this.oScrollWidth - document.documentElement.clientWidth) +'px';
                this.oBackg.style.height = document.documentElement.clientHeight + (this.oScrollHeight - document.documentElement.clientHeight) +'px';
            },
            fixed : function(){
                if(this.iFixed == "fixed"){
                    var _this = this;
                    this.oFrame.style.position = 'fixed';
                    this.oAlert_tit.style.cursor = 'move';
                    this.oAlert_tit.onmousedown = function(e){
                        var _thisE = this;
                        this.oEvent = e || event;
                        this.X = this.oEvent.clientX - _this.oFrame.offsetLeft;
                        this.Y = this.oEvent.clientY - _this.oFrame.offsetTop;
                        document.onmousemove = function(e){
                            this.oEvent = e || event;
                            this.L = this.oEvent.clientX - _thisE.X;
                            this.T = this.oEvent.clientY - _thisE.Y;
                            if(this.L < 0){
                                this.L = 0;
                            }else if(this.L > document.documentElement.clientWidth - _this.oFrame.offsetWidth){
                                this.L = document.documentElement.clientWidth - _this.oFrame.offsetWidth
                            }
                            if(this.T < 0){
                                this.T = 0;
                            }else if(this.T > document.documentElement.clientHeight - _this.oFrame.offsetHeight){
                                this.T = document.documentElement.clientHeight - _this.oFrame.offsetHeight;
                            }
                            _this.oFrame.style.left = this.L + 'px';
                            _this.oFrame.style.top = this.T + 'px';
                            _this.oFrame.style.margin = 0;
                            return false;
                        }
                        document.onmouseup = function(){
                            document.onmouseup = null;
                            document.onmousemove = null;
                        };
                        return false;

                    };
                    if(this.oFrame){
                        if(!-[1,] && !window.XMLHttpRequest){
                            document.documentElement.style.textOverflow = "ellipsis";
                            this.oFrame.style.position = "absolute";
                            this.oFrame.style.setExpression("top", "eval(documentElement.scrollTop + " + this.oFrame.offsetTop + ') + "px"');
                        }
                    }
                }
            },
            close : function(){
                if(this.iClose == "close" && this.oTitle != ""){
                    var _this = this;
                    this.clos = $$$(this.tit, 'alert_tit')[0];
                    var oEm = document.createElement('em');
                    this.clos.appendChild(oEm);
                    this.em = $$(this.tit, 'em')[0];
                    this.em.onmouseover = function(){_this.em.className = 'hove';};
                    this.em.onmouseout = function(){_this.em.className = '';};
                    this.em.onclick = function(){
                        _this.sMove(_this.oFra, {top:(_this.Top - 40), opacity:0},function(){
                            document.body.removeChild(_this.em.parentNode.parentNode.parentNode.parentNode.parentNode);
                        });
                        _this.sMove(_this.oBackg, {opacity:0});
                    }
                }
            },
            getStyle : function(obj, attr){
                return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
            },
            sMove : function(obj, json, onEnd){
                var _this = this;
                clearInterval(obj.timer);
                obj.timer = setInterval(function(){
                    _this.dMove(obj, json, onEnd);
                },30);
            },
            dMove : function(obj, json, onEnd){
                this.attr = '';
                this.bStop = true;

                for(this.attr in json){
                    this.iCur = 0;
                    this.attr == 'opacity' ? this.iCur = parseInt(parseFloat(this.getStyle(obj, this.attr))*100) : this.iCur = parseInt(this.getStyle(obj, this.attr));
                    this.iSpeed = (json[this.attr] - this.iCur) / 7;
                    this.iSpeed = this.iSpeed > 0 ? Math.ceil(this.iSpeed) : Math.floor(this.iSpeed);
                    if(json[this.attr] != this.iCur)this.bStop = false;
                    if(this.attr == 'opacity'){
                        obj.style.filter = 'alpha(opacity:' + (this.iCur + this.iSpeed) +')';
                        obj.style.opacity = (this.iCur + this.iSpeed ) / 100;
                    }else{
                        obj.style[this.attr] = this.iCur + this.iSpeed + 'px';
                    }
                }
                if(this.bStop){
                    clearInterval(obj.timer);
                    if(onEnd)onEnd();
                }
            }
        };
        function popLayer(){
            new Alert($(this), 'box', {
                title : '规划包含',
                content :
                    '<div class="plan_option">'+
                        '<form>'+
                            '<div>'+
                                '<b>交通方式</b>'+
                                '<input type="radio" name="traffic" value="air" id="air" checked/><label for="air">飞机</label>'+
                                '<input type="radio" name="traffic" value="train" id="train"/><label for="train">火车</label>'+
                                // '<input type="radio" name="traffic" value="car" id="car"/><label for="car">汽车</label>'+
                                '<input type="radio" name="traffic" value="none" id="tnone"/><label for="tnone">无</label>'+
                            '</div>'+
                            '<div>'+
                                '<b>酒店</b>'+
                                '<input type="radio" name="hotel" value="star" id="star" checked/><label for="star">星级酒店</label>'+
                                '<input type="radio" name="hotel" value="budget" id="budget"/><label for="budget">经济型酒店</label>'+
                                '<input type="radio" name="hotel" value="youthandfolk" id="youthandfolk"/><label for="youthandfolk">青旅或民俗</label>'+
                                // '<input type="radio" name="hotel" value="youth" id="youth"/><label for="youth">青年旅社</label>'+
                                // '<input type="radio" name="hotel" value="folk" id="folk"/><label for="folk">民俗酒店</label>'+
                                '<input type="radio" name="hotel" value="none" id="hnone"/><label for="hnone">无</label>'+
                            '</div>'+
                            '<div>'+
                                '<b>美食</b>'+
                                '<input type="radio" name="restaurant" value="reputation" id="reputation" checked/><label for="reputation">口碑最好</label>'+
                                '<input type="radio" name="restaurant" value="special" id="special"/><label for="special">特色小吃</label>'+
                                // '<input type="radio" name="restaurant" value="wellknow" id="wellknow"/><label for="wellknow">连锁名店</label>'+
                                '<input type="radio" name="restaurant" value="none" id="rnone"/><label for="rnone">无</label>'+
                            '</div>'+
                            // '<div>'+
                            //     '<b>娱乐</b>'+
                            //     '<input type="radio" name="enjoy" value="bar" id="bar" checked/><label for="bar">酒吧</label>'+
                            //     '<input type="radio" name="enjoy" value="activity" id="activity"/><label for="activity">活动</label>'+
                            //     '<input type="radio" name="enjoy" value="none" id="enone"/><label for="enone">无</label>'+
                            // '</div>'+
                        '</form>'+
                    '</div>'+
                    '<div class="but">'+
                        '<button class="mkplan" title="点击此处，帮您一键规划行程！"></button>'+
                        '<button class="skip" title="谢谢，我不需要任何帮忙！"></button>'+
                    '</div>',
                width : '650px',
                height : '320px',
                top : '',
                left : '',
                fixed : 'fixed',    //the default is "relative"
                close : 'close',
                route_id : $(this).attr('data-id')
            });
        }
        $('.fork').each(function(){
            $(this).on('click', popLayer)
        })
        /*********** Fork End ************/

        /********* City Selector *********/
        var fromWrap = new Vcity.CitySelector({input:'fromWrap'});
        // var arrive = new Vcity.CitySelector({input:'arrive'});
        /*********** City End ************/

    })


    /************map************/

    function mapDaySelectPanel(routeData, mapContainerDomId) {
        var cthis = this,
            routeData = routeData || null,
            latLngArray = [],
            idArray = [],
            currentSelect = 0,
            mapControl = null,
            mapObject = null,
            mapContainerDomId = mapContainerDomId,
            currentRouteId = '';

        cthis.getCurrentIndex = function() {
            return currentSelect;
        };

        cthis.setCurrentIndex = function() {
            // TODO
        };

        cthis.init = function() {
            cthis.mapInitial();
            if (routeData) {
                cthis.setIdArray();
                cthis.addMarker();
                cthis.addSelectOptiontab();
            }
        };

        this.setIdArray = function() {
            for (var dayIndex in routeData) {
                var oneDaySpots = routeData[dayIndex];
                for (var spotIndex in oneDaySpots) {
                    idArray.push(oneDaySpots[spotIndex].id);
                }
            }
        };

        cthis.mapInitial = function() {
            mapControl = new GMaper.GMaper({});
            var lat = '',
                lng = '';
                //116.403874,39.921087
            if (!routeData) {
                lat = '27.441219';
                lng = '111.75401';
            } else {
                routeData.length && routeData[0].length
                && routeData[0][0].lng && routeData[0][0].lat
                && (lat = routeData[0][0].lng) && (lng = routeData[0][0].lat);
            }
            mapControl.init({
                mapInner: mapContainerDomId,
                lng: lng,
                lat: lat,
            });
            mapObject = mapControl.getMap();
            mapObject.setZoom(4);
        };

        cthis.addSelectOptiontab = function() {
            var selectPanelDiv = document.createElement('div'),
                selectDom = document.createElement('select'),
                totalDay = routeData.length;

            selectPanelDiv.index = 1;
            selectDom.name = "selectPanel";
            selectDom.id = "J_selectPanel";

            for (var i = 0; i <= totalDay; i++) {
                var option = document.createElement('option');
                if (0 === i) {
                    option.innerHTML = '全程';
                }else {
                    option.innerHTML = '第' + i + '天';
                }
                option.value = i;
                selectDom.appendChild(option);
            };
            selectPanelDiv.appendChild(selectDom);
            mapObject.controls[google.maps.ControlPosition.TOP_RIGHT].push(selectPanelDiv);
            if (routeData) {
                cthis.setFitView(0);
            }

            google.maps.event.addDomListener(selectDom, 'change', function() {
                var index = $('#J_selectPanel option:selected').val();
                currentSelect = index;
                cthis.drawRoute(index);
            });
        };

        cthis.addMarker = function() {
            var indexInAll = 0;
            for (var dayIndex in routeData) {
                var oneDayData = routeData[dayIndex],
                    tempMarkerArray = [];
                for (var index in oneDayData) {
                    indexInAll++;
                    var spot = oneDayData[index],
                        marker = new google.maps.LatLng(spot.lat, spot.lng);
                    tempMarkerArray.push(marker);
                    spot.indexInAll = indexInAll;
                    spot = cthis.addHTML(spot);
                    mapControl.addMarker(spot, function(){})
                }
                latLngArray.push(tempMarkerArray);
            }
        };

        cthis.drawRoute = function(index) {
            mapControl.clearRoute();
            if (0 == index) {
                cthis.showAllMarker();
            }else {
                cthis.showOneDay(index);
                mapControl.drawDriveRoute(routeData[index - 1], null, function() {});
            }
            cthis.setFitView(index);
        };

        cthis.setFitView = function(index) {
            var bound = new google.maps.LatLngBounds();
            if (0 == index ) {
                for(var dayIndex in latLngArray) {
                    var oneDayData = latLngArray[dayIndex];
                    for (var j in oneDayData) {
                        bound.extend(oneDayData[j]);
                    }
                }
            }else {
                var selectMarkers = latLngArray[index - 1];
                for (var j in selectMarkers) {
                    bound.extend(selectMarkers[j]);
                }
            }
            mapObject.fitBounds(bound);
        };

        cthis.showOneDay = function(index) {
            for (var j in idArray) {
                var id = idArray[j];
                mapControl.hideMarker(id);
            }
            var selectDayData = routeData[index - 1];
            for (var spotIndex in selectDayData) {
                mapControl.showMarker(selectDayData[spotIndex].id);
            }
        };

        cthis.showAllMarker = function() {
            for (var j in idArray) {
                var id = idArray[j];
                mapControl.showMarker(id);
            }
        };

        cthis.addHTML = function(spot) {
            var id = spot.id,
                name = spot.name,
                indexInAll = spot.indexInAll,
                markerHtmlElements = [];

            markerHtmlElements.push('<a class="map_marker" id="' + id + '" href="javascript:;" title="' + name + '">');
            markerHtmlElements.push("\t<i>" + indexInAll + "</i>");
            markerHtmlElements.push("\t<em>" + name + "</em>");
            markerHtmlElements.push("</a>");
            spot.markerHtml = markerHtmlElements.join("");
            return spot;
        };

        cthis.updateData = function(data) {
            routeData = data;
            latLngArray = [];
            idArray = [];
            currentSelect = 0;
            cthis.init();

        }
    }


    function main() {
        selectPanel = new mapDaySelectPanel(null, "map_inner");
        selectPanel.init();
    }
    main();

    /**set the width/height of container,including map,routelist**/
    function container_initial(){
        var wHeight = $(window).height(),
            wWidth = $(window).width(),
            hdHeight = $('.hd').height(),
            searchHeight = 70,
            //searchHeight = $('.bg-blue').height(),    the 'search' div has the padding that's not in .height()
            filternavHeight = 46,
            selectListHeight = $('.select-list').height(),
            gapHeight = 51,
            routeListWidth = $('.routelist').width();
        $('#map_inner').css('width',wWidth - routeListWidth);
        $('#map_inner').css('height',wHeight - hdHeight - searchHeight);
        $('.routelist').css('height',wHeight - hdHeight - searchHeight - filternavHeight - selectListHeight - gapHeight);

        $(window).resize(function(){
            var wWidth = $(window).width();
            $('#map_inner').css('width',wWidth - routeListWidth);
        })
    }


});
