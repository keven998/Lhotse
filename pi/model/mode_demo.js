models = require('./models');

args = {
    query: {keyword: 'bj', restaurant: 1, hotel: 1, vs: 1, loc: 1}
};
models.suggestionModel.getData(args, function(data){
    console.log(JSON.stringify(data));
});
