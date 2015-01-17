var base_model = require('./base_model_new');
 
var create_model = function(args){
    var model = new base_model();
    model.setUrl(args.url);
    model.setParam(args.param);
    return model
}

module.exports.suggestionModel = create_model({
    url: '/web/suggestions',
    param: ['keyword']
})
