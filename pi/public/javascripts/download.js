$(function(){
    var new_element1 = document.createElement("script"),
        new_element2 = document.createElement("script"),
        new_element3 = document.createElement("script"),
        new_element4 = document.createElement("script");

    new_element1.setAttribute("type","text/javascript");
    new_element1.setAttribute("src","/javascripts/download/jquery.min_v1.0.js");
    new_element2.setAttribute("type","text/javascript");
    new_element2.setAttribute("src","http://code.jquery.com/jquery-migrate-1.1.1.js");//jquery关于window的部分函数修改，导致cycle出错，所以要这个
    new_element3.setAttribute("type","text/javascript");
    new_element3.setAttribute("src","/javascripts/download/jquery.cycle_v1.0.js");
    new_element4.setAttribute("type","text/javascript");
    new_element4.setAttribute("src","/javascripts/download/slider.js");

    document.body.appendChild(new_element1);
    document.body.appendChild(new_element2);
    document.body.appendChild(new_element3);
    document.body.appendChild(new_element4);
})
