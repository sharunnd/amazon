const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:String,
    body:String,
    userID:String
},{
    versionKey: false
})

const PostModel = mongoose.model("post",postSchema)

module.exports =  {
    PostModel
}