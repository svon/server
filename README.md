# simple-server

#### A simple server based on Express

## Installation

Using npm:

	npm i --save https://github.com/svonme/simple-server


In Node.js:

	import Server from '@fengqiaogang/server'

	const { app } = Server()

	app.get('/', function(req, res) {
		res.send('hello')
	})
