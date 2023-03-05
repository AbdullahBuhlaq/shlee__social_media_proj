const mongoose = require("mongoose");
const messageSchema = require("./Message");

const chatSchema = new mongoose.Schema({
  chatters: [mongoose.Schema.ObjectId],
  messages: [messageSchema],
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;
