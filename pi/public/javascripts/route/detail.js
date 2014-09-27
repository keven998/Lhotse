$(function () {
    /*
    * routeList
    * */
    var tab01=$('#tab01'),
        tab02=$('#tab02'),
        item01=$('#item01'),
        item02=$('#item02');
    tab01.on('click',function(e){
        console.dir($(this))
        if(!$(this).hasClass('item01-hover')){
            $(this).addClass('item01-hover').removeClass('item01-normal');
            tab02.removeClass('item02-hover').addClass('item02-normal');
            item01.show();
            item02.hide();
        }else{
            return false;
        }
    })
    tab02.on('click',function(e){
        if(!$(this).hasClass('item02-hover')){
            $(this).addClass('item02-hover').removeClass('item02-normal');
            tab01.removeClass('item01-hover').addClass('item01-normal');
            item02.show();
            item01.hide();
        }else{
            return false;
        }
    })

    item02.find('li').click(function(){
        location.href = $(this).attr("data-url");
    });
})
