/*
 * require  jquery,qyerSlidImg
 * 左侧弹窗
 * */
// infoBlock.render({url: dataUrl, mode: mode, id: id});


define(function(gmapControl) {
    var InfoBlock = function() {

    };

    InfoBlock.prototype = {
        currentBlock : null,
        isTrigger    : true,

        init         : function () {
            var me = this;
            this.map = $(".map");
            this.container = $(".pl_fixed_sidebar");
        },

        // getMapData: function() {
        //     var me = this;
        //     var data = $('.nodeRenderData').val();
        //     me.mapData = JSON.parse(data);
        //     for(var i in me.mapData) {
        //         for(var j in me.mapData[i]) {
        //             if(me.mapData[i][j].type == "airRoute" || me.mapData[i][j].type == "trainRoute")
        //                 me.mapData[i].splice(j, 1);
        //         }
        //     }
        //     console.log('getMapData and show:');
        //     console.log(me.mapData);
        // },

        getAjaxData  : function (url, data, callback) {
            var me = this;
            console.log(url);
            $.ajax({
                url    : url, //数据请求地址
                data   : data,
                dataType: "json",
                type : "post",
                success: function (data) {
                    if ( true ) {//验证返回数据
                        console.log('1');
                        callback && callback(data);
                    }
                },
                error  : function (msg) {
                    callback && callback('ajaxData');//Debug
                    //console.log('ajaxError!');
                }
            })
        },

        render    : function (data) {//侧栏渲染入口函数
            var me = this;
            if ( me.id == data.id ) { //重复点击则终止
                return;
            }
            me.url = data.url; //侧栏数据请求地址
            me.mode = data.mode; //侧栏模块标识
            me.id = data.id; //侧栏数据请求参数 id
            var postData = {
                type : me.mode,
                id   : me.id,
            };
            console.log(postData);
            me.getAjaxData(me.url, postData, function (data) {  //发起请求
                me.html(data.html);  //ajax回调函数
            })
        },

        html         : function (data) {//getAjaxData 请求结果回调
            //console.dir(data);//ajax请求返回的数据
            var me = this;
            me.hideMap();
            console.log(data);
            //var htmlstr = me.getTestHTML(me.mode);//测试数据
            me.container.append('<div class="info ' + me.mode + '">' + data + '</div>');
            me.show();
        },

        getTestHTML  : function (modename) { //拼接html测试数据
            var testHtml = '';
            switch ( modename ) {
                case 'traffic':
                    testHtml = [
                        '<div class="info_head"><span onclick="InfoBlock.hide(this)" class="info_close" data-bn-ipt="Planview-popup-trans-close">关闭</span></div>',
                        '<div class="info_content">',
                        '    <div class="info_memo">',
                        '        <div class="info_traffic">',
                        '            <div class="traffic_start"><h3>上海</h3>',
                        '                <p>09:00</p></div>',
                        '            <div class="traffic_tool"><p class="type"><span class="traffic_plane"></span></p>',
                        '                <p class="line"></p>',
                        '                <p class="price"></p></div>',
                        '            <div class="traffic_end"><h3>札幌</h3>',
                        '                <p>12:50</p></div>',
                        '        </div>',
                        '    </div>',
                        '</div>'];
                    break;
                case 'viewspot':
                case 'hotel':
                    testHtml = [
                        '<div class="info_head">',
                        '    <span class="info_close" onclick="InfoBlock.hide(this)">关闭</span>',
                        '    <span class="info_title">',
                        '         <a href="#">成吉思汗达摩本店</a>',
                        '     </span>',
                        '</div>',
                        '<div class="info_content">',
                        '<div class="scrollImg">',
                        '    <div class="qui-slide">',
                        '        <div class="qui-slide-img-wrap">',
                        '            <img class="qui-slide-img" src="/images/plans/detail/80.jpg" onerror="this.src=\'images/poi_80_80.png\'">',
                        '        </div>',
                        '        <ul class="qui-slide-ul">',
                        '            <li>',
                        '                <img src="/images/plans/detail/80.jpg" data-src="/images/plans/detail/80.jpg" onerror="this.src=\'/images/plans/detail/80.png\'" class="qui-slide-li_active">',
                        '            </li>',
                        '        </ul>',
                        '        <div class="qui-slide-clear"></div>',
                        '    </div>',
                        '</div>',
                        '<div class="info_star">',
                        '    <h3>评分 <span class="qui-icon star"></span>',
                        '        <span class="qui-icon star"></span>',
                        '        <span class="qui-icon star"></span>',
                        '        <span class="qui-icon star"></span>',
                        '        <span class="qui-icon empty"></span>',
                        '    </h3>',
                        '</div>',
                        '<div class="info_intro"><h3>简介</h3>',
                        '    <div class="texts">',
                        '        <p>',
                        '            〝达摩〞（だるま）是札幌一家有60年历史的老店，闻名全日本的成吉思汗烤肉就是源自于此。该店选用只出生一年的小羊肉，用祖传秘方将羊肉的腥膻味去除，只留下羊肉的鲜嫩甜美。将羔羊肉或成羊肉放在独特的山状成吉思汗锅上烤，就着以酱油为主的调料汁食用--这就是北海道的代表性料理，成吉思汗烤肉。',
                        '        </p>',
                        '    </div>',
                        '</div>',
                        '</div>'];
                    break;
            }
            return testHtml.join("");
        },

        hideMap      : function () {//隐藏地图块
            var me = this;
            this.map.animate({opacity: 0}, 300, function () {
                me.map.hide();
            })
        },

        showMap      : function () {//显示地图块
            this.map.show();
            this.map.animate({opacity: 1}, 300);
        },

        show         : function (fun) {//侧栏显示动画函数
            var me = this;
            this.w = this.container.width();
            me.currentBlock && me.hide();
            $("." + me.mode).css({left: me.w + "px", width: me.w - 3 + "px"})
            $("." + me.mode).animate({opacity: 1, left: 0}, 300, function () {
                me.currentBlock = this;
                if ( me.mode == "viewspot" || me.mode == "hotel" ) {
                    me.bindScrollImg();
                }
                fun && fun();
            })
            $("." + me.mode).find(".info_content").css({
                width       : "100%",
                overflowY   : "auto",
                "max-height": $(window).height() - 104 - 37
            })
            me.container.on("click", ".info_close", function () {
                me.showMap();
                me.hide();
            })
        },

        bindScrollImg: function () { //渲染完侧栏DOM后 实例化qyerSlidImg
            $(".qui-slide").qyerSlidImg();
        },

        hide         : function (dom) { //侧栏隐藏动画函数
            if ( dom ) {
                var node=dom.parentNode.parentNode;
                //console.dir(node);
                node.removeNode ? node.removeNode(true):node.remove();
                //node.remove();
                InfoBlock.showMap();
                return;
            }
            var me = this;
            this.w = this.container.width();
            $(me.currentBlock).animate({opacity: 0, left: me.w + "px"}, 300, function () {
                $(this).remove();
            })
        }
    };



    //InfoBlock.init();//初始化 获取侧栏容器 .pl_fixed_sidebar 地图容器 .map 等；
    //window.InfoBlock = InfoBlock;
    return {
        InfoBlock : InfoBlock
    };
});
