models = require('./models');
models.suggestionModel.getData(
    {word: 'a'},
    function(e){
        console.log(e)
    }
);
