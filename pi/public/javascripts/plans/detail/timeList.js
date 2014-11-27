(function () {
    function timeList(opt) {
        this.init(opt);
    }

    timeList.prototype = {
        id         : "sideCatalog",
        className  : "sideCatalog",
        data       : [],
        htmlTpl    : '<div class="%%" id="##">' +
        '<div class="%%-btn %%-up">' +
        '<span class="navi_btn"  id="##-up" style="display: inline;" data-dir="up">总程</span>' +
        '</div>' +
        '<div class="%%-content-wrap">' +
        '<div class="%%-content" id="##-plist">' +
        '<ul class="%%-list" id="##-list">__DataList__</ul>' +
        '</div>' +
        '</div>' +
        '</div>',
        step       : 84,
        actionClass: "action",
        curLi      : null,
        init       : function (opt) {
            $.extend(this, opt);
            this.render();
            this.setWidth();
            this.bindEvent();
        },
        bindEvent  : function () {
            var me = this;
            //上下滚动
            this.dom.on("click", "li", function (e, flag) {
                //console.log(flag);
                $(me.curLi).removeClass("current");
                $(this).addClass("current");
                me.curLi = this;
                $(window).trigger('click');
            });
            $(window).on("scroll", function (evt) {
                 me.reset();
            })
            $(window).on("resize", function () {
                me.reset();
            })
        },
        getDataList: function () {
            var outstr = [], tmp;
            for ( var i = 0; i < this.data.length; i++ ) {
                tmp = this.data[i];
                outstr.push('<li><a href="#' + tmp.anchor + '" title="' + tmp.name + '"><span class="day">' + tmp.day + '</span><span class="name">' + tmp.name + '</span></a></li>')
            }
            return outstr.join("");
        },
        getHtml    : function () {
            var daylist = this.getDataList();
            return this.htmlTpl.replace(/%%/ig, this.className).replace(/##/ig, this.id).replace(/__DataList__/ig, daylist);
        },
        setWidth   : function () {
            this.dom.addClass("sideCatalogBgSmall");
            this.dom.css({
                position:'absolute',
                left:'-65px',
                top:'30px'
            });

        },
        getDom     : function (postfix) {
            return $("#" + this.id + "-" + postfix);
        },
        render     : function () {
            this.dom = $(this.getHtml());
            $(".pl_contents").append(this.dom);
        },
        "reset":function(){
            var st=$(window).scrollTop()-0;
            var docw = $(document).width();
            var left = (docw - $(".pl_wrapper").width()) / 2;
            //console.log(st);
            if(st>=450){
                this.dom.css({
                    position:'fixed',
                    left:left,
                    top:'100px'
                });
            }else{
                this.dom.css({
                    position:'absolute',
                    left:'-65px',
                    top:'30px'
                });
            }
        }
    };
    return window.timeList = timeList;
})();