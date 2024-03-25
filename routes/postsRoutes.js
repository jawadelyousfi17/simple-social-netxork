/* 
user can get all posts 
can add new posts
can like posts
*/

const { Router } = require('express')
const router = Router()

const {getAllPosts , addPost, addLike, addLikePost, showSingloPost, addComment, addLikeToComment } = require('../controllers/postsController')

router.get('/like/:id', addLike )
router.post('/add-post', addPost)
router.get('/posts', getAllPosts)
router.post('/like/:id' , addLikePost )

router.get('/comment/:id' , showSingloPost )
router.post('/comment/:id' , addComment )


router.post('/like-comment/:id' , addLikeToComment )


router.get('/add-post' , (req, res) => {
    res.render('add-post', {
    })
})

module.exports = router