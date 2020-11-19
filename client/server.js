const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback');

const app = express()
app.use(history());
app.use(express.json());

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        msg: '404! Nothing Found!'
    })
})


app.listen(process.env.PORT || 5000)