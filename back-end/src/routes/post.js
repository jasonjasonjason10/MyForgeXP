require("dotenv").config();
const express = require("express");
const router = express.Router();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuid } = require("uuid");
const tokenAuth = require("../middleware/TokenAuth");

// Set up AWS S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS,           // use ACCESS from your .env
    secretAccessKey: process.env.SECRET_ACCESS        // use SECRET from your .env
  }
});

const BUCKET = process.env.S3_BUCKET;
router.use(express.json())
// Middleware for JSON parsing
router.use(express.json());

// Helper function to construct public S3 URL
function buildPublicUrl(key) {
  return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

// ✅ Secure S3 upload URL route
router.get("/generate-upload-url", tokenAuth, async (req, res, next) => {
  try {
    const { filename, fileType } = req.query;
    if (!filename || !fileType) {
      return res.status(400).json({ error: "Missing filename or fileType" });
    }

    const key = `images/posts/${uuid()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes

    res.status(200).json({
      uploadUrl,
      key,
      publicUrl: buildPublicUrl(key)
    });
  } catch (err) {
    console.error("S3 Upload URL Error:", err);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

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
    where: { communityId: id },
    include: {
      likes: true
    }
  });
  res.json({
    posts: postList,
  });
});

// create a post
router.post(
  "/create",
  tokenAuth,
  async (req, res, next) => {
    try {
      const userId = req.userId;
      console.log(userId)
      if (!userId) {
        return res.status(400).json({ error: "Not authenticated." });
      }

      const { title, description, PostType, content, communityId } = req.body;
      console.log(communityId)
      const cid = parseInt(communityId);
      console.log(cid)
      if (!cid || !title) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Base data
      const postData = {
        userId,
        communityId: cid,
        title,
        description: description || null,
        PostType,
        content: null,
      };

      // Determine content
      if (PostType === "image" || PostType === "video") {
        // content should be the S3 key
        if (!content) {
          return res
            .status(400)
            .json({ error: "Missing S3 key for image/video post." });
        }
        postData.content = buildPublicUrl(content);
      } else {
        // text post
        if (typeof content !== "string" || !content.trim()) {
          return res
            .status(400)
            .json({ error: "Missing text content for text post." });
        }
        postData.content = content.trim();
      }

      const created = await prisma.post.create({ data: postData });

      res.status(201).json({
        successMessage: "Post created successfully!",
        post: created,
      });
    } catch (err) {
      next(err);
    }
  }
);

// edit a post by id & optional file reupload & update PostType
router.patch("/edit", tokenAuth, async (req, res, next) => {
  try {
    const { postId, title, description } = req.body;

    if (!postId) {
      return res.status(400).json({ error: "Missing postId" });
    }

    const dataToUpdate = {
      title,
      description,
    };

    if (req.file) {
      dataToUpdate.content = `/images/posts/${req.file.filename}`;

      if (req.file.mimetype.startsWith("image/")) {
        dataToUpdate.PostType = "image";
      } else if (req.file.mimetype.startsWith("video/")) {
        dataToUpdate.PostType = "video";
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: dataToUpdate,
    });

    res.status(200).json({
      successMessage: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Edit post error:", error);
    next(error);
  }
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
