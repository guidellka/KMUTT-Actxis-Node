require('dotenv').config()

// Import Dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fs = require('fs')
const https = require('https')
const proxy = require('express-http-proxy')

// Import File
const appRouters = require('./app/routes/index')

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 } // 1 hr
    })
)

// Set route
app.use('/api/v1', appRouters)
app.use('/users/:id', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        const id = req.params.id
        return `/api/users/${id}`
    }
}))
app.use('/user/:username', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        const username = req.params.username
        return `/api/userByUsername/${username}`
    }
}))
app.use('/users', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return '/api/users'
    }
}))
app.use('/user_data/:user_id', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        const user_id = req.params.user_id
        return `/api/user_data/${user_id}`
    }
}))

// Catch & Handle Error
// Error 404
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error 500 & other
app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: err
    })
})

// https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
// }, app).listen(port, () => {
//     console.log('listen port : ', port)
// })
app.listen(port, () => {
    console.log('listen port : ', port)
})
