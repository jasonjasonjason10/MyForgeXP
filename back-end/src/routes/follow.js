const express = require('express')
const tokenAuth = require('../middleware/TokenAuth')
const prisma = require('../../prisma')
const router = express.Router()

// Create a follower relation =============
router.post('/follow/:id', tokenAuth, async (req, res) => {
    const userId = req.userId
    const followedById = +req.params.id

    const existingRelation = await prisma.follow.findUnique({
        where: {followerId_followingId: {
            followerId: userId,
            followingId: followedById
        }}
    })
    console.log("existing const => ", existingRelation)
    if(existingRelation){
        await prisma.follow.delete({
            where: {followerId_followingId: {
                followerId: userId, 
                followingId: followedById
            }}
        })
        res.json({
            successMessage: `user:${userId} => unfollcowed => user:${followedById}`,
            isFollowed: false
        })
    } else {
        await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: followedById
            }
        })
        res.json({
            successMessage: `user:${userId} => followed => user:${followedById}`,
            isFollowed: true
        })
    }
})

router.post('/following', tokenAuth, async (req, res) => {
    const id = req.userId

    const following = await prisma.follow.findMany({
        where: {
            followerId: id
        },
        include: {
            following: true
        }
    })
    if(!following){
        return res.statusCode(404).json({
            error: "no users found"
        })
    }
    const result = following.map(f => {
        return f.following
    })
    res.json({
        successMessage: `list of users user:${id} is following`,
        following: result
    })
})

router.post('/followed', tokenAuth, async (req, res) => {
    const id = req.userId

    const followedBy = await prisma.follow.findMany({
        where: {
            followingId: id
        },
        include: {
            follower: true
        }
    })
    if(!followedBy){
        return res.statusCode(404).json({
            error: "no users found"
        })
    }
    const result = followedBy.map((f) => {
        return f.follower
    })
    res.json({
        successMessage: `list of users user:${id} is followed by`,
        followedBy: result
    })
})

module.exports = router