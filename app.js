
/**
 * Module dependencies.
 */

var express = require('express'),
    user = require('./routes/user/'),
    home = require('./routes/home');

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

var requiresLogin = user.session;

app.get('/', home);
app.get('/user', requiresLogin, user.info);
app.get('/user/login', user.login);
app.get('/user/edit', requiresLogin, user.edit);
app.get('/user/exit', user.exit);
app.post('/user/add', user.add);
app.post('/user/auth', user.auth);
app.put('/user/edit', user.putedit);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
