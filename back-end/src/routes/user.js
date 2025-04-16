const express = require("express")
const router = express.Router()
const prisma = require('../../prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenAuth = require('../middleware/TokenAuth')

//============Routers to create=====================

// Login Funtion ========================================
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password ) {
        return res.status(400).json({
            error: "missing email or password"
        })
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) {
        return res.status(404).json({
            error: "no user found :("
        })
    }

    const passwordCheck = await bcrypt.compare( password, user.password)
    if(!passwordCheck) {
        return res.status(401).json({
            error: "wrong password silly"
        })
    }
    
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT)
    res.status(200).json({
        successMessage: "you gots a user :)",
        token: token
    })
})

// creating account ========================================

router.post('/register', async (req, res) => {
    const { email, password, username, fName, lName } = req.body; 
    if( !email || !password || !username ) {
        return res.status(400).json({
            error: "missing email, username or password"
        })
    }
    const existingEmail = await prisma.user.findUnique({ where: { email }})

    console.log("email conflict =>", existingEmail)

    if(existingEmail){
        return res.status(400).json({
            error: "account with this email already exists"
        })
    }
    const existingUsername = await prisma.user.findUnique({ where: { username }})
    if (existingUsername) {
        return res.status(400).json({
            error: "username is already taken"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            fName,
            lName
        }
    })

    const token = jwt.sign({ id: newUser.id, isAdmin: false }, process.env.JWT)

    res.status(200).json({
        successMessage: "New User Created :)",
        token: token
    })
})

// get user info by id ==================================

router.get("/info", tokenAuth, async (req, res, next) => {
    const id = req.userId
    const isAdmin = req.isAdmin

    const allInfo = await prisma.user.findUnique({ where: { id }})
    const refinedInfo = {
        id: allInfo.id,
        email: allInfo.email,
        username: allInfo.username,
        isAdmin: allInfo.isAdmin,
        fName: allInfo.fName,
        lName: allInfo.lName
    }

    res.status(200).json({
        successMessage: "here ya go silly",
        user: refinedInfo
    })
})

// get all users

// get user by id

// create a user

// delete a user

// update a user by id




module.exports = router