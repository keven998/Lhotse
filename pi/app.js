var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var config = require('./conf/system');
var routes = require('./routes/index');
var account = require('./routes/account');
var plans = require('./routes/plans');
var viewspot = require('./routes/viewspot');
// route是模板路线的所有路由
var route = require('./routes/route');
var hotel = require('./routes/hotel');

var app = express();

// log4js settings
log4js.configure({
     appenders: [
         {
             type: 'dateFile',
             filename: path.join(__dirname, 'logs/'),
             absolute: true,
             pattern: "yyyy-MM-dd_dev.log",
             alwaysIncludePattern: true,
             category: 'online_development',
             layout: {
                 type: "pattern",
                 pattern: "%d{MM/dd hh:mm} %-5p %m"
             }
         },
         {
             type: 'dateFile',
             filename: path.join(__dirname, 'logs/'),
             absolute: true,
             pattern: "yyyy-MM-dd_product.log",
             alwaysIncludePattern: true,
             category: 'online_product',
             layout: {
                 type: "pattern",
                 pattern: "%d{MM/dd hh:mm} %-5p %m"
             }
         }
     ],
     levels: {
        online_product: 'ERROR',
        online_development: 'INFO'
     },
     replaceConsole: config.env !== 'local_debug'
});

//set logger_log4js can be called in other files
exports.logger_log4js = function(name) {
   var logger4js = log4js.getLogger(name);
   return logger4js;
};

if (config.env !== 'local_debug') {
    app.use(log4js.connectLogger(this.logger_log4js(config.env)));
} else {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('travelpi'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/route', route);
app.use('/account', account);
app.use('/plans', plans);
app.use('/viewspot', viewspot);
app.use('/hotel', hotel);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler, will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('common/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;