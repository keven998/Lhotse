var page_id = page_var.id;
var page_path = page_var.path;

/* load css */
loadCss(page_path, page_id);

function loadCss(page_path, page_id) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = '/stylesheets/' + page_path + page_id + '.css';
    document.getElementsByTagName("head")[0].appendChild(link);
}

/* load js */
requirejs.config({
    baseUrl: '/javascripts/',
    paths: {
        //"Mustache": "lib/jquery.mustache"
    },
});

requirejs(
    [
        'common',
        page_path + page_id
    ], function(page_id) {
});
