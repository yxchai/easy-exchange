
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    user = require('./routes/user/'),
    home = require('./routes/home'),
    book = require('./routes/book'),
    cart = require('./routes/cart'),
    request = require('./routes/request'),
    MongoStore = require('connect-mongo')(express);

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less']}));
  app.use(express.cookieParser());
  app.use(express.session({
      secret: '14foa13l8l0gf42vcn456m',
      store: new MongoStore({url: "mongodb://localhost/websessions"}),
      cookie: {path: '/', maxAge: 60000000*5}
  }));
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

//user router
app.get('/user', requiresLogin, user.info);
app.get('/user/login', user.login);
app.get('/user/edit', requiresLogin, user.edit);
app.get('/user/exit', user.exit);
app.post('/user/add', user.add);
app.post('/user/auth', user.auth);
app.put('/user/edit', user.putedit);

//book router
app.get('/books/add', requiresLogin, book.add);
app.post('/books/insert', book.insert);
app.get('/books', requiresLogin, book.getall);
app.get('/book', requiresLogin, book.getall);
app.get('/books/:bid', book.info);
app.get('/books/:bid/edit', requiresLogin, book.edit);
app.put('/books/edit', book.update);

//cart router
app.post('/cart/add', cart.add);
app.get('/cart/show', cart.show);
app.post('/cart/del', cart.del);
app.post('/cart/update', cart.update);

//request router
app.post('/request/add', request.add);
app.get('/request/show', request.show);
app.post('/request/del', request.del);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
