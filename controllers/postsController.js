const { Post , Comment } = require('../models/posts');
const moment = require('moment')

/*
logged In user can add Posts 
each post has content 
and { author : user }
*/
const addPost = async (req, res) => {
    const content = req.body.content
    try {
        const post = new Post({
            content,
            user: res.locals.user._id
        })
        await post.save()
    } catch (error) {

    }
}

/*
-- simple function to fetch all posts from data base
*/
const getAllPosts = async (req, res) => {
    const userId = res.locals.user._id
    try {
        const posts = await Post.find({}, '_id content user likes').populate({ path: 'user', select: '_id username name' })
        posts.forEach(post => {
            post.hasLikedByUer = post.likes.likers.includes(userId)
            post.date = moment(post.timestamp).format(" MMMM D ")
            post.hour = moment(post.timestamp).format(" HH:MM ")


        })
        res.render('posts', {
            data: posts
        })
    } catch (error) {

    }
}

/*
-- when users Like a post we check if he is already liked it 
-- if not succesfuly add like and push the user id to post.likes.likes and add +1 to likes count
-- FIX to come : check if a user already liked a post . if true make the like button different . and user
         can remove his like
*/
const addLike = async (req, res) => {
    const id = req.params.id
    const userId = res.locals.user._id
    try {
        const post = await Post.findById(id);
        if (!post) {
            console.error('Post not found');
            return;
        }
        const alreadyLiked = post.likes.likers.includes(userId);
        if (alreadyLiked) {
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { $pull: { 'likes.likers': userId }, $inc: { 'likes.count': -1 } },
                { new: true }
            );

            return;
        }
        post.likes.likers.push(userId);
        post.likes.count++;
        await post.save();
        console.log('Liker added successfully');
    } catch (error) {
        console.error('Error adding liker to post:', error);
    }
}

const addLikePost = async (req, res) => {
    const id = req.params.id
    const userId = res.locals.user._id
    console.log(id)
    try {
        const post = await Post.findById(id);
        if (!post) {
            console.error('Post not found');
            return;
        }
        const alreadyLiked = post.likes.likers.includes(userId);
        if (alreadyLiked) {
            const updatedPost = await Post.findByIdAndUpdate(
                id,
                { $pull: { 'likes.likers': userId }, $inc: { 'likes.count': -1 } },
                { new: true }
            );
            await updatedPost.save()
            res.json({ success: true, liked: !alreadyLiked, count: updatedPost.likes.count });
            return;
        }
        post.likes.likers.push(userId);
        post.likes.count++;
        await post.save();
        res.json({ success: true, liked: !alreadyLiked, count: post.likes.count });
    } catch (error) {
        console.error('Error adding liker to post:', error.message);
    }
}


const addComment = async (req, res) => {
    const userId = res.locals.user._id
    const commentContent = req.body.comment
    const postId = req.params.id
    try {
        const comment = new Comment({
            user : userId ,
            post : postId ,
            content : commentContent
        })
        await comment.save()
        const post = await  Post.findById(postId)
        post.comments.push(comment)
        await post.save()
       
        } catch (error) {
        console.log(error.message)
    }
}

const showSingloPost = async (req, res) => {

    const user = res.locals.user
    const id = req.params.id
    try {
        const post = await Post.findById(id).populate('user')
        post.hasLikedByUer = post.likes.likers.includes(user._id)
        post.date = moment(post.timestamp).format(" MMMM D ")
        post.hour = moment(post.timestamp).format(" HH:MM ")

        const allComments = await Post.findById(id).populate({
            path: 'comments',
            populate: { path: 'user', select: 'name username' } // Populate the user field within each comment
        })
        // console.log(allComments.comments)
        res.render('comment' , {
            post ,
            comments : allComments.comments
        })
    } catch (error) {

    }
}


// const addCommentToComment = async (req, res) => {
//     const userId = res.locals.user._id
//     const commentContent = req.body.comment
//     const commentId = req.params.id
//     try {
//         const comment = new Comment({
//             user : userId ,
//             post : postId ,
//             content : commentContent
//         })
//         await comment.save()
//         const post = await  Post.findById(postId)
//         post.comments.push(comment)
//         await post.save()
       
//         } catch (error) {
//         console.log(error.message)
//     }
// }


const addLikeToComment = async (req, res) => {
    const id = req.params.id
    const userId = res.locals.user._id
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            console.error('Post not found');
            return;
        }
        const alreadyLiked = comment.likes.likers.includes(userId);
        // if (alreadyLiked) {
        //     const updatedPost = await Post.findByIdAndUpdate(
        //         id,
        //         { $pull: { 'likes.likers': userId }, $inc: { 'likes.count': -1 } },
        //         { new: true }
        //     );

        //     return;
        // }
        comment.likes.likers.push(userId);
        comment.likes.count++;
        await comment.save();
        console.log('Liker added successfully');
    } catch (error) {
        console.error('Error adding liker to post:', error);
    }
}


module.exports = {
    getAllPosts,
    addLike,
    addPost,
    addLikePost,
    addComment,
    showSingloPost , 
    addLikeToComment
}