const express = require('express')
const router = express.Router()
const multer = require("multer")
const prisma = require('../../prisma')
const tokenAuth = require('../middleware/TokenAuth')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images/posts')
    },
    filename: (req, file, cb) => {
        const prefix = `${Date.now()}-UserId/${req.userId}`// FIGURE OUT HOW TO THROW POST ID ON THIS GUY
        cb(null, `${prefix}-${file.originalname}`)
    }
})

const upload = multer({ storage })


// get all posts from a community by id
router.get('/all', async (req, res) => {
    const post = await prisma.post.findMany({
        include: {
            likes: true
        }
    });
    
    if(!post){
        return res.status(404).json({
            error: "no posts found"
        })
    }
    res.status(200).json({
        successMessage: "successfully returned all posts",
        post: post
    })
})

// get the info of a single post by id 
router.get('/single/:id', async (req, res) => {
    const id = +req.params.id
    const post = await prisma.post.findUnique({ where: {id}})

    if(!post){
        return res.status(404).json({
            error: "no post with that id found :("
        })
    }
    res.status(200).json({
        successMessage: "successfully returned post",
        post: post
    })
})

// get all posts from a user by id
router.get("/user/:id", async (req, res) => {
    const userId = +req.params.id
    const post = await prisma.post.findMany({ where: {userId} })

    if(!post){
        return res.status(404).json({
            error: "no posts found"
        })
    }
    res.status(200).json({
        successMessage: "successfully returned user's posts",
        post: post
    })
})

// create a post
router.post('/create', tokenAuth, upload.single('postImage'), async (req, res) => {
    const userId = req.userId
    const { title, description, postType, communityId } = req.body;
    
    console.log("PARAMS => ", req.params)
    res.json({
        successMessage: "test"
    })
})


// edit (update) a post by id



// delete a post by id

//like toggle===========================
router.post('/:id/like', tokenAuth, async (req, res) => {
    const userId = req.userId
    const postId = +req.params.id
    const existingLike = await prisma.like.findUnique({where: {userId_postId: {userId, postId}}})
    if(existingLike){
        await prisma.like.delete({where: {userId_postId: {userId, postId}}})
        return res.json({
            successMessage: "Post Unliked",
            liked: false
        })
    } else {
        await prisma.like.create({ data: {userId, postId}})
        return res.json({
            successMessage: "Post Liked",
            liked: true
        })
    }
})

// user like verification================================
router.post('hasliked/:id', tokenAuth, async (req, res) => {
    const userId = req.userId
    const postId = +req.params.id
    const postLiked = await prisma.post.findUnique({where: {postId}})

    res.json({
        successMessage: "returned post like info",
        post: postLiked
    })
})

module.exports = router