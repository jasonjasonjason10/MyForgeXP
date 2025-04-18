const cors = require("cors");

const express = require('express')
const app = express()
// const prisma = require("prisma")

app.use(cors());
app.use(express.json())
app.use(require('morgan')('dev'))

//=============user routes===================

const userRouter = require('./src/routes/user')
app.use("/user", userRouter)

//=============favorite routes=================

const favoritesRouter = require('./src/routes/favorites')
app.use('/user')

//=============comments routes=================

const commentsRouter = require('./src/routes/comments')
app.use('/post')

app.listen(3000, () => {
  console.log("server running on port 3000");
});
