const express = require("express")
const { UserModel } = require("../model/user.model")
const bcrypt = require('bcrypt');
const userRouter = express.Router()
const jwt = require('jsonwebtoken');
const { BlackListModel } = require("../model/blacklist.model");

userRouter.get("/",(req,res)=>{
    res.json({msg:"this is for mock practice"})
})

userRouter.post("/register",async(req,res)=>{
    const {email,password,name} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){ 
            res.json({msg:"User already exists!"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.json({msg:err.message})
                }else{
                    const user = new UserModel({email,name,password:hash})
                    await user.save()
                    res.json({msg:"User has been Registered"})
                }
            });  
        }
    } catch (err) {
        res.json({error:err.message})
    }
})
userRouter.post("/login", async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID: user._id }, 'mock',{
                        expiresIn:"7d"
                    });
                    res.json({msg:"Logged in",token})
                }else{
                    res.json({msg:"Wrong credentials!"})
                }
            });
        }
    } catch (err) {
        res.json({error:err.message})
    }
})

userRouter.post("/logout", async(req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1] || null;
        if(token){
            const blacklist = new BlackListModel({token})
            await blacklist.save()
            res.json({msg:"Logged out!"})
        }
    } catch (err) {
        res.json({error:err.message})
    }
})
module.exports = {
    userRouter
} 