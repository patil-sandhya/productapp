const express = require("express")
const cors = require("cors")
const {userRouter} = require("./Route/userRoute")
const {productRouter} = require("./Route/productRoute")
require("dotenv").config()
const {connection} = require("./db")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/user", userRouter)
app.use("/product", productRouter)
app.get("/", (req,res)=>{
    res.send("hello")
})

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("server is running")
        console.log("mongodb is connected")
    } catch (error) {
        console.log(error)
    }
})