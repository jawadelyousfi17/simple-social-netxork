const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// my libs
const { User } = require('../models/user')                 // User Model
const { signupCheck, loginErrHandler } = require('../validators/signupValidate')    // Errors Handler and validators

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'jawaddelta', {
        expiresIn: maxAge
    })
}

// sign up function
// only access when the user loged out
// public
const signup = async (req, res, next) => {
    const { username, password, name } = req.body
    try {
        const isValid = signupCheck(username, password, name)
        const user = await User.signup(username, password, name)
        if (user) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            console.log(user)
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        res.render('signup', {
            error,
            data: { username, name }
        })
    }
}

// login function
// public
// only avalible for logged out users
const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.login(username, password)
        if (user) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            console.log(user)
            res.redirect('/')
        }
    } catch (error) {
        console.log(loginErrHandler(error))
        res.render('login', {
            error: loginErrHandler(error),
            data: { username, password }
        })
    }

}

// log out function
// private
// only avalible for logged in users
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}


const signupGet = (req, res) => {
    res.render('signup', {
        data: { username: '', name: '' },
        error: { username: null, password: null, name: null }

    })
}

const loginGet = (req, res) => {
    res.render('login', {
        error: null,
        data: { username: '', name: '' }
    })
}
module.exports = {
    signup,
    login,
    logout ,
    signupGet ,
    loginGet
}