const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
  username: { type: "String", required: true },
  text:  { type: "String", required: true },
  created: { type: Date, required: true }
});

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;