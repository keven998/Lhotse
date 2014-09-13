// 点击确认时，POST数据
//function postEditedRoute() {
//  alert('1');
  $('a.btn02.btn02-c4').click(function () {
    var data = {
        "uid" : "5401802ee4b08a6f6761038d",
        "fromLoc" : "53aa9a6410114e3fd4783937",
        "title" : "山东印象",
        "startDate" : "2014-09-06 00:00:00+0800",
        "action" : "upsert",
        "templateId" : "53f480cc10114e58c9ee49b0",
        "_id" : "540602d7e4b047dda25a2e65",
        "trafficBudget" : 251,
        "seq" : "ba1895a124a71db114a17edf3f6303b27ab5e2ab",
        "timestamp" : "1409680089.944104",
        "viewBudget" : 70,
        "budget" : [
          1200,
          3100
        ],
        "endDate" : "2014-09-08 00:00:00+0800",
        "stayBudget" : 900,
       
        "details" : [
          {
            "st" : "2014-09-06 00:00:00+0800",
            "type" : "vs",
            "itemId" : "53f3260610114e3ba6a58109"
          },
          {
            "st" : "2014-09-06 00:01:00+0800",
            "type" : "vs",
            "itemId" : "53f30e6710114e377228a7ed"
          },
          {
            "st" : "2014-09-06 00:02:00+0800",
            "type" : "vs",
            "itemId" : "53f30ca710114e376de5b24e"
          },
          {
            "st" : "2014-09-06 00:03:00+0800",
            "type" : "vs",
            "itemId" : "53f30d1110114e377228a44e"
          },
          {
            "st" : "2014-09-07 00:00:00+0800",
            "type" : "vs",
            "itemId" : "53f30fd510114e376de5bae8"
          },
          {
            "st" : "2014-09-08 00:00:00+0800",
            "type" : "vs",
            "itemId" : "53f311d510114e377228b1b3"
          },
          {
            "itemId" : "53b0546210114e051426e684",
            "st" : "2014-09-05 00:00:00+0800",
            "type" : "hotel"
          },
          {
            "itemId" : "53b0546210114e051426e684",
            "st" : "2014-09-06 00:00:00+0800",
            "type" : "hotel"
          },
          {
            "itemId" : "53b0548810114e051426f4f8",
            "st" : "2014-09-07 00:00:00+0800",
            "type" : "hotel"
          },
          {
            "type" : "traffic",
            "ts" : "2014-09-05 18:20:00+0800",
            "itemId" : "53aaa96b10114e41c5c8d0f3",
            "st" : "2014-09-05 18:20:00+0800",
            "subType" : "airport"
          },
          {
            "type" : "traffic",
            "st" : "2014-09-05 18:21:00+0800",
            "itemId" : "53aac80210114e46de5e6ed5",
            "arrStop" : "53aaa96e10114e41c5c8d101",
            "depStop" : "53aaa96b10114e41c5c8d0f3",
            "subType" : "airRoute"
          },
          {
            "type" : "traffic",
            "ts" : "2014-09-05 19:40:00+0800",
            "itemId" : "53aaa96e10114e41c5c8d101",
            "st" : "2014-09-05 19:40:00+0800",
            "subType" : "airport"
          }
        ],
        
        "v" : "1.1.0"
      }
      
  $.ajax({  //动画结束，写入数据
          url    : '/plans/edit/post',
          data   : data,
          dataType : "json",           
          type : 'GET',
          success: function (msg) {
              console.dir(msg) //请求成功后，写入dom,打开侧栏、遮罩
          },
          error  : function () {
              console.log('error!!!')
          }
      });
  });
//}
