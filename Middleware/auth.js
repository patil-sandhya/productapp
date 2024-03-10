const jwt = require("jsonwebtoken")
const { blacklist } = require("../blacklist")
require("dotenv").config()

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        if(blacklist.includes(token)){
            res.send({"msg":"You have been logout"})
        }
        jwt.verify(token, process.env.secretKey, (err,decoded)=>{
            if(decoded){
              next()
            }else{
              res.send(err)
            }
          })
    }else{
        res.send({"msg": "You are not authorised"})
    }
    
}

module.exports={
    auth
}

