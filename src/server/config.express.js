var express = require('express');
var morgan = require('morgan');
var methodOverride = require('method-override'); //
var compression = require('compression');
var bodyParser = require('body-parser'); // json, body, urlencode
var cookieParser = require('cookie-parser');
var session = require('express-session');

var conf = require('./config.js');

module.exports = function(app) {
	app.debug("loadd all express middlewares")
  app.set('views', conf.rootPath + 'src/server/views');
  app.set('view engine', 'jade');
  app.set('port', conf.port);
  app.set('env', conf.env);
  app.set('x-powered-by', "zexeo");

  // data compression
  app.use(compression({
    threshold: 512
  }));
  // enable HTTP verbs such as PUT or DELETE
  // must before any module that needs to know the method of the request (for example, it must be used prior to the csurf module).
  app.use(methodOverride('X-HTTP-Method-Override'))

  app.debug("the bodyParser")
  app.use(bodyParser.json({
    strict: true,
    verify: function(req, res, buf, encoding) {
      try {
        var json = JSON.parse(buf.toString());
      } catch (e) {
        res.status(400).send({
          err: 'JSON格式错误'
        });
      }
    }
  })); // json
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(cookieParser(conf.cookieSecret));
  app.use(session({
    name: conf.sessionKey,
    secret: conf.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: conf.maxCookieAge
    }
  }));

  if ('development' == conf.env) {
  	app.debug("in dev mode ,log the request path")
    app.use(morgan('dev'))
  }
  app.debug("use static middleware")
  app.use(express.static(conf.rootPath + 'public'));

  

}
