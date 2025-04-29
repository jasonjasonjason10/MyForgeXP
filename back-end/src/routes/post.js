const express = require("express");
const router = express.Router();
const multer = require("multer");
const prisma = require("../../prisma");
const tokenAuth = require("../middleware/TokenAuth");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images/posts");
  },
  filename: (req, file, cb) => {
    const prefix = `${Date.now()}-${req.userId}`; // FIGURE OUT HOW TO THROW POST ID ON THIS GUY
    cb(null, `${prefix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// get all posts from a community by id
router.get("/all", async (req, res) => {
  const post = await prisma.post.findMany({
    include: {
      likes: true,
      user: {
        select: {
          username: true,
          avatar: true,
          id: true
        }
      }
    },
  });

  if (!post) {
    return res.status(404).json({
      error: "no posts found",
    });
  }
  res.status(200).json({
    successMessage: "successfully returned all posts",
    post: post,
  });
});

// get the info of a single post by id
// router.get("/single/:id", async (req, res) => {
//   const id = +req.params.id;
//   const post = await prisma.post.findMany({
//     where: { userId },
//     include: {
//       game: true, // JASON ADDED for getting the hero image based off youtube post
//     },
//   });

//   if (!post) {
//     return res.status(404).json({
//       error: "no post with that id found :(",
//     });
//   }
//   res.status(200).json({
//     successMessage: "successfully returned post",
//     post: post,
//   });
// });

// get all posts from a user by id
router.get("/user/:id", async (req, res) => {
  const userId = +req.params.id;
  const post = await prisma.post.findMany({
    where: { userId },
    include: { community: true }, 
  });

  if (!post) {
    return res.status(404).json({
      error: "no posts found",
    });
  }
  res.status(200).json({
    successMessage: "successfully returned user's posts",
    post: post,
  });
});


// get all posts from a user by id
router.get("/user/:id", async (req, res) => {
  const userId = +req.params.id;
  const post = await prisma.post.findMany({ where: { userId } });

  if (!post) {
    return res.status(404).json({
      error: "no posts found",
    });
  }
  res.status(200).json({
    successMessage: "successfully returned user's posts",
    post: post,
  });
});

// grab post by community id
router.get("/game/:id", async (req, res) => {
  const id = +req.params.id;
  const postList = await prisma.post.findMany({
    where: {
      communityId: id,
    },
  });
  res.json({
    posts: postList,
  });
});

// create a post
router.post(
  "/create",
  tokenAuth,
  upload.single("content"),
  async (req, res, next) => {
    try {
      const userId = req.userId;
      if (!userId)
        return res.status(400).json({
          error: "No user ID uploaded, maybe check if you are logged in?",
        });

      const { title, description, PostType } = req.body;

      const communityId = +req.body.communityId;
      if (!communityId)
        return res.status(400).json({ error: "No community ID uploaded" });

      let postData = { ...req.body, userId, communityId };

      if (req.file) postData.content = `/images/posts/${req.file.filename}`;

      if (!description || description === "") {
        postData.description = null;
      }

      const createPost = await prisma.post.create({ data: postData });
      res
        .status(200)
        .json({ successMessage: "Post CREATED !", post: createPost });
    } catch (error) {
      next(error);
    }
  }
);

// edit (update) a post by id
router.patch("/edit", tokenAuth, async (req, res, next) => {
  try {
  } catch (error) {}
});

// delete a post by id
router.delete("/delete", tokenAuth, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//like toggle===========================
router.post("/:id/like", tokenAuth, async (req, res) => {
  const userId = req.userId;
  const postId = +req.params.id;
  const existingLike = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });
  if (existingLike) {
    await prisma.like.delete({ where: { userId_postId: { userId, postId } } });
    return res.json({
      successMessage: "Post Unliked",
      liked: false,
    });
  } else {
    await prisma.like.create({ data: { userId, postId } });
    return res.json({
      successMessage: "Post Liked",
      liked: true,
    });
  }
});

// user like verification================================
router.post("/hasliked/:id", tokenAuth, async (req, res) => {
  const userId = req.userId;
  const postId = +req.params.id;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { likes: true },
  });

  const relationExists = post.likes.some((like) => like.userId === userId);

  res.json({
    successMessage: "returned post like info",
    boolean: relationExists,
  });
});

module.exports = router;
