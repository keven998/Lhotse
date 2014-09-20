var base_model = require('./base_model');

function hot(){}
hot.prototype = new base_model();
hot.prototype.constructor = hot;
hot = function(){
    this.url = null;
    this.params = ['id', 'name']
}


must_go = function(){
    //...
}