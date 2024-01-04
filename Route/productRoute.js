const express = require("express")
const {ProductModel} = require("../Model/ProductModel")
const {auth} = require("../Middleware/auth")
const productRouter = express.Router()

productRouter.get("/api/products", async(req,res)=>{
    try {
        const Product = await ProductModel.find(req.query)
        res.status(200).send(Product)
    } catch (error) {
        console.log(error)
    }
})

productRouter.get("/api/products/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const Product = await ProductModel.find({_id:id})
        res.status(200).send(Product)
    } catch (error) {
        console.log(error)
    }
})


productRouter.post("/api/products", auth, async(req,res)=>{
    try {
        const newpost = new ProductModel(req.body)
        await newpost.save()
        res.status(200).send({msg:"Product created", Product: req.body})
    } catch (error) {
        console.log(error)
    }
})

productRouter.patch("/api/products/:id",auth, async(req,res)=>{
    let {id} = req.params
    try {
        await ProductModel.findByIdAndUpdate({_id: id}, req.body)
        res.status(200).send({msg: "Product Updated"})
    } catch (error) {
        console.log(error)
    }
})

productRouter.delete("/api/products/:id",auth, async(req,res)=>{
    let {id} = req.params
    try {
        await ProductModel.findByIdAndDelete({_id: id}, req.body)
        res.status(200).send({msg: "Product Deleted"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
    productRouter
}