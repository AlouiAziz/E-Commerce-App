const mongoose = require("mongoose");

let detailsCommandeSchema = new mongoose.Schema({
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
    prixUnitaire: {
        type: Number,
        required: true,
    },
    prixTotale: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("DetailsCommande", detailsCommandeSchema);
