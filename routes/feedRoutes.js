/*

Each user can signup and login 
get : signup , login , latest post , user profile , user posts , single post with comment 
post : signup , login , add post , like other post , comment , add freinds , accept freinds

*/
const { Router } = require('express')
const router = Router()


const { feedBeta } = require('../controllers/feedController')


router.get('/feed', feedBeta )
 

module.exports = router