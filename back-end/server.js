const express = require('express')
const app = express()
const prisma = require("prisma")

app.use(express.json())

//=============user routes===================
const userRouter = require('.src/routes/user')
app.use("/user", userRouter)

//=============review routes=================
const reviewRouter = require(".src/routes/review")
app.use("/review", reviewRouter)


app.listen(3000, ()=> {
    console.log("server running on port 3000")
})