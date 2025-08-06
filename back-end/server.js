const path = require("path");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

const prisma = require("./prisma"); // ✅ Moved to top so it's available earlier

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"], // Vite dev server
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// ============= Routes ================

const userRouter = require("./src/routes/user");
app.use("/user", userRouter);

const followRouter = require("./src/routes/follow");
app.use("/user", followRouter);

const favoritesRouter = require("./src/routes/favorites");
app.use("/user", favoritesRouter);

const postRouter = require("./src/routes/post");
app.use("/post", postRouter);

const gameRouter = require("./src/routes/games");
app.use("/games", gameRouter);

const commentsRouter = require("./src/routes/comments");
app.use("/post", commentsRouter);

// ============= Static image folders ================
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

// ============= ✅ TEMP SEED ROUTE ================
app.get("/seed/testpost", async (req, res) => {
  try {
    const testPost = await prisma.post.create({
      data: {
        title: "Seeded Test Post",
        description: "This is a seeded post to test the /post/all route.",
        PostType: "text",
        content: "Hello from the backend!",
        userId: 1, // you have users in your DB ✅
        communityId: 1, // you have community ID 1 ✅
      },
    });

    res.json(testPost);
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ============= Error handler ================
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

// ============= ✅ CATCH-ALL GOES LAST ================
// (Only for serving frontend after build)
app.use(express.static(path.join(__dirname, "../front-end/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
});

// ============= Start server ================
app.listen(3000, () => {
  console.log("server running on port 3000");
});
