var urlApi = {
  apiHost : 'http://api.lvxingpai.com',
  inputTips : '',
  searchCityByName : '/geo/localities/search',
  getRouteInCity : '/explore/plans',
  // 首页四个推荐，暂无api，先用用某一个城市的旅行计划替代
  // http://api.lvxingpai.com/explore/plans?loc= XXX
  /*
  hotRoute : 'http://api.lvxingpai.com/explore/plans',
  mustgoRoute : 'http://api.lvxingpai.com/explore/plans',
  newestRoute : 'http://api.lvxingpai.com/explore/plans',
  recommondRoute : 'http://api.lvxingpai.com/explore/plans',
  */
  
  hotRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee610114e189763fce3",
  mustgoRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee810114e189763fce6",
  newestRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783acf",
  recommondRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783ca6",
  routeDetail : 'http://api.lvxingpai.com/plans/templates/PLANID?fromLoc=53aa9a6410114e3fd47833bd&traffic=1',
  
};
module.exports = urlApi;
