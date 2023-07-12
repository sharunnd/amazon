const jwt = require("jsonwebtoken")
const { BlackListModel } = require("../model/blacklist.model")

const auth = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]

    if(token){
        const blacklist = await BlackListModel.findOne({token})
        if(blacklist){
           return res.json({msg:"please login!"})
        }
        try {
            const decoded = jwt.verify(token, 'mock');
            if(decoded){
                req.body.userID = decoded.userID;
                next()
            }else{
                res.json({msg:"Not Authorized!"})
            }
        } catch (err) {
            res.json({error:err.message})
        }
    }else{
        res.status(400).json({msg:"Invalid Token"})
    }
}

module.exports = {
    auth
}