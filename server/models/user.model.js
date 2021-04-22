const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
    unique: true,
  },
  password: "String",
}); //fråga victor

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

