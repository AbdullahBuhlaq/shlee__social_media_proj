const mongoose = require("mongoose");
const MediaFile = require("./MediaFile");
const postSchema = new mongoose.Schema({
  text: { type: String, default: null },
  content: { type: [String], default: null },
  likes: [mongoose.Schema.ObjectId],
  deslikes: [mongoose.Schema.ObjectId],
  comments: [mongoose.Schema.ObjectId],
  shares: [mongoose.Schema.ObjectId],
  date: { type: Date, default: Date.now },
});

const Post = new mongoose.model("Post", postSchema);

module.exports = { Post, postSchema };
