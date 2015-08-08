var rootPath = require('path').normalize(__dirname + '/../../');
var env = process.env.NODE_ENV || 'development';

module.exports = {
	port: process.env.PORT || ( env=='development'? 5000 : 5001 ),
	rootPath: rootPath,
	env: env,
	cookieSecret: "some secret" ,
	maxCookieAge:1000*60*60*24*2,// 用户被登出的时间,2*24个小时
	sessionKey:'BSID',
}