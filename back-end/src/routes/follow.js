const express = require("express");
const tokenAuth = require("../middleware/TokenAuth");
const prisma = require("../../prisma");
const router = express.Router();

// Create a follower relation =============
router.post("/follow/:id", tokenAuth, async (req, res) => {
  const userId = req.userId;
  const followedById = +req.params.id;

  const existingRelation = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: followedById,
      },
    },
  });
  if (existingRelation) {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followedById,
        },
      },
    });
    res.json({
      successMessage: `user:${userId} => unfollowed => user:${followedById}`,
      isFollowed: false,
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: followedById,
      },
    });
    res.json({
      successMessage: `user:${userId} => followed => user:${followedById}`,
      isFollowed: true,
    });
  }
});

router.post("/following", tokenAuth, async (req, res) => {
  const id = req.userId;
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    return res.status(404).json({
      error: "no user found",
    });
  }
  const following = await prisma.follow.findMany({
    where: {
      followerId: id,
    },
    include: {
      following: true,
    },
  });
  const result = following.map((f) => {
    return f.following;
  });
  if (result.length === 0) {
    return res.status(404).json({
      error: "no users followed",
    });
  }
  res.json({
    successMessage: `list of users user:${id} is following`,
    following: result,
  });
});

router.post("/followed", tokenAuth, async (req, res) => {
  const id = req.userId;
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) {
    return res.status(404).json({
      error: "no user found",
    });
  }
  const followedBy = await prisma.follow.findMany({
    where: {
      followingId: id,
    },
    include: {
      follower: true,
    },
  });
  const result = followedBy.map((f) => {
    return f.follower;
  });
  if (result.length === 0) {
    res.status(404).json({
      error: "no users following",
    });
  }
  res.json({
    successMessage: `list of users user:${id} is followed by`,
    followedBy: result,
  });
});

// !!! 1/3 ADDED BY JASON!!!//  GET /user/follow/counts/:id  (THIS returns number of followers & following to display on a users profile)
router.get("/follow/counts/:id", async (req, res) => {
  const id = +req.params.id;

  try {
    const followers = await prisma.follow.count({
      where: { followingId: id },
    });

    const following = await prisma.follow.count({
      where: { followerId: id },
    });

    res.status(200).json({
      successMessage: "Follow counts retrieved successfully",
      followers,
      following,
    });
  } catch (err) {
    console.error("Error getting follow counts:", err);
    res.status(500).json({ error: "Failed to get follow counts" });
  }
});

// !!! 2/3 ADDED BY JASON!!!//  (This is to check to fetch if the logged-in user is following this use so that the button will display "Following")
router.get("/isfollowing/:id", tokenAuth, async (req, res) => {
  const userId = req.userId;
  const targetId = +req.params.id;

  const existingRelation = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: targetId,
      },
    },
  });

  res.json({ isFollowing: !!existingRelation });
});

// !!! 3/3 ADDED BY JASON!!!// (This is a get route that accepts a user ID for displaying a users current followers when modal pops up in single user upon clicking "Followers")
router.get("/followed/:id", async (req, res) => {
  const id = +req.params.id;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }

  const followers = await prisma.follow.findMany({
    where: { followingId: id },
    include: { follower: true },
  });

  const result = followers.map((f) => f.follower);

  res.json({
    successMessage: `Users who follow user ${id}`,
    followers: result,
  });
});

module.exports = router;
