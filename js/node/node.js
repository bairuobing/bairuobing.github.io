/*
* @Author: BaiRuobing
* @Date:   2018-09-17 20:09:41
* @Last Modified by:   BaiRuobing
* @Last Modified time: 2018-09-17 20:40:39
*/

// var fs = require('fs')
// fs.readFile('/foo.txt',function(err,file){
//     console.log('finished')
// })

// console.log('loading...')

var http = require('http')
var querystring = require('querystring')

//侦听服务器请求的 request事件
http.createServer(function(req,res){
    var posrData = ''
    req.setEncoding('utf8')
    //侦听请求的 data事件
    req.on('data',function(chunk){
        posrData += chunk
    })
    //侦听请求的 end事件
    req.on('end',function(){
        res.end(posrData)
    })

}).listen(8080)
console.log('Server on')