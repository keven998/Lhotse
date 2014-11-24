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
        '<span class="btn"  id="##-up" style="display: inline;" data-dir="up">总程</span>' +
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
            this.bindEvent();
            this.setWidth()
        },
        bindEvent  : function () {
            var me = this;
            //上下滚动
            this.dom.on("click", "li", function () {
                $(me.curLi).removeClass("current");
                $(this).addClass("current");
                me.curLi = this;
            });
            $(window).on("resize", function () {
                me.setWidth();
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
            var docw = $(document).width();
            var winw = $(window).width(),
                left = 0;
            this.dom.addClass("sideCatalogBgSmall");
            left = (docw - $(".pl_wrapper").width()) / 2;
            this.dom.css({"left": left});

        },
        getDom     : function (postfix) {
            return $("#" + this.id + "-" + postfix);
        },
        render     : function () {
            this.dom = $(this.getHtml());
            $(".pl_contents").append(this.dom);
        }
    };
    return window.timeList = timeList;
})();