function target_go_plan_list(arr_name, arr_poi_type){
    from_name = $('#from').val(),
    from_poi_type = $('#from').attr('poi_type'),
    href_plan_list(from_name, from_poi_type, arr_name, arr_poi_type);
}

function href_plan_list(from_name, from_poi_type, arr_name, arr_poi_type){
    url = '/route';

    if(from_name == ""){
        alert('请先填写起点。');
    }else if (from_poi_type == 'loc'){
        if (arr_poi_type == 'loc'){
            url += '/city/';
        }else if(arr_poi_type == 'vs'){
            url += '/include/';
        }
        url += '?arrName=' + arr_name + '&fromName=' + from_name;
        window.location.href = url;
    }else{
        alert('not support');
    }
}