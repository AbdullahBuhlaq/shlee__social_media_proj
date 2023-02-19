//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv/config");

//middleware
const auth = require("./middleware/auth");

//models
const User = require("./models/User");
const Comment = require("./models/Comment");
const { Post } = require("./models/Post");

//////////// init section ////////////////////////////////////////////////////

async function main() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_CONNECTION.toString());
  } catch (error) {
    console.log("error");
  }
}
main();

cloudinary.config({
  cloud_name: "dzeojmyub",
  api_key: "837859438642544",
  api_secret: "5KovDBolFp43epS0r5DL1qCQzR4",
});

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//////// server listen section ////////////////////////////////////////////////

app.post("/register", async (req, res) => {
  try {
    const { userName, password, firstName, lastName, email } = req.body;
    //check if user exist
    let user = await User.find({ email: email });
    if (user[0]) {
      res.send(JSON.stringify({ result: "email is exist before" }));
    }

    user = await User.find({ userName: userName });
    if (user[0]) {
      res.send(JSON.stringify({ result: "user name must be unique" }));
    }

    user = new User({
      userName,
      firstName,
      lastName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(parseInt(process.env.GENERATOR_SALT));
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.send(JSON.stringify({ token: token }));
    });
  } catch (err) {
    console.error(err.message);
    res.send(JSON.stringify({ result: "Sorry, error happened in the server" }));
  }
});

app.post("/basicInformation", auth, async (req, res) => {
  try {
    let result = "/profile-photo.webp";
    if (req.body.picture.value == "/profile-photo.webp") req.body.picture = "";
    else {
      const a = req.body.picture.value.replace("data:" + req.body.picture.type + ";base64,", "");
      await fs.promises.writeFile("./" + req.body.picture.name, a, "base64");

      result = await cloudinary.uploader.upload("./" + req.body.picture.name, {
        upload_preset: "x1d4nhbe",
      });
      result = result.url;
      await fs.promises.unlink("./" + req.body.picture.name);
    }
    let data = { ...req.body, picture: result };
    data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ""));

    const update = await User.updateOne({ _id: req.user.id }, data);
    const user = await User.findById(req.user.id);

    res.send(JSON.stringify({ result: "Done" }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "Sorry, error happened in the server!" }));
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    // check if the user exists
    let user = "";
    email ? (user = await User.findOne({ email })) : (user = await User.findOne({ userName }));
    if (!user) {
      return res.send(JSON.stringify({ result: email ? "Email is not registered!" : "No such account for this user name!" }));
    }

    // check is the encrypted password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send(JSON.stringify({ result: "Email or password incorrect!" }));
    }

    // return jwt
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.send(JSON.stringify({ token: token }));
    });
  } catch (err) {
    console.error(err.message);
    res.send(JSON.stringify({ result: "Sorry, Error happened in the server!" }));
  }
});

app.post("/getUserInformation", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(JSON.stringify({ result: user }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: error }));
  }
});

app.post("/getPosts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friendsPostsIds = await User.find({ _id: { $in: user.friends } }).select("posts picture firstName lastName userName _id");
    const friendsPosts = await Promise.all(
      friendsPostsIds.map(async (obj) => {
        const posts = await Post.find({ _id: { $in: obj.posts } });
        return { userName: obj.userName, firstName: obj.firstName, lastName: obj.lastName, picture: obj.picture, _id: obj._id, posts: posts };
      })
    );
    res.send(JSON.stringify({ result: friendsPosts }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: error }));
  }
});

app.post("/addPost", auth, async (req, res) => {
  try {
    let insert;
    if (req.body.content[0].value != "") {
      let result = await Promise.all(
        req.body.content.map(async (image) => {
          const a = image.value.replace("data:" + image.type + ";base64,", "");
          await fs.promises.writeFile("./" + image.name, a, "base64");
          const response = await cloudinary.uploader.upload("./" + image.name, {
            upload_preset: "x1d4nhbe",
          });
          await fs.promises.unlink("./" + image.name);
          return response.url;
        })
      );
      insert = await Post.insertMany([{ text: req.body.text, content: result }]);
    } else insert = await Post.insertMany([{ text: req.body.text }]);

    const update = await User.updateOne({ _id: req.user.id }, { $push: { posts: insert[0]._id } });
    res.send(JSON.stringify({ result: "Done" }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/getSearchResult", async (req, res) => {
  try {
    const users = await User.find({ userName: { $regex: `.*${req.body.search}.*`, $options: "i" } });
    res.send(JSON.stringify({ result: users }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/addFriend", auth, async (req, res) => {
  try {
    const add = await User.updateOne({ _id: req.user.id }, { $addToSet: { friends: req.body.id } });
    res.send(JSON.stringify({ result: "done" }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/removeFriend", auth, async (req, res) => {
  try {
    const add = await User.updateOne({ _id: req.user.id }, { $pull: { friends: req.body.id } });
    res.send(JSON.stringify({ result: "done" }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/addLike", async (req, res) => {
  try {
    const add = await Post.updateOne({ _id: req.body.postId }, { $addToSet: { likes: req.body.userId } });
    console.log(add);
    res.send(JSON.stringify({ result: add.modifiedCount ? "done" : "duplicate" }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/removeLike", async (req, res) => {
  try {
    const remove = await Post.updateOne({ _id: req.body.postId }, { $pull: { likes: req.body.userId } });
    res.send(JSON.stringify({ result: remove.modifiedCount ? "done" : "duplicate" }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/getLikeList", async (req, res) => {
  try {
    const users = await User.find({ _id: { $in: req.body.fanIds } }).select("userName firstName lastName picture ");
    res.send(JSON.stringify({ result: users }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/getCommentList", async (req, res) => {
  try {
    const comments = await Comment.find({ _id: { $in: req.body.commentIds } });
    const finalComments = await Promise.all(
      comments.map(async (obj) => {
        const owner = await User.find({ _id: obj.owner }).select("userName firstName lastName picture");
        return { ...obj._doc, ownerInfo: owner[0] };
      })
    );
    res.send(JSON.stringify({ result: finalComments }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.post("/addComment", auth, async (req, res) => {
  try {
    let insert;
    if (req.body.content[0].value != "") {
      let result = await Promise.all(
        req.body.content.map(async (image) => {
          const a = image.value.replace("data:" + image.type + ";base64,", "");
          await fs.promises.writeFile("./" + image.name, a, "base64");
          const response = await cloudinary.uploader.upload("./" + image.name, {
            upload_preset: "x1d4nhbe",
          });
          await fs.promises.unlink("./" + image.name);
          return response.url;
        })
      );
      insert = await Comment.insertMany([{ text: req.body.text, content: result, owner: req.user.id }]);
    } else insert = await Comment.insertMany([{ text: req.body.text, owner: req.user.id }]);

    const update = await Post.updateOne({ _id: req.body.postId }, { $push: { comments: insert[0]._id } });
    res.send(JSON.stringify({ result: "Done", comment: insert[0] }));
  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ result: "error in server" }));
  }
});

app.listen(5000, () => {
  console.log("Server Started on localhost:5000/ !!");
});
