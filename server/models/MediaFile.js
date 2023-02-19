const mongoose = require("mongoose");

const MediaFile = new mongoose.Schema({
  type: { type: String, require: true },
  value: { type: Buffer, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = MediaFile;
