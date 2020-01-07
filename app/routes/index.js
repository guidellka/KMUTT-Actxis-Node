const express = require('express')
const passport = require('passport')
const Ldapstrategy = require('passport-ldapauth')

const router = express.Router()

router.get('/', (req, res) => {
    res.send(new Date())
})

// router.use('/text', require('./text'))

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    const OPTS = Ldapstrategy.Options = {
        server: {
            url: "ldaps://ld0620.sit.kmutt.ac.th/",
            bindDn: `uid=${username},ou=People,ou=st,dc=sit,dc=kmutt,dc=ac,dc=th`,
            bindCredentials: password,
            searchBase: `ou=People,ou=st,dc=sit,dc=kmutt,dc=ac,dc=th`,
            // searchFilter: `uid=${username}`
            searchFilter: `uid={{username}}`
        }
    }
    passport.use(new Ldapstrategy(OPTS))
    
    passport.authenticate('ldapauth', (err, user, info) => {
        let error = err || info
        if (error) {
            console.error('error ', error)
            return res.send({
                status: 500,
                data: error
            })
        } else if (!user) {
            return res.send({
                status: 404,
                data: 'User Not Found'
            })
        } else {
            console.log(user.cn)
            return res.json(user)
        }
    })(req, res, next)
})

module.exports = router