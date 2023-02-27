const mongoose = require("mongoose");
const Message = require("./Message");

const chatSchema = new mongoose.Schema({
  chatters: [mongoose.Schema.ObjectId],
  messages: [mongoose.SchemaType.Message],
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;
