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

  userRouter.post("/register",  async(req, res) => {
    const {name,email,mobile,password,address} =req.body
    console.log(req.body)
    try {
      let userExist = await UserModel.findOne({email})
      if(userExist){
        res.status(200).json({msg:"User already exist, please login"})
      }else{
        bcrypt.hash(password, 5, async(err,hash)=>{
          console.log("hash")
            if(err){
                res.send(err)
            }else{
                const user = new UserModel({
                    name,email,address,mobile,
                    password:hash
                });
                await user.save();
                res.status(200).send({ msg: "New user registered", newUser: req.body });
            }
        })
      }
    
      
    } catch (error) {
      res.status(400).send({"err":error});
    }
  });
  
userRouter.post("/login", async(req,res)=>{
    let {email,password}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                res.status(400).send({ msg: "please try again later" });
            }else
            if(result == true){
                const token = jwt.sign({user:user},process.env.secretKey,{expiresIn:3600})
                res.status(200).send({ msg: "Login successfull", "token":token, "name":user.name, "address": user.address,"email":user.email, "mobile":user.mobile });
            }else{
              res.status(400).send({ msg: "invalid credential" });
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