/*
 * @Author: BaiRuobing
 * @Date:   2018-09-04 22:36:46
 * @Last Modified by:   BaiRuobing
 * @Last Modified time: 2018-09-04 23:27:28
 */
var net = require('net')
var fs = require('fs')
var server = net.createServer()
const port = 80
var msgs = ['first', 'second']
server.on('connection', conn => {
    conn.on('data', d => {
        var d = d.toString()
        console.log('----------------')
        console.log(d)
        console.log('----------------')
        var lines = d.split('\r\n')
        var firstLine = lines.shift()
        var [method, path] = firstLine.split(' ')
        if (path === '/msg.html') {
            if (method === 'POST') {
                var lastLine = lines.pop()
                msgs.push(lastLine.split("=")[1])
            }
            conn.write(`HTTP/1.1 200 OK\r\n`)
            conn.write(`\r\n`)
            msgs.forEach(msg => {
                conn.write(`<div>${msg}</div>`)
            })
            conn.end()
        } else {
            try {
                var fileContent = fs.readFileSync('.' + path)
            } catch (e) {
                fileContent = 'error!!!'
            }

            conn.write(`HTTP/1.1 200 OK\r\n`)
            conn.write(`\r\n`)
            conn.write(fileContent)
            conn.end()
        }

    })
})

server.listen(port, () => {
    console.log('Server listening on port', port)
})