const mongoose = require("mongoose");

let commandeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    }],
    date: {
        type: Date,
        default: Date.now,
    },
    etat: {
        type: String,
        enum: ["enCours", "Done", "Canceled"],
        required: true,
    },
});

module.exports = mongoose.model("Commande", commandeSchema);
