const Categorie = require('../models/categorie.js');

// Ajouter une nouvelle catégorie
exports.createCategorie = async (req, res) => {
    const { nom } = req.body;
    try {
        const newCategorie = new Categorie({ nom });
        // Tester si la catégorie existe déjà
        const exist = await Categorie.findOne({ nom, isActive: true });
        if (exist) {
            return res.status(200).json({ errors: [{ msg: "Category already exists" }] });
        }
        // Si non
        await newCategorie.save();
        return res.status(201).json({ payload: "Category created" });
    } catch (error) {
        return res.status(500).json({ payload: "Error adding category" });
    }
};

// Afficher toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.find({ isActive: true });
        let data;
        // Tester si la collection des catégories est vide
        if (categories && !categories.length) {
            data = "No Data Found";
        }
        // Si non
        else {
            data = categories;
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error getting categories" });
    }
};

// Afficher une catégorie
exports.getOneCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findOne({ _id: req.params.id, isActive: true });
        let data;
        if (categorie) {
            data = categorie;
        } else {
            data = "No Data Found";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error getting category" });
    }
};

// Mise à jour des données d'une catégorie
exports.updateCategorie = async (req, res) => {
    try {
        const exist = await Categorie.findOne({ nom: req.body.nom, isActive: true });
        if (exist) {
            return res.status(200).json({ errors: [{ msg: "Can't update this category" }] });
        }
        const categorie = await Categorie.findByIdAndUpdate(
            { _id: req.params.id, isActive: true },
            { nom: req.body.nom },
            { new: true }
        );
        let data;
        if (categorie) {
            data = categorie;
        } else {
            data = "No Data Found";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error updating category" });
    }
};

// Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
    try {
        const categorie = await Categorie.findByIdAndUpdate({ _id: req.params.id }, { isActive: false });
        let data;
        if (categorie) {
            data = "Category is deleted";
        } else {
            data = "No Data Found";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error deleting category" });
    }
};
