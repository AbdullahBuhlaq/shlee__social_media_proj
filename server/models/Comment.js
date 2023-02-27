const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  owner: mongoose.Schema.ObjectId,
  text: { type: String, default: null },
  content: { type: [String], default: null },
  likes: [mongoose.Schema.ObjectId],
  deslikes: [mongoose.Schema.ObjectId],
  replies: [this],
  date: { type: Date, default: Date.now },
});

const Comment = new mongoose.model("Comment", commentSchema);

module.exports = Comment;
