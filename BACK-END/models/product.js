const mongoose = require("mongoose")

let productSchema = new mongoose.Schema({
    nom: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    prix: {
        type: Number,
        require: true
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        require: true
    },
    stock: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    }
})

module.exports = mongoose.model("Product", productSchema);