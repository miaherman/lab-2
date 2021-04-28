const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true) //stoppar varningen

const userSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
    unique: true
  },
  password: { type: "String", select: false }, //gör att man ej kan sno lösen :) = bra, secyrityr firstur
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

