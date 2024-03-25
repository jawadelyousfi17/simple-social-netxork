const { Post } = require('../models/posts');
const { User } = require('../models/user')
const moment = require('moment')

const feedBeta = async ( req , res ) => {
    const pageSize = 5; // Number of users per page
    const pageNumber = req.query.page || 1; // Get page number from query parameter, default to page 1
    const skip = (pageNumber - 1) * pageSize;
    let endPagination = false
    const user = res.locals.user
    try {
        const friends = await user.populate('friends')

        const friendIds = user.friends.map(friend => friend._id);
        const friendPosts = await Post.find({ user: { $in: friendIds } }).populate({
            path: 'user',
            select: 'name username'
        }).skip(skip).limit(pageSize).exec();

        if( friendPosts.length < pageSize   ) endPagination = true

        friendPosts.forEach(post => {
            post.hasLikedByUer = post.likes.likers.includes(user._id)
            post.date = moment(post.timestamp).format(" MMMM D ")
            post.hour = moment(post.timestamp).format(" HH:MM ")
        })
        res.render('feed' , {
            data : friendPosts ,
            currentPage: pageNumber,
            endPagination
        })
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {feedBeta}