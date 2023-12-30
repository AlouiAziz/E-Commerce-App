const Commande = require('../models/commande.js');

// Créer une nouvelle commande
exports.createCommande = async (req, res) => {
    const { products, etat } = req.body;
    const { user_id } = req.params;
    try {
        const newCommande = new Commande({ user_id, products, etat });
        await newCommande.save();
        return res.status(201).json({ payload: "Commande créée avec succès" });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la création de la commande" });
    }
};

// Afficher toutes les commandes
exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find();
        let data;
        if (commandes && !commandes.length) {
            data = "Aucune donnée trouvée";
        } else {
            data = commandes;
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la récupération des commandes" });
    }
};

// Afficher une commande
exports.getOneCommande = async (req, res) => {
    try {
        const commande = await Commande.findOne({ _id: req.params.id });
        let data;
        if (commande) {
            data = commande;
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la récupération de la commande" });
    }
};

// Mettre à jour les données d'une commande
exports.updateCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndUpdate(
            { _id: req.params.id },
            { user_id: req.body.user_id, products: req.body.products, etat: req.body.etat },
            { new: true }
        );
        let data;
        if (commande) {
            data = commande;
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la mise à jour de la commande" });
    }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
    try {
        const commande = await Commande.findByIdAndUpdate({ _id: req.params.id }, { etat: "Canceled" });
        let data;
        if (commande) {
            data = "Commande supprimée avec succès";
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la suppression de la commande" });
    }
};
