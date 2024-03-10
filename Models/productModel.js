const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    id: Number,
    imageUrl: String,
    imageUrlTwo: String,
    productName: String,
    productCode: String,
    type: String,
    productPrice: Number,
    rating: Number,
    prodDesc: String,
    desc: String,
    imageUrlThr: String,
    iconNames: String,
    imageUrlFor: String,
    imageUrlFive: String,
    
},{
    versionKey:false
})

const ProductModel = mongoose.model("product", productSchema)

module.exports={
    ProductModel
}