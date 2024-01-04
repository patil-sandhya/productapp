const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    picture: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

const ProductModel = mongoose.model("product", productSchema)

module.exports = {
    ProductModel
}

// const productSchema = mongoose.Schema({
//     name: { type: String, required: true, minlength: 1, maxlength: 50 },
//     picture: { type: String, required: true },
//     description: { type: String, required: true },
//     gender: { type: String, required: true },
//     category: { type: String, required: true },
//     price: { type: Number, required: true },
//     created_at: { type: Date, default: Date.now },
//     updated_at: { type: Date, default: Date.now }
// })