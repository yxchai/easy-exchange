
/**
 * Module dependencies.
 */

var express = require('express')
  , home = require('./routes/home')
  , regpost = require('./routes/regpost');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less']}));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'woody' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', home.home);
app.get('/login', home.login);
app.post('/register', regpost.register);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
