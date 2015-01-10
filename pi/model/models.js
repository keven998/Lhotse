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
