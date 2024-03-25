const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const { Router } = require('express');


// requireAuth function
// $ used to check if client autorized to visite this Router
// $ check a token if its valid it continue if token is invalid origin
// $ expired it ask from clien to login
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'jawaddelta', (err, decodedToken) => {
            if (err) {
                res.redirect('/login')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

// $ used to check if client is logged in or not
// $ check a token if its valid it continue if token is invalid origin
// $ expired it ask from clien to login
const loginCheck = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'jawaddelta', (err, decodedToken) => {
            if (err) {
                next()
            } else {
                res.redirect(req.get('referer') || '/');
            }
        })
    } else {
        next()
    }
}
// $ used to check if client is logged in or not
// $ check a token if its valid it continue if token is invalid origin
// $ expired it ask from client to login
// $ set res.local.user to user
const userCheck = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'jawaddelta', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                next()
            } else {
                try {
                    let user = await User.findById(decodedToken.id)
                    res.locals.user = user
                    next()
                } catch (error) {
                    console.log(error.message)
                    // res.status(400).render('badreq')
                }
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}



module.exports = { requireAuth, loginCheck, userCheck }