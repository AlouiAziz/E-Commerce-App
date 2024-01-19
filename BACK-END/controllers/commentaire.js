const Commentaire = require('../models/commentaire.js');

// Ajouter un nouveau commentaire
exports.createCommentaire = async (req, res) => {
    const { commentaire, user_id, product_id } = req.body;
    try {
        const newCommentaire = new Commentaire({ user_id, product_id, commentaire });

        // Tester si le commentaire existe déjà
        const exist = await Commentaire.findOne({ user_id, commentaire, product_id, isActive: true });
        if (exist) {
            return res.status(200).json({ errors: [{ msg: "Commentaire already exists" }] });
        }

        // Si non
        await newCommentaire.save();
        return res.status(201).json({ payload: "Commentaire created" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ payload: "Error adding commentaire" });
    }
};

// Afficher tous les commentaires
exports.getAllCommentaires = async (req, res) => {
    try {
        const commentaires = await Commentaire.find({ isActive: true });
        let data;

        // Tester si la collection des commentaires est vide
        if (commentaires && !commentaires.length) {
            data = "No Data Found";
        } else {
            data = commentaires;
        }

        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error getting commentaires" });
    }
};

// Afficher tous les commentaires pour un produit

exports.getPrCommentaires = async (req, res) => {
    try {
        const commentaires = await Commentaire.find({ product_id: req.params.id, isActive: true });
        let data;

        // Tester si la collection des commentaires est vide
        if (commentaires && !commentaires.length) {
            data = "No Data Found";
        } else {
            data = commentaires;
        }

        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error getting commentaires" });
    }
};

// Afficher un commentaire
exports.getOneCommentaire = async (req, res) => {
    try {
        const commentaire = await Commentaire.findOne({ _id: req.params.id, isActive: true });
        let data;

        if (commentaire) {
            data = commentaire;
        } else {
            data = "No Data Found";
        }

        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error getting commentaire" });
    }
};

// Mise à jour des données d'un commentaire
exports.updateCommentaire = async (req, res) => {
    try {
        const date = new Date();
        const commentaire = await Commentaire.findOneAndUpdate(
            { _id: req.params.id, isActive: true },
            { ...req.body, date },
            { new: true }
        );

        let data;

        if (commentaire) {
            data = commentaire;
        } else {
            data = "No Data Found";
        }

        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error updating commentaire" });
    }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
    try {
        const commentaire = await Commentaire.findByIdAndUpdate({ _id: req.params.id }, { isActive: false });
        let data;

        if (commentaire) {
            data = "Commentaire deleted";
        } else {
            data = "No Data Found";
        }

        return res.status(200).json({ payload: data });
    } catch (error) {
        return res.status(500).json({ payload: "Error deleting commentaire" });
    }
};
