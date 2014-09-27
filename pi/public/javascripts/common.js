$(function () {
    /* ---- BEGIN: login layer ---- */
    var topHd = $('#top'),
        lgLayer = $('.lg-layer'),
        layer = $('.layer');
        
    topHd.on('click','a.login',function(e){
        lgLayer.show(500);
        layer.show();
        lgLayer.show(500,function(){ 
            $.ajax({
              
            }) 
            layer.on('click',function(e){
                lgLayer.hide(500);
                $(this).hide();
            })
        });
    })
    /* ---- END: login layer ---- */
})

/* ---- BEGIN: suggestion ---- */
function select_from(input, poi_type){
    $('#from').val(input);
    $('#from').attr('poi_type', poi_type);
    $("#suggestion_from").empty();
    $("#suggestion_from").hide();
}

function select_to(input, poi_type){
    $('#arrive').val(input);
    $('#arrive').attr('poi_type', poi_type);
    $("#suggestion_to").empty();
    $("#suggestion_to").hide();
}

function suggestion_to(input){
    var slug = 'to';
    suggestion(slug, input);
}

function suggestion_from(input){
    var slug = 'from';
    suggestion(slug, input);
}

function suggestion(slug, input){
    $.ajax({
        url: "/suggestion?type=" + slug +"&input="+input,
        cache: false,
        success: function(result){
            var html = '';
            var obj = result;

            if(obj.length == 0){
                html += '很遗憾，没有找到相关内容～<br>';
            }else{
                for(var k=0;k<obj.length;k++){
                    html += "<a onclick='select_" + slug + "(\"" + obj[k].name + "\", \""+obj[k].type+"\")'>" + obj[k].name + "</a><br>";
                }
            }
            $("#suggestion_"+slug).css("display","block");
            $("#suggestion_"+slug).empty();
            $("#suggestion_"+slug).append(html);
        }
    });
}

function go_plan_list(){
    var arr_name = $('#arrive').val(),
        arr_poi_type = $('#arrive').attr('poi_type'),
        from_name = $('#from').val(),
        from_poi_type = $('#from').attr('poi_type'),
        url = '/route';

    if (from_poi_type == 'loc'){
        if (arr_poi_type == 'loc'){
            url += '/city/';
        }else if(arr_poi_type == 'loc'){
            url += '/include/';
        }
        url += '?arrNme=' + arr_name + '&fromName' + from_name;
        window.location.href = url;
    }else{
        alert('not support');
    }
}

/* ---- END: suggestion ---- */
