'use strict';
var app = require('express')(),
  server = require('http').createServer(app);
var conf = require("./config.js")

app.debug = require("debug")("zexeo.com");

app.debug("the rootPath", conf.rootPath )

/*
  load in all controllers
*/
app.ctrl = {

}
// load all middleware for express
require('./config.express.js')(app);


// load all routes
require('./router.js')(app);


server.listen( app.get("port") );
console.log('Magic happens on port ' + app.get("port") + ' in '+app.get("env")+' mode');
