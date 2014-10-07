var urlApi = {
    // 域名地址
    apiHost : 'http://api.lvxingpai.cn',
    //首页推荐
    newRoute : "/web/recommend/newitem",
    editorRoute : "/web/recommend/editor",
    mustgoRoute : "/web/recommend/mustgo",
    popRoute : "/web/recommend/popularity",
    

    //热门城市，热门景点
    hotCities : '/explore?showDetails=1&pageSize=8&loc=1',
    hotViews  : '/web/poi/view-spots/explore?page=0&pageSize=8',

    //落地页面
    routeDetail:  '/web/plans/ROUTEID',
    routeNotes:    '/misc/notes/search?planId=ROUTEID',
  
    // 根据现有城市名字查询城市ID
    searchCityIdByName : "http://api.lvxingpai.com/geo/localities/search?keyword=", 
    searchCityNameById : "/web/geo/localities/fromLocId",   //:fromLocId

    // 通过景点名字获取景点ID
    searchViewspotIdByName : "/web/poi/view-spots/search?keyword=",

    // 获取包含XX景点的路线列表
    searchRouteIncludeViewspot : "/web/plans/explore?poi=",

    // 根据名字搜索酒店
    searchHotelByName : '/web/poi/hotels/search?page=0&pageSize=9&keyword=',
    searchHotel : '/web/poi/hotels/search?pageSize=9&',

    // 根据名字搜索景点
    searchViewspotByName : '/web/poi/view-spots/search?&page=0&pageSize=9&sortField=viewCnt&sort=desc&keyword=',
    searchViewspot : '/web/poi/view-spots/search?pageSize=9&sortField=viewCnt&sort=desc&',

    // 获得路线列表
    getRouteList : '/web/plans/explore',
    
    viewspot : {
        detail : '/web/poi/view-spots/SPOTID',
        searchByLoc : '/web/poi/view-spots/search?keyword=DEST&page=0&pageSize=10&sortField=viewCnt&sort=desc',
    },
  
    inputSuggestion : '/web/suggestions',

    ugc : {
        getUgcById : '/web/ugc-plans/UGCID',
        getUgcByIdNone : '/web/ugc-plans/',
        saveUgc : '/web/ugc-plans',
        display : '/web/ugc-plans/UGCID',
        editSave : '/web/plans/optimizers',
        detail : '/web/ugc-plans/UGCID',
        // 有待扩充
        timeline : '/web/ugc-plans/templates/TEMPLATES?fromLoc=_fromLoc&uid=5409b6dde4b043c0eff098fe',
        // 暂时不能保存路线，所以用查询某个模板路线的数据代替
        edit : '/web/ugc-plans/UGCID',
    },
  
    //mine页面，根据用户ID获取我的计划列表
    myPlans: '/web/ugc-plans/users/',
};
module.exports = urlApi;
