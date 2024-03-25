/*

Each user can signup and login 
get : signup , login , latest post , user profile , user posts , single post with comment 
post : signup , login , add post , like other post , comment , add freinds , accept freinds

*/
const { Router } = require('express')
const router = Router()


const {  getAllUsers,  userSearch   } = require('../controllers/userControllers')
const {removeFriend, getAllFriends, acceptFriend, addFreind , recievedRequests } = require('../controllers/friendsController')


router.post('/users/search', userSearch)
router.get('/allusers', getAllUsers)
router.get('/add/:username', addFreind)
router.get('/accept/:id', acceptFriend)
router.get('/remove/:id', removeFriend)
router.get('/friends', getAllFriends)
router.get('/requests', recievedRequests)



module.exports = router