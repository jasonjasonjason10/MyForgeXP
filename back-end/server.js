const path = require("path");
const cors = require("cors");

const express = require("express");
const app = express();
// const prisma = require("prisma")

app.use(cors({origin: ['https://forgexp-server.onrender.com', 'https://forgexp.onrender.com']}));
app.use(express.json());
app.use(require("morgan")("dev"));



//=============user routes===================

const userRouter = require("./src/routes/user");
app.use("/user", userRouter);

//===========================================

const followRouter = require("./src/routes/follow")
app.use("/user", followRouter);

//=============favorite routes=================

const favoritesRouter = require("./src/routes/favorites");
app.use("/user", favoritesRouter);

//=============posts routes=================

const postRouter = require("./src/routes/post");
app.use("/post", postRouter);

//=============game-community routes=================

const gameRouter = require("./src/routes/games");
app.use("/games", gameRouter);

//=============comments routes=================

const commentsRouter = require("./src/routes/comments");
app.use("/post", commentsRouter);

app.use(
  "/images/pfp",
  express.static(path.join(__dirname, "src", "images", "pfp"))
);
app.use(
  "/images/posts",
  express.static(path.join(__dirname, "src", "images", "posts"))
);
app.use(
  "/images/games",
  express.static(path.join(__dirname, "src", "images", "games"))
);

app.use(express.static(path.join(__dirname, '../front-end/dist')));

app.get(/.*/, async(req, res, next) => {
  res.sendFile(path.join(__dirname, '../front-end/dist/index.html'));
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});

