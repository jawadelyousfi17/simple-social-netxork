const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    likers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    count: { type: Number, default: 0 }
  });

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the user who created the post
  content: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }], // References to comments on the post
  timestamp: { type: Date, default: Date.now },
  likes: { type: likeSchema, default: { likers: [], count: 0 } } // Embed likeSchema within posts
  // Add more fields as needed, e.g., likes, attachments, etc.
});

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the user who posted the comment
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true }, // Reference to the post being commented on
  content: { type: String, required: true },
  likes: { type: likeSchema, default: { likers: [], count: 0 } } , // Embed likeSchema within posts
  timestamp: { type: Date, default: Date.now },
  // Add more fields as needed
});

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the user who posted the comment
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'post', required: true }, // Reference to the post being commented on
  content: { type: String, required: true },
  likes: { type: likeSchema, default: { likers: [], count: 0 } } , // Embed likeSchema within posts
  timestamp: { type: Date, default: Date.now },
  // Add more fields as needed
});

const Post = mongoose.model('post', postSchema);
const Comment = mongoose.model('comment', commentSchema);

module.exports = { Post, Comment };
