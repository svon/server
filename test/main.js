var Servers = require('../bin/www.js');

var servers = Servers()
var app = servers.app

app.get('/', function (req, res) {
	res.send('hello world')
})
