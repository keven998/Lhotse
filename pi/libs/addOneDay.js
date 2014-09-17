//月份
var ma = [['01','03','05','07','08','10'],['04','06','09','11']]; 

//判断数组a是否存在在元素n 
function check(n,a) { 
    for(var i = 0,len = a.length;i < len;i++) { 
        if(a[i] == n) { 
            return true; 
    } 
} 
    return false; 
} 

//闰?年? 
function isLeap(y) { 
    return ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) ? true : false; 
} 

//实现加减f：'1'加，'0'减 
function addOneDay(o) { 
    var d = o.split('-'); 
    var l = isLeap(d[0]); 
    if((check(d[1],ma[0]) && (d[2] == '31')) || (check(d[1],ma[1]) && (d[2] == '30')) || 
        (d[1] == '02' && d[2] == '28' && !l) || (d[1] == '02' && d[2] == '29' && l)) { 
    
        return d[0] + '-' + ((d[1] * 1 + 1) < 10 ? '0' + (d[1] * 1 + 1) : (d[1] * 1 + 1)) + '-01'; 
    } else if(d[1] == '12' && d[2] == '31') { 
    
        return (d[0] * 1 + 1) + '-' + '01-01'; 
    } else { 
    
        return d[0] + '-' + d[1] + '-' + ((d[2] * 1 + 1) < 10 ? '0' + (d[2] * 1 + 1) : (d[2] * 1 + 1)); 
    } 
}
module.exports = addOneDay;
//var tt = '2000-02-29';
//var s = trans(tt);
//console.log(s);
