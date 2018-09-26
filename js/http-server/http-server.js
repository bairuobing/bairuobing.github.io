/*
 * @Author: BaiRuobing
 * @Date:   2018-09-19 20:10:46
 * @Last Modified by:   BaiRuobing
 * @Last Modified time: 2018-09-19 21:52:44
 */
const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')

const base = 'E:/gitblog/bairuobing.github.io/js/http-server'

const port = 8088

const server = http.createServer()

server.on('request', (req, res) => {
    console.log(req.method, req.url)
    var finalPath = path.join(base, req.url)
    fs.stat(finalPath, (err, stat) => {
        if(err) {
            res.writeHead(404)
            res.end('404 not fuck')
        } else {
            
        }
    })


    console.log(finalPath)
    try {
        var content = fs.readFileSync(finalPath)
        res.end(content)
    } catch (e) {
        res.end('404 not fuck')
    }
})

server.listen(port, () => {
    console.log('linstening on port', port)
})