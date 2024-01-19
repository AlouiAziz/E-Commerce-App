// Not Used

const mongoose = require("mongoose");

let panierSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Panier", panierSchema);
