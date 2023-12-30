const Panier = require('../models/panier.js');

// Créer un nouveau panier
exports.createPanier = async (req, res) => {
    const { quantite } = req.body;
    const { user_id, product_id } = req.params
    try {
        const newPanier = new Panier({ user_id, product_id, quantite });
        await newPanier.save();
        return res.status(201).json({ payload: "Panier créé avec succès" });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la création du panier" });
    }
};

// Afficher tous les paniers
exports.getAllPaniers = async (req, res) => {
    try {
        const paniers = await Panier.find();
        let data;
        if (paniers && !paniers.length) {
            data = "Aucune donnée trouvée";
        } else {
            data = paniers;
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la récupération des paniers" });
    }
};

// Afficher un panier
exports.getOnePanier = async (req, res) => {
    try {
        const panier = await Panier.findOne({ _id: req.params.id });
        let data;
        if (panier) {
            data = panier;
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la récupération du panier" });
    }
};

// Mettre à jour les données d'un panier
exports.updatePanier = async (req, res) => {
    try {
        const panier = await Panier.findByIdAndUpdate(
            { _id: req.params.id },
            { user_id: req.params.user_id, product_id: req.params.product_id, quantite: req.body.quantite },
            { new: true }
        );
        let data;
        if (panier) {
            data = panier;
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la mise à jour du panier" });
    }
};

// Supprimer un panier
exports.deletePanier = async (req, res) => {
    try {
        const panier = await Panier.findByIdAndDelete({ _id: req.params.id });
        let data;
        if (panier) {
            data = "Panier supprimé avec succès";
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la suppression du panier" });
    }
};
