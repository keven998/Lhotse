var Cookies = require( "cookies" );

var get_session_info = function(req, res, key){
    var cookies = new Cookies( req, res, {});
    try{
        return JSON.parse(cookies.get(key));
    }catch(e){
        return null;
    }  
};

var set_session_info = function(req, res, key, value){
    var cookies = new Cookies( req, res, {});
    try{
        cookies.set(key, JSON.stringify(value), {maxAge: 24 * 60 * 60 * 1000});
    }catch(e){
        console.log('set seesion error.' + e);
    }  
};

var get_user_info = function(req, res){
    return get_session_info(req, res, 'user_info');
}

var set_user_info = function(req, res, user_info){
    return set_session_info(req, res, 'user_info', user_info);
}

module.exports.get_user_info = get_user_info;
module.exports.set_user_info = set_user_info;
