$(function () {
    var imgs=$('.imgs');
    function start($this){
        var objX,
            objY,
            imgC=$this,
            addC=$('.add'),
            img=$this.find('div').html(),
            title=$this.find('.spot-name').text();
        objX=addC.offset().left-imgC.offset().left+150+"px";
        objY=addC.offset().top-imgC.offset().top+"px";
        var $appmt=$("<span class=box>"+img+"</span>");
        $this.append($appmt);
        var imgobj=$(".box");
        imgobj.animate({
            top:objY,
            left:objX
        },1000,function(){
            clear(title)
        });
    }

    function clear(title){
        $('.box').remove();
        var itemHtml='<li>'+title+'<i class="ico01 ico01-close"></i></li>';
        $('.edit-list').eq($('.edit-list').length-1).append(itemHtml);
        removeBind()
    }
    imgs.on('click','a',function(e){
        if($('.edit-list').length>0){
            start($(this));
        }else{
            alert('请先添加一天!')
        }
    });
    function removeBind(){
        editList=$('.edit-list li');
        editList.each(function(index){
            if($(this).hasClass('driver')){
                $(this).find('.ico01-close').on('click',function(e){
                    $(this).parents('.edit-list').remove();
                })
            }else{
                $(this).find('.ico01-close').on('click',function(e){
                    $(this).parents('li').remove()
                })
            }
        });
    }
    removeBind();
    var addBtn=$('.add'),
        cur_day=1;
    addBtn.on('click',function(e){
        var listC='<ul class="edit-list" data-day="'+cur_day+'">' +
            '<li class="driver">' +
            '<i class="ico01-d">D'+cur_day+'</i>' +
            '<i class="ico01 ico01-close"></i>' +
            '</li>' +
            '</ul>';
        $('.t-left').append(listC);
        cur_day++;
        removeBind()
    })
})