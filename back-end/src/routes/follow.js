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
    if(existingRelation){
        await prisma.follow.delete({
            where: {followerId_followingId: {
                followerId: userId, 
                followingId: followedById
            }}
        })
        res.json({
            successMessage: `user:${userId} => unfollowed => user:${followedById}`,
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
    const existingUser = await prisma.user.findUnique({where: {id}})
    if(!existingUser){
        return res.status(404).json({
            error: "no user found"
        })
    }
    const following = await prisma.follow.findMany({
        where: {
            followerId: id
        },
        include: {
            following: true
        }
    })
    const result = following.map(f => {
        return f.following
    })
    if(result.length === 0){
        return res.status(404).json({
            error: "no users followed"
        })
    }
    res.json({
        successMessage: `list of users user:${id} is following`,
        following: result
    })
})

router.post('/followed', tokenAuth, async (req, res) => {
    const id = req.userId
    const existingUser = await prisma.user.findUnique({where: {id}})
    if(!existingUser){
        return res.status(404).json({
            error: "no user found"
        })
    }
    const followedBy = await prisma.follow.findMany({
        where: {
            followingId: id
        },
        include: {
            follower: true
        }
    })
    const result = followedBy.map((f) => {
        return f.follower
    })
    if(result.length === 0){
        res.status(404).json({
            error: "no users following"
        })
    }
    res.json({
        successMessage: `list of users user:${id} is followed by`,
        followedBy: result
    })
})

module.exports = router