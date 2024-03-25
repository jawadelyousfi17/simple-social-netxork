const signupCheck = (username, password, name) => {
    
    let flag = false
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.-]{2,}$/
    const nameRegex = /^[a-zA-Z\s]{1,30}$/
    const errors = { username: [], password: [], name: [] }
    if (username.length < 4) {
        errors.username.push('username is too short')
        flag = true
    }
    if (password.length < 6) {
        errors.password.push('password is too short')
        flag = true
    }
    if (name.length < 4 || !nameRegex.test(name)) {
        errors.name.push('invalid name ')
        flag = true
    }
    if (!usernameRegex.test(username)) {
        errors.username.push('username must begin with alpha numeric and contain only alphanumeric and hyphens (-), periods (.), and underscores (_). ')
        flag = true
    }
    if (flag) throw errors
    return 'valid'
}

const signupErrors = (error) => {
    const errors = { username: [], password: [], name: [] }
    if(error.password) {
        errors.password.push(  error.password)
        return errors 
    }
    if (err = error.errors) {
        if (err.username) {
            errors.username.push( err.username.message)
        }
        if (err.password) {
            errors.password.push (err.password.message)
        }
    }
    if (error.code) {
        if (error.code === 11000) {
            errors.username.push( 'username must be unique')
        }
    }
    return errors
}

const loginErrHandler = (error) => {
    if (error.message === '100') return { username : 'Please enter Email and password',password : '' , code: 1 }
    if (error.message === '101') return { username: 'no user found with this email', password : '' , code: 2 }
    if (error.message === '102') return { username : '' , password: 'wrong password', code: 3 }
}

const urlvalidator = (url) => {
    const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:\S+(?::\S*)?)?(?:\.(?:\S+(?::\S*)?)*)(?::\d{1,5})?(?:[/?#]\S*)?$/;
    return urlRegex.test(url);
}
const shortUrlvalidator = (str) => {
    const regex = /^[a-zA-Z0-9_-]+$/
    return regex.test(str) && str.length > 3
  }

module.exports = { signupCheck , signupErrors , loginErrHandler , urlvalidator , shortUrlvalidator}