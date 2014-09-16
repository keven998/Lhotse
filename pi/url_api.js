var urlApi = {
  // 域名地址
  apiHost : 'http://api.lvxingpai.cn',
  
  hotRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee610114e189763fce3",
  mustgoRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee810114e189763fce6",
  newestRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783acf",
  recommondRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783ca6",
  routeDetail : 'http://api.lvxingpai.cn/web/plans/PLANID',
  
  //热门城市，热门景点
  hotCities : '/explore?showDetails=1&pageSize=8&loc=1',
  hotViews  : '/web/poi/view-spots/explore?page=0&pageSize=8',
  
  //落地页面
  routePageDetail : '/web/plans/ROUTEID',
  
  // 根据现有城市名字查询城市ID
  searchCityIdByName : "http://api.lvxingpai.com/geo/localities/search?keyword=", 
  
  viewspot : {
    detail : '/web/poi/view-spots/SPOTID',
  },
  
  ugc : {
    display : '/web/ugc-plans/UGCID',
    // 有待扩充
    timeline : '/web/ugc-plans/templates/TEMPLATES?fromLoc=_fromLoc',
    // 暂时不能保存路线，所以用查询某个模板路线的数据代替
    edit : '/web/plans/TEMPLATES',
  },
  
  //mine页面，根据用户ID获取我的计划列表
    myPlans: '/web/ugc-plans/users/USERID',
};
module.exports = urlApi;
