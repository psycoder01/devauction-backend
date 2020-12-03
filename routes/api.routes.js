const express = require('express');
const app = express();

//Importing other routes
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');
const authRouter = require('./auth.routes');

app.use("/user",userRouter);
app.use("/post",postRouter);
app.use("/auth",authRouter);


module.exports = app;
