const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  text: String,
  content: { type: String, default: null },
  endDate: { type: Date, default: Date.now },
  likes: [mongoose.Schema.ObjectId],
  viewers: [mongoose.Schema.ObjectId],
});

const Story = new mongoose.model("Story", storySchema);

module.exports = { Story, storySchema };
