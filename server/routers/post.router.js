const express = require("express");
const PostModel = require("../models/post.model");
const router = express.Router();

//Gets all posts  FUNKAR!!!
router.get("/api/post", async (req, res) => {
  const docs = await PostModel.find({});
  res.status(200).json(docs);
});

// Get specific posts for one user
router.get("/api/post/:id", async (req, res) => {
  // Kanske ????
  const docs = await PostModel.find({});
  res.status(200).json(docs);

  //if logged in
});

//Create post FUNKAR!!!!
router.post("/api/post", async (req, res) => {
  if (req.session) {
    if (req.session.user) {
      console.log(req.session.user)
      
      const newPost = {
        userId: req.session.user,
        username: req.body.username,
        text: req.body.text,
        created: new Date(),
      };

      const doc = await PostModel.create(newPost);
      res.status(201).json(doc);
      return;
    }
  }

  res.status(500).json("No logged in user...");
});

// Uppdatera en post- texten!!
router.put(("/api/post/:id"), async (req, res) => {
  if (!req.session.user) {
    return res.status(400).json("You are not logged in");
  }
  const post = await PostModel.findOne({ _id: req.params.id });

  if (req.session.user !== post.userId.toString()) {
    return res.status(400).json("This is not your post!");
  } else {
    const updatedPost = new PostModel(Object.assign(post, req.body));
    await updatedPost.save();
    res.json("Post updated");
  }
});


//Delete post FUNKAR!!!!!!
router.delete("/api/post/:id", async (req, res) => {
  const doc = await PostModel.findOne({ _id: req.params.id });

  if (doc) {
    await doc.remove();
    res.status(201).json(doc);
  } else {
    res.status(404).json("Post does not exist");
  }
});

module.exports = router;
