var urlApi = {
  // 域名地址
  apiHost : 'http://api.lvxingpai.cn',
  
  hotRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee610114e189763fce3",
  mustgoRoute : "http://api.lvxingpai.com/explore/plans?loc=53b60ee810114e189763fce6",
  newestRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783acf",
  recommondRoute : "http://api.lvxingpai.com/explore/plans?loc=53aa9a6510114e3fd4783ca6",
  routeDetail : 'http://api.lvxingpai.com/plans/templates/PLANID?fromLoc=53aa9a6410114e3fd47833bd&traffic=1',
  
  // 根据现有城市名字查询城市ID
  searchCityIdByName : "http://api.lvxingpai.com/geo/localities/search?keyword=", 
  
  
  
};
module.exports = urlApi;
