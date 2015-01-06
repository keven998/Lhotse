/*
 * 右侧图片组图切换，封装成jq插件
 * */
(function ($) {
    $.fn.extend({
        qyerSlidImg: function (b) {
            var c = this;
            this.delegate(".qui-slide-ul >li > img", "click", function () {
                var b = $(this);
                c.find(".qui-slide-li_active").removeClass("qui-slide-li_active");
                c.find(".qui-slide-img").attr("src", b.attr("data-src"));
                b.addClass("qui-slide-li_active");
            });
            var d = this.find(".qui-slide-ul > li:eq(0) > img");
            if ( d.length ) {
                this.find(".qui-slide-img").attr("src", d.attr("data-src"));
                d.addClass("qui-slide-li_active");
            } else {
                return;
            }
        }
    });
})(jQuery);
