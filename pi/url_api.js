var urlApi = {
    // 域名地址
    apiHost : 'http://api.lvxingpai.cn',

    //推荐路线
    newRoute : "/web/recommend/newitem",
    editorRoute : "/web/recommend/editor",
    mustgoRoute : "/web/recommend/mustgo",
    popRoute : "/web/recommend/popularity",

    //推荐地点(城市/景点)
    hotCities : '/web/recommend/hotcity?page=0&pageSize=8',
    hotViews  : '/web/recommend/hotvs?page=0&pageSize=8',

    //路线相关(详情/游记)
    routeDetail:  '/web/plans/ROUTEID',
    routeNotes:    '/web/misc/notes/search?planId=ROUTEID',

    // 根据现有城市名字查询城市ID   =>  新定义中包含但不限于城市，只有"目的地"概念
    searchCityIdByName : "/web/geo/localities/search?keyword=",

    // 根据城市ID查询城市名字
    searchCityNameById : "/web/geo/localities/fromLocId",   //:fromLocId

    // 通过景点名字获取景点ID
    searchViewspotIdByName : "/web/poi/view-spots/search?keyword=",

    // 获得相关目的地的路线列表 "&loc=xx" or "&vs=xx"
    getRouteList : '/web/plans/explore?pageSize=99&',

    // 根据名字搜索酒店
    searchHotelByName : '/web/poi/hotels/search?page=0&pageSize=9&keyword=',
    searchHotel : '/web/poi/hotels/search?pageSize=9&',

    // 根据名字搜索景点
    searchViewspotByName : '/web/poi/view-spots/search?&page=0&pageSize=9&sortField=viewCnt&sort=desc&keyword=',
    searchViewspot : '/web/poi/view-spots/search?pageSize=9&sortField=viewCnt&sort=desc&',

    viewspot : {
        detail : '/web/poi/view-spots/SPOTID',
        searchByLoc : '/web/poi/view-spots/search?keyword=DEST&page=0&pageSize=10&sortField=viewCnt&sort=desc',
    },

    inputSuggestion : '/web/suggestions',

    ugc : {
        getUgcById : '/web/ugc-plans/UGCID',
        getUgcByIdNone : '/web/ugc-plans/',
        saveUgc : '/web/ugc-plans',    // detail page, save ugc directly
        display : '/web/ugc-plans/UGCID',
        editSave : '/web/plans/optimizers',
        detail : '/web/ugc-plans/UGCID',
        planDetail: 'http://api.lvxingpai.cn/web/ugc-plans/templates/',
        // 有待扩充
        timeline : '/web/ugc-plans/templates/TEMPLATES?fromLoc=_fromLoc',
        // 暂时不能保存路线，所以用查询某个模板路线的数据代替
        // TODO  换成 .com的接口  对应plans.js中的 路由'/edit/:UGCI'
        edit : 'http://api.lvxingpai.cn/web/ugc-plans/',
    },

    //mine页面，根据用户ID获取我的计划列表
    myPlans: '/web/ugc-plans/users/',
};
module.exports = urlApi;
