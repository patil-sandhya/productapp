const express = require("express")
const {ProductModel} = require("../Models/productModel")

const productRouter = express.Router()

productRouter.get("/product", async (req, res) => {
    try {
        const { _page, _limit, _sort, _order } = req.query;
        const options = {
            skip: (_page - 1) * _limit, 
            limit: parseInt(_limit), 
           sort: { [_sort]: parseInt(_order) } 
          };
          const products = await ProductModel.find({}, null, options);
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Get single product
  productRouter.get("/product/:id", async(req,res)=>{
    
  })
  
  productRouter.post("/addproduct", async (req, res) => {
    try {
      const user = new ProductModel(req.body);
      await user.save();
      res.status(200).send({ msg: "New Product Created", newProduct: req.body });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  module.exports ={
    productRouter
  }