const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  ownerName: String,
  ownerId: mongoose.Schema.ObjectId,
  text: { type: String, default: null },
  content: { type: [String], default: null },
  date: { type: Date, default: Date.now },
  sent: { type: Boolean, default: false },
  recieved: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
});

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
