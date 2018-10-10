const express = require("express")
const path = require("path")
const port = 3000
const app = express()
app.locals.pretty = true;
app.set('views', './templates')

app.use((req, res, next) => {
    console.log(req.method, res.url)
    next()
})
app.use('/static', express.static('./static'))

app.get('/', (req, res, next) => {
    res.render('index.pug')
})

app.listen(port, () => {
    console.log('port' + port + 'listening...')
})