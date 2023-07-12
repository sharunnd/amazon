const express = require("express");
const { userRouter } = require("./routes/user.rotes");
const { connectDB } = require("./db");
const { postRouter } = require("./routes/post.routes");
require("dotenv").config()

const app = express()
app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)


connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        try {
            console.log(`Server running at port ${process.env.PORT}`);
        } catch (error) {
            console.log(error);
            console.log("Something went wrong");
        }
    })
})