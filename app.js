
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , MongoStore = require('connect-mongo')(express)
  , settings = require('./settings')
  , routes = require('./routes');

var app = express();

var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.configure(function(){
  app.use(express.logger({stream: accessLogfile}));
})

// development only
app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
// production
app.configure('production', function() {
  app.use(express.errorHandler());
  app.use(function(err, req, res, next){
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next();
  });
});

app.get('/', routes.index);
app.get('/mouse', routes.mouse);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
