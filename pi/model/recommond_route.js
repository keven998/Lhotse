var base_model = require('./base_model');
var urlSelect = require('../url_api');
 
 
function api_model(){}
api_model.prototype = new base_model();
api_model.prototype.constructor = api_model;

api_model.prototype.setUrls(urlSelect.recommondRoute);
api_model.getdata = function(req, callback) {
  return api_model.prototype.buildUrl(req).get(callback);
}

module.exports = api_model;
