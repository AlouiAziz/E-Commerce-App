const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Categorie', categorieSchema);


