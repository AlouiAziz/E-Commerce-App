const mongoose = require("mongoose");

let commentaireSchema = new mongoose.Schema({
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
    commentaire: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    note: {
        type: Number,
        default: 4,
        required: true,
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    }
});

module.exports = mongoose.model("Commentaire", commentaireSchema);
