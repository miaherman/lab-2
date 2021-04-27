const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const postRouter = require("./routers/post.router");
const usersRouter = require("./routers/user.router");
const cookieSession = require("cookie-session");
// const cors = require("cors");

const port = 4000;
const app = express();

app.use(express.json());
app.get("/", (req, res) => res.send("Hello World"));
// app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));

app.use(
  cookieSession({
    name: "session",
    secret: "g5s6kfshj0",
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  })
);

// mongoose

app.use(postRouter);
app.use(usersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json(err.message);
});

(async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/post", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.error(error);
  }

  app.listen(port, () => {
    console.log("Server is up and running");
  });
})();
