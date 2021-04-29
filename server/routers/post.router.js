const express = require("express");
const PostModel = require("../models/post.model");
const router = express.Router();
const secure = require("../middleware/secure");

//Hämtar alla våra posts
router.get("/api/post", async (req, res) => {
  const docs = await PostModel.find({});
  res.status(200).json(docs);
});

// Hämtar en specifik post för en användare
router.get("/api/post/:id", async (req, res) => {

  const docs = await PostModel.find({});
  res.status(200).json(docs);
});

//Skapar en post
router.post("/api/post", secure, async (req, res) => {

  let current_date = new Date();
  let minute = String(current_date.getMinutes());

  if (minute < 10) {
    minute = "0" + minute;
  }

  let formatted_date =
    current_date.getDate() +
    "/" +
    (current_date.getMonth() + 1) +
    "/" +
    current_date.getFullYear() +
    " " +
    current_date.getHours() +
    ":" +
    minute;

  const newPost = new PostModel({
    userId: req.session.user,
    username: req.session.username,
    text: req.body.text,
    created: formatted_date,
  });

  if (newPost.text.length > 0) {
    const doc = await PostModel.create(newPost);
    return res.status(201).json(doc);
  } else {
    return res.status(404).json("Nunununununu yu haverur tu writur sumethingur");
  }
})

// Uppdaterar en post
router.put("/api/post/:id", secure, async (req, res) => {
  const post = await PostModel.findOne({ _id: req.params.id });

  if (req.session.user !== post.userId.toString()) {
    return res.status(400).json("This is not your post!");
  } else {
    const updatedPost = new PostModel(Object.assign(post, req.body));
    await updatedPost.save();
    res.json("Post updated");
  }
});

//Tar bort en post
router.delete("/api/post/:id", secure, async (req, res) => {

  const doc = await PostModel.findOne({ _id: req.params.id });

  if (req.session.user !== doc.userId.toString()) {
    return res.status(400).json("This is not your post!");
  }

  if (doc) {
    await doc.remove();
    res.status(201).json(doc);
  } else {
    res.status(404).json("Post does not exist");
  }
});

module.exports = router;
