/*

Each user can signup and login 
get : signup , login , latest post , user profile , user posts , single post with comment 
post : signup , login , add post , like other post , comment , add freinds , accept freinds

*/
const { Router } = require('express')
const router = Router()

const {oneUser } = require('../controllers/userControllers')
const { loginCheck, requireAuth } = require('../middleware.js/authCheck')
const { signup , login , logout , loginGet , signupGet } = require('../controllers/userAuth')

router.post('/signup', signup)
router.get('/u/:username' , oneUser )
router.post('/login', login)
router.get('/logout', requireAuth, logout)


// router.get('/like/:id', addLike )
// router.post('/add-post', addPost)
// router.get('/posts', getAllPosts)
// router.get('/add-post' , (req, res) => {
//     res.render('add-post', {

//     })
// })


router.get('/login', loginCheck, loginGet )
router.get('/signup', loginCheck, signupGet )



module.exports = router