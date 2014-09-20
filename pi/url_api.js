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
    searchCityNameById : "/web/geo/localities/fromLocId",   //:fromLocId
    
    // 根据名字搜索酒店
    searchHotelByName : '/web/poi/hotels/search?page=0&pageSize=9&keyword=',
    
    // 根据名字搜索景点
    searchViewspotByName : '/web/poi/view-spots/search?&page=0&pageSize=9&sortField=viewCnt&sort=desc&keyword=',
    
    viewspot : {
        detail : '/web/poi/view-spots/SPOTID',
        searchByLoc : '/web/poi/view-spots/search?keyword=DEST&page=0&pageSize=10&sortField=viewCnt&sort=desc',
    },
  
  
  ugc : {
    getUgcById : '/web/ugc-plans/UGCID',
    getUgcByIdNone : '/web/ugc-plans/',
    saveUgc : '/web/ugc-plans',
    display : '/web/ugc-plans/UGCID',
    editSave : "http://api.lvxingpai.cn/web/plans/optimizers",
    // 有待扩充
    timeline : '/web/ugc-plans/templates/TEMPLATES?fromLoc=_fromLoc&uid=5409b6dde4b043c0eff098fe',
    // 暂时不能保存路线，所以用查询某个模板路线的数据代替
    edit : '/web/ugc-plans/UGCID',
  },
  
};
module.exports = urlApi;
