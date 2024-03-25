
// my libs
const { User } = require('../models/user')
const {Post} = require('../models/posts')



/* 
utility functions to verify a a userID is in friend list / requests list / sent requests list
*/
const isFriend = (me , userId) => {
    return me.friends.includes(userId);
  }
  const isReq = (me , userId) => {
    return me.requestsSent.includes(userId);
  }
  const isRes = (me , userId) => {
    return me.requestsReceived.includes(userId);
  }


/* 
Search for user by username 
render the search page with the users found
*/
userSearch = async (req, res) => {
    me = res.locals.user
    const query = req.body.username
    if (query.length < 3) {
        res.render('home', {
            error: 'query must be 3 char or more',
            username: query,
            data: null
        })
    }
    try {
        const regex = new RegExp(query, 'i'); // 'i' flag for case-insensitive search

        const users = await User.find({
            $or: [
                { name: { $regex: regex } },
                { username: { $regex: regex } }
            ]
        })
        users.forEach(user => {
            user.isAFriend = isFriend(me , user._id)
            user.isReq = isReq(me , user._id)
            user.isRes = isRes(me , user._id)
        })
        console.log(users)
        if (users) {
            res.render('home', {
                error: null,
                username: query,
                data: users
            })
        } else {
            console.log('no user found ')
        }
    } catch (error) {

    }
}

const getAllUsers = async (req , res ) => {
    const pageSize = 5; // Number of users per page
    const pageNumber = req.query.page || 1; // Get page number from query parameter, default to page 1
    const skip = (pageNumber - 1) * pageSize;
    const me = res.locals.user
    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id } }, 'name _id username').skip(skip).limit(pageSize).exec()
        const totalCount = await User.countDocuments(); // Total count of users for pagination
        users.forEach(user => {
            user.isAFriend = isFriend(me , user._id)
            user.isReq = isReq(me , user._id)
            user.isRes = isRes(me , user._id)
        })
        users.forEach(user => {
           console.log(user.username ,'freind : ' , user.isAFriend, ' is received' , user.isReq , 'is sent ', user.isRes) 
        })
        res.render('all-users' , {
            data : users , 
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCount / pageSize)
        })
    } catch (error) {
        console.log(error.message)
    }
}


const oneUser =  async ( req , res , next ) => {
    const username = req.params.username
    const me = res.locals.user
    try {
        const user = await User.findOne({username})
        const posts = await Post.find({user : user._id}).populate('user')
        user.isAFriend = isFriend(me , user._id)
            user.isReq = isReq(me , user._id)
            user.isRes = isRes(me , user._id)
            posts.forEach(post => {
                post.hasLikedByUer = post.likes.likers.includes(me._id)
            })
        console.log(posts)
        if(posts) {
            res.render('user' , {
               data :  user , 
                posts
            })
        } else {

        }
    } catch (error) {
        
    }
}

module.exports = { oneUser  ,  getAllUsers , userSearch }