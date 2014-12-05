/*
 * 右侧栏根据滚动条设置位置效果封装对象；
 * */
define(function () {
    var sliderBar = function () {
    };
    sliderBar.prototype = {
        init           : function () {
            this.dom = $(".pl_sidebar");
            this.maxHeight = $(".pl_day_list").height() - 30;
            this.dom.css("height", this.maxHeight);
            this.scrollDom = this.dom.find(".pl_fixed_sidebar");
            this.fixHeight = $(".pl_fixed_menu_box").height();
            this.bindEvent();
        }, bindEvent   : function () {
            var me = this, top, disTop;
            me.fireScroll();
            $(window).on("scroll", function (evt) {
                me.fireScroll();
            })
        }, fireScroll  : function () {
            var me = this, top, disTop;
            top = me.dom.offset().top;
            disTop = me.fixHeight + me.getScrollTop() - top;
            if ( disTop + 30 + me.getHeight() >= me.maxHeight ) {
                me.scrollDom.css("top", me.maxHeight - me.getHeight());
                return;
            }
            if ( disTop > 0 ) {
                me.curTop = disTop + 30;
                me.scrollDom.css("top", me.curTop);
            } else {
                me.scrollDom.css("top", 0)
            }
            me.scrollDom.css("min-height",$(window).height() - 104);
        }, getScrollTop: function () {
            return $(window).scrollTop();
        }, getHeight   : function () {
            var infos = this.dom.find(".info"), maxH = 0;
            for ( var i = 0; i < infos.length; i++ ) {
                if ( $(infos[i]).css("display") != "none" ) {
                    maxH = Math.max($(infos[i]).height(), maxH);
                }
            }
            return maxH + 2;
        }, reset       : function () {
            this.fireScroll();
        }
    };
    //window.sliderBar = sliderBar;
    return {
        sliderBar: sliderBar,
    };
});

