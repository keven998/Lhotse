var urlApi = {
  // 域名地址
  apiHost : 'http://api.lvxingpai.cn',
  
  hotRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee610114e189763fce3",
  mustgoRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee810114e189763fce6",
  newestRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783acf",
  recommondRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783ca6",
  routeDetail : 'http://api.lvxingpai.cn/web/plans/PLANID',
  
  // 根据现有城市名字查询城市ID
  searchCityIdByName : "http://api.lvxingpai.com/geo/localities/search?keyword=", 
  
  viewspot : {
    detail : '/web/poi/view-spots/SPOTID',
  },
  
  
  ugc : {
    display: '/web/ugc-plans/UGCID',
    // 有待扩充
    timeline: '/web/ugc-plans/templates/TEMPLATES?fromLoc=_fromLoc',
  },
  
};
module.exports = urlApi;
