
const http = require("http")
const port = process.env.PORT || 3000
const fs = require("fs")
const express = require("express")
var app = express()

var serveStaticFile = (res, path, contentType, responseCode = 200) => {
	fs.readFile(__dirname + path, (err, data) => {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'})
			return res.end('500 - Internal Error')
		}
		res.writeHead(responseCode, {'Content-Type': contentType})
		res.end(data)
	})
}

const server = http.createServer((req, res) => {
	const path = req.url.replace(/\/?(?:\?.*)?$/,'')
	var cpath = path
	var contentType;
	if (path.includes("images")){
		if (path.includes("jpg")){
			contentType = 'image/jpg'
		} else if (path.includes("jpeg")){
			contentType = 'image/jpeg'
		} else{
			contentType = 'image/png'
		}
	} else if (path.includes("css")){
		contentType = 'text/css'
	} else if (path.includes("js")){
		// do nothing
	} else {
		contentType = 'text/html'
		switch (path) {
			case '':
				cpath = '/css_practice.html'
				break
			case '/arina':
				cpath = '/arina.html'
				break
			case '/table':
				cpath = '/table_pracice.html'
				break
			default:
				console.log(path)
				res.writeHead(404, {'Content-Type': 'text/plain'})
				res.end('Not found')
				return
		}
	}
	serveStaticFile(res, cpath, contentType)
})

server.listen(port, () => console.log('server started on port ${port};' + __dirname + ' press Ctrl-C to terminate...'))
