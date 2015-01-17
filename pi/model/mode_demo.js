models = require('./models');

models.suggestionModel.getData(
    {keyword: 'bj'},
    function(e){
        console.log(e)
    }
);
