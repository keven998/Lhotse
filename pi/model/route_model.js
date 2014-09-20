var base_model = require('./base_model_new');

function detail(){}
detail.prototype = new base_model();
detail.prototype.constructor = detail;
detail.prototype.set_url('/web/plans/ROUTEID');
detail.prototype.set_queries(['ROUTEID']);
module.exports.detail = detail;
