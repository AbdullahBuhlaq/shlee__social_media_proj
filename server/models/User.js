const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: false },
  picture: { type: String, default: null },
  statu: { type: String },
  friends: [this],
  posts: { type: [mongoose.Schema.ObjectId], default: [] },
  stories: [mongoose.Schema.ObjectId],
  chats: [mongoose.Schema.ObjectId],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
