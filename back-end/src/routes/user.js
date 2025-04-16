const express = require("express")
const router = express.Router()
const prisma = require('../../prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//============Routers to create=====================

// Login Funtion
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
    
    const token = jwt.sign({ id: user.id}, process.env.JWT)
    console.log("post prima user =>", user)
    res.status(200).json({
        successMessage: "you gots a user :)",
        token: token
    })
})


// get all users

// get user by id

// create a user

// delete a user

// update a user by id




module.exports = router