const express = require("express")
const {UserModel} = require("../Models/userModel")
const bcrypt = require("bcrypt")
const {auth} = require("../Middleware/auth")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {blacklist} = require("../blacklist")

const userRouter = express.Router()

userRouter.get("/",auth, (req,res)=>{
  res.send({msg:"user data..."})
})

  userRouter.post("/register",  (req, res) => {
    const {name,email,mobile,passoword,address} =req.body
    try {
    bcrypt.hash(passoword, 5, async(err,hash)=>{
        if(err){
            res.send(err)
        }else{
            const user = new UserModel({
                name,email,address,mobile,
                passoword:hash
            });
            await user.save();
            res.status(200).send({ msg: "New user registered", newUser: req.body });
        }
    })
      
    } catch (error) {
      res.status(400).send({"err":error});
    }
  });
  
userRouter.post("/login", async(req,res)=>{
    let {email,passoword}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
        bcrypt.compare(passoword, user.passoword, (err, result)=>{
            if(err){
                res.status(400).send({ msg: "please try again later" });
            }else
            if(result == true){
                const token = jwt.sign({user:user},process.env.secretKey,{expiresIn:3600})
                res.status(200).send({ msg: "Login success ","token":token });
            }else{
              res.status(400).send({ msg: "please try again later" });
            }

        })
        }else{
      res.status(400).send({ msg: "invalid credential" });

        }
    } catch (error) {
        console.log(error)
    }
})

userRouter.get("/logout",(req,res)=>{
  const token = req.headers.authorization?.split(" ")[1]
  try {
    blacklist.push(token)
    res.status(200).send({ msg: "logout"});

  } catch (error) {
    res.status(400).send({ "error": error});
    
  }
})
  module.exports={
    userRouter
  }