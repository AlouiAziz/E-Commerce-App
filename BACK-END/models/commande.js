const mongoose = require("mongoose");

let commandeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    products: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        quantite: {
            type: Number,
            required: true,
        },
        prixUnitaire: {
            type: Number,
            required: true,
        },
    }],
    prixTotale: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    etat: {
        type: String,
        enum: ["Done", "Canceled"],
        required: true,
    },
});

module.exports = mongoose.model("Commande", commandeSchema);
