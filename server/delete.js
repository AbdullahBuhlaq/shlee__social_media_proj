//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
require("dotenv/config");
//models
const User = require("./models/User");
const { Post } = require("./models/Post");
const Comment = require("./models/Comment");
const { Story } = require("./models/Story");
const Chat = require("./models/Chat");

async function main() {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.DB_CONNECTION.toString());
  } catch (error) {
    console.log("error");
  }
}
main();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Post.find({}, function (err, res) {
//   console.log("post", res);
// });
// Comment.find({}, function (err, res) {
//   console.log("Comment", res);
// });
// Story.find({}, function (err, res) {
//   console.log("Story", res);
// });
// User.find({}, function (err, res) {
//   console.log("User", res);
// });

app.listen(5000, () => {
  console.log("Server Started on localhost:5000/ !!");
});

User.syncIndexes();
