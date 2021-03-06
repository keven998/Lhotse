var base_model = require('./base_model_new');


var create_model = function(args){
    var model = new base_model();
    model.setUrl(args.url);
    if(args.hasOwnProperty('required_query')){
        model.setRequiredQuery(args.required_query);
    }
    model.setNotRequiredQuery(args.not_required_query);
    if(args.hasOwnProperty('url_param')){
        model.setUrlParam(args.url_param);
    }
    return model
}


module.exports.recommend = {
    newRouteModel: create_model({url: '/web/recommend/newitem'}),
    editorRouteModel: create_model({url: '/web/recommend/editor'}),
    mustgoRouteModel: create_model({url: '/web/recommend/mustgo'}),
    popRouteModel: create_model({url: '/web/recommend/popularity'})
}


module.exports.suggestionModel = create_model({
    url: '/web/suggestions',
    required_query: ['keyword'],
    not_required_query: ['restaurant', 'vs', 'hotel', 'loc']
})


module.exports.searchByName = {
    locModel: create_model({
        url: '/web/geo/localities/search',
        required_query: ['keyword'],
        not_required_query: ['prefix']
    }),
    vsModel: create_model({
        url: '/web/poi/view-spots/search',
        required_query: ['keyword'],
        not_required_query: ['prefix']
    })
}


module.exports.routeList = {
    vsModel: create_model({
        url: "/web/plans/explore",
        required_query: ['vs', 'fromLoc'],
        not_required_query: ['tag', 'minDays', 'maxDays']
    }),
    locModel: create_model({
        url: "/web/plans/explore",
        required_query: ['loc', 'fromLoc'],
        not_required_query: ['tag', 'minDays', 'maxDays']
    })
}


module.exports.plan = {
    planDetailModel: create_model({
        url: '/web/plans/{planID}',
        required_query: ['fromLoc'],
        url_param: ['planID']
    })
}


module.exports.article = {
    listModel: create_model({
        url: "/web/articles",
        not_required_query: ['removeId']
    }),
    detailModel: create_model({
        url: "/web/articles/{articleID}",
        url_param: ['articleID']
    })
}


