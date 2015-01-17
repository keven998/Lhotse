models = require('./models');

args = {
    query: {keyword: 'bj', restaurant: 1, hotel: 1, vs: 1, loc: 1}
};
models.suggestionModel.getData(args, function(data){
    console.log(JSON.stringify(data));
});


args = {
    query: {fromLoc: '5473ccd7b8ce043a64108c46'},
    url_param: {planID: '547c007fb8ce0440a92709ff'}
};
models.planDetailModel.getData(args, function(data){
    console.log(JSON.stringify(data));
});
