var net = require('net')
var fs = require('fs')
var server = net.createServer()

const port = 8080

server.on('connection',conn => {
    conn.on('data', d => { //从浏览器收到的数据
        var d = d.toString()
        console.log(d)
        var lines = d.split('\r\n')
        var firstLine = lines.shift()
        var [method, path] = firstLine.split(' ')
        // console.log(method,path)
        var fileContent = fs.readFileSync('.' + path)



        conn.write(`HTTP/1.1 200 ok\r\n`)
        // conn.write(`Content-Type: text/html\r\n`)
        conn.write(`\r\n`)
        conn.write(fileContent)
        conn.end()
    })
})


server.listen(port,() => {
    console.log('server listening on port',port)
})