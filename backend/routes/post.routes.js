const express = require("express")
const { PostModel } = require("../model/post.model")
const { auth } = require("../middlewares/auth.middleware")


const postRouter = express.Router()


postRouter.post("/add",auth,async(req,res)=>{
    try {
        const post = new PostModel(req.body)
        await post.save()
        res.json({msg:"Post has been added"})
    } catch (err) {
        res.json({error:err.message})
    }
})

module.exports = {
    postRouter
}

postRouter.get("/",auth,async(req,res)=>{
    const {userID} = req.body
    try {
        const posts = await PostModel.find({userID})
        res.json(posts)
    } catch (err) {
        res.json({error:err.message})
    }
})

postRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID} = req.params
    const userIDinDoc = req.body.userID
    try {
        const post = await PostModel.findOne({_id:postID})
        const userIDinPost = post.userID
        if(userIDinDoc===userIDinPost){
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.json({msg:"Post has been updated"})
        }else{
            res.json({msg:"Not Authorized"})
        }
    } catch (err) {
        res.json({error:err.message})
    }
})

postRouter.delete("/delete/:postID",auth,async(req,res)=>{
       const {postID} = req.params;
       const userIDinDoc = req.body.userID
    try {
        const post = await PostModel.findOne({_id:postID})
        const userIDinPost = post.userID   
        if(userIDinDoc === userIDinPost){
            await PostModel.findByIdAndDelete({_id:postID})
            res.json({msg:"Post has been deleted"})
        }else{
            res.json({msg:"Not Authorized"})
        }
    } catch (err) {
        res.json({error:err.message})
    }
})