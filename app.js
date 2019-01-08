/*!
 * express server
 */

const cookieParser require('cookie-parser')
const createError require('http-errors')
const minify require('express-minify')
const express require('express')
const path require('path')
const http require('http')
// 构造 debug 对象
const debug = require('debug')('center:server')
// 程序跟目录
const rootPath = process.cwd()

const defaultOption = {
	port: 3000, // 端口
	host: '0.0.0.0', // host 地址
	views: 'views', // 视图文件地址
	engine: 'html' // 视图文件类型
}


function SimpleServer (option = {}) {
	const app = express()

	const opt = Object.assign({}, defaultOption, option)
	
	app.set('port', opt.port) // 设置端口
	

	// 视图文件地址
	app.set('views', path.join(rootPath, opt.views))
	// 视图模版类型
	app.set('view engine', opt.engine)
	// 压缩输出
	app.use(minify())
	// 修改 express post 内容大小
	app.use(express.json({
		limit: '2mb'
	}))
	app.use(express.urlencoded({ extended: false }))
	// 配置 cookie 解析
	app.use(cookieParser())

	// 创建服务
	const server = http.createServer(app)
	server.listen(opt.port, opt.host, function () {
		console.log(`runing http://${opt.host}:${opt.port}`)
	})
	server.on('error', onError)
	server.on('listening', function(){
		onListening(server)
	})

	return { app, server }
}


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(server) {
  	var addr = server.address()
  	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  	debug('Listening on ' + bind)
}

module.exports = SimpleServer