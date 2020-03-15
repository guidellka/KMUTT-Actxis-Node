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
//------------------ Router get by another ------------------
app.use('/user/:username', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        const username = req.params.username
        return `/api/user/${username}`
    }
}))
app.use('/document/student/:owner_id', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        const owner_id = req.params.owner_id
        return `/api/documentByOwnerId/${owner_id}`
    }
}))
app.use('/organization_name/:user_id', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        const user_id = req.params.user_id
        return `/api/organ_user/${user_id}`
    }
}))
app.use('/lecturer', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/getLecturer`
    }
}))
//------------------ Router get by id ------------------
app.use('/user_data/:user_id', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        const user_id = req.params.user_id
        return `/api/user_data/${user_id}`
    }
}))
//------------------ Router get all ------------------
app.use('/users', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return '/api/users'
    }
}))
app.use('/user_data', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/user_data`
    }
}))
app.use('/organizations', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/organizations`
    }
}))
app.use('/notifications', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/notifications`
    }
}))
app.use('/organization_users', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/organization_users`
    }
}))
app.use('/photos', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/photos`
    }
}))
app.use('/steps', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/steps`
    }
}))
app.use('/document_steps', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/document_steps`
    }
}))
app.use('/attach_files', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/attach_files`
    }
}))
app.use('/category_steps', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/category_steps`
    }
}))
app.use('/users', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return '/api/users'
    }
}))
app.use('/documents', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/documents`
    }
}))
app.use('/document_categories', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/document_categories`
    }
}))
app.use('/comments', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/comments`
    }
}))
app.use('/clubs', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/clubs`
    }
}))
app.use('/budgets', proxy('localhost:8000', {
    proxyReqPathResolver: function (req, res) {
        return `/api/budgets`
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
