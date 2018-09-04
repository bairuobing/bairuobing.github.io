//TCP-server
var net = require('net')
var server = net.createServer()

server.on('connection', conn => {
    console.log('a connection established:', conn.remoteAddress, conn.remotePort)
    conn.on('data', data => {
        console.log(conn, remoteAddress, data.toString())
        conn.write(data.toString().toUpperCase())
    })
})

server.listen(10010, () => { //端口，监听成功的回调函数
    console.log('Server listening on port', 10010)
})
// > node TCP.js
// > Server listening on port
//
// 

//client
var conn = net.connect(10010, '192.168.31.242')

conn.write('xxxxxxx')

conn.on('data', data => console.log(data.toString()))//回复的消息的接收