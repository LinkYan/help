
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
// var MongoStore= require('connect-mongo')(express);
var settings= require('./settings');
var orm = require("orm");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret:settings.cookieSecret,
  key:settings.db,
  cookie:{maxAge:1000*60*60*24*30},
  // store:new MongoStore({
  //   db:settings.db
  // })
}));
app.use(orm.express("mysql://root:123456@localhost/ci_app1", {
    define: function (db, models, next) {
        // models.person = db.define("person", { ... });
        models.customers = db.define("customers", {
            name      : String,
            address   : String,
            city       : String, // FLOAT
        }, {
            methods: {},
            validations: {}
        });
        next();
    }
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes(app);
