// 路线编辑，保存时的操作
$('a.btn02.btn02-c4').click(function () {
    //$('.edit-list')[0].children[1].children[1].innerText  
    var dayList = $('.edit-list');
    var dayCount = dayList.length;
    var spotArray = new Array();
    
    for (var i = 0; i < dayCount; i++) {
        var daySpot = dayList[i];
        var spotList = daySpot.children;
        var spotCount = spotList.length;
        
        var oneDaySpot = new Array();
        // 从第一个元素开始
        for (var j = 1; j < spotCount; j++) {
            var spotObj = new Object();
            var spot = spotList[j];
            var name = spot.innerText;
            var itemId = spot.children[1].innerText;
            var type = spot.children[2].innerText;
            
            // 添加景点和酒店
            spotObj['itemId'] = itemId;
            spotObj['type'] = type;
            oneDaySpot.push(spotObj); 
        }
        spotArray.push(oneDaySpot);
    }
    
    //获取其它参数
    var startDate = $('#datetimepicker').val();
    var uid = '5409b6dde4b043c0eff098fe';       // should get from cookies
    var fromLocId = getQueryString('fromLocId');
    var ugcId = $('.ugcId').text();
        
    var timeArr = startDate.split('-');
    var t = new Date(timeArr[0],timeArr[1]-1,timeArr[2]);   
    t.setDate(t.getDate() + dayCount -1);
    
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var day = t.getDate();
    var endDate = year + '-';
    if(month < 10) endDate += '0';
    endDate += month + '-';
    if(day < 10) endDate += "0";
    endDate += day;
    
    var dataObj = new Object();
    dataObj.startDate = startDate;
    dataObj.endDate = endDate; 
    dataObj.uid = uid;
    dataObj.fromLocId = fromLocId;
    dataObj.ugcId = ugcId;
    dataObj.spotArray = spotArray;
    
    console.log(dataObj);
    $.ajax({  //动画结束，写入数据
            url    : '/plans/edit/post',
            data   : dataObj,
            dataType : "json",           
            type : 'POST',
            success: function (msg) {
                if (msg.code == 0) {
                    alert('保存成功');
                } else {
                   alert('保存失败'); 
                }
                            
            },
            error  : function () {
                alert('保存失败');
            }
    });
});


// 获得url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    }
