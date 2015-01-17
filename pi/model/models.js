var base_model = require('./base_model_new');


var create_model = function(args){
    var model = new base_model();
    model.setUrl(args.url);
    if(args.hasOwnProperty('required_query')){
        model.setRequiredQuery(args.required_query);
    }
    if(args.hasOwnProperty('not_required_query')){
        model.setNotRequiredQuery(args.not_required_query);
    }
    if(args.hasOwnProperty('url_param')){
        model.setUrlParam(args.url_param);
    }
    return model
}


module.exports.newRouteModel = create_model(
    '/web/recommend/newitem',
    ['page', 'pageSize']
)


module.exports.editorRouteModel = create_model(
    '/web/recommend/editor',
    ['page', 'pageSize']
)


module.exports.mustgoRouteModel = create_model(
    '/web/recommend/mustgo',
    ['page', 'pageSize']
)


module.exports.popRouteModel = create_model(
    '/web/recommend/popularity',
    ['page', 'pageSize']
)


module.exports.suggestionModel = create_model({
    url: '/web/suggestions',
    required_query: ['keyword'],
    not_required_query: ['restaurant', 'vs', 'hotel', 'loc'],
})


module.exports.planDetailModel = create_model({
    url: '/web/plans/{planID}',
    required_query: ['fromLoc'],
    url_param: ['planID']
})
