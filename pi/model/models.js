var base_model = require('./base_model_new');
 
var create_model = function(url, param){
    var model = new base_model();
    model.setUrl(url);
    model.setParam(param);
    return model
}

module.exports.suggestionModel = create_model(
    '/web/suggestions',
    ['word']
)

//recommend routes
module.exports.newRouteModel = create_model(
    '/web/recommend/newitem',
    []
)
module.exports.editorRouteModel = create_model(
    '/web/recommend/editor',
    []
)
module.exports.mustgoRouteModel = create_model(
    '/web/recommend/mustgo',
    []
)
module.exports.popRouteModel = create_model(
    '/web/recommend/popularity',
    []
)