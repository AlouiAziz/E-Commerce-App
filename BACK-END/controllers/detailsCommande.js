const DetailsCommande = require('../models/detailsCommande.js');

// Créer un nouveau détail de commande
exports.createDetailsCommande = async (req, res) => {
    const { product_id, quantite, prixUnitaire, prixTotale } = req.body;
    const { user_id } = req.params
    try {
        const newDetailsCommande = new DetailsCommande({ user_id, product_id, quantite, prixUnitaire, prixTotale });
        await newDetailsCommande.save();
        return res.status(201).json({ payload: "Détail de commande créé avec succès" });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la création du détail de commande" });
    }
};

// Afficher tous les détails de commande
exports.getAllDetailsCommandes = async (req, res) => {
    try {
        const detailsCommandes = await DetailsCommande.find();
        let data;
        if (detailsCommandes && !detailsCommandes.length) {
            data = "Aucune donnée trouvée";
        } else {
            data = detailsCommandes;
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la récupération des détails de commande" });
    }
};

// Afficher un détail de commande
exports.getOneDetailsCommande = async (req, res) => {
    try {
        const detailsCommande = await DetailsCommande.findOne({ _id: req.params.id });
        let data;
        if (detailsCommande) {
            data = detailsCommande;
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la récupération du détail de commande" });
    }
};

// Mettre à jour les données d'un détail de commande
exports.updateDetailsCommande = async (req, res) => {
    try {
        const detailsCommande = await DetailsCommande.findByIdAndUpdate(
            { _id: req.params.id },
            { user_id: req.body.user_id, product_id: req.body.product_id, quantite: req.body.quantite, prixUnitaire: req.body.prixUnitaire, prixTotale: req.body.prixTotale },
            { new: true }
        );
        let data;
        if (detailsCommande) {
            data = detailsCommande;
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la mise à jour du détail de commande" });
    }
};

// Supprimer un détail de commande
exports.deleteDetailsCommande = async (req, res) => {
    try {
        const detailsCommande = await DetailsCommande.findByIdAndDelete({ _id: req.params.id });
        let data;
        if (detailsCommande) {
            data = "Détail de commande supprimé avec succès";
        } else {
            data = "Aucune donnée trouvée";
        }
        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Erreur lors de la suppression du détail de commande" });
    }
};
