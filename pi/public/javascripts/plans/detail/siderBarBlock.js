/*
 * require  jquery,qyerSlidImg
 * 左侧弹窗
 * */
// infoBlock.render({url: dataUrl, mode: mode, id: id});


define(function(gmapControl) {
    function InfoBlock() {

    };

    InfoBlock.prototype = {
        currentBlock : null,
        isTrigger    : true,

        init         : function () {
            var me = this;
            this.map = $(".map");
            this.container = $(".pl_fixed_sidebar");
        },

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
                        callback && callback(data);
                    }
                },
                error  : function (msg) {
                    callback && callback('ajaxData');//Debug
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
            me.getAjaxData(me.url, postData, function (data) {  //发起请求
                me.html(data.html);  //ajax回调函数
            })
        },

        html         : function (data) {
            var me = this;
            me.hideMap();
            me.container.append('<div class="info ' + me.mode + '">' + data + '</div>');
            me.show();
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
            var me = this;
            if ( dom ) {
                var node=dom.parentNode.parentNode;
                //console.dir(node);
                node.removeNode ? node.removeNode(true):node.remove();
                //node.remove();
                me.showMap();
                return;
            }

            this.w = this.container.width();
            $(me.currentBlock).animate({opacity: 0, left: me.w + "px"}, 300, function () {
                $(this).remove();
            })
        }
    };

    return {
        leftSiderBar : InfoBlock
    };
});
