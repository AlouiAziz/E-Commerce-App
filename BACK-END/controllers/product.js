const Product = require('../models/product.js')

// Ajouter un nouveau produit

exports.createProduct = async (req, res) => {
    const { nom, description, prix, categorie, stock, image, } = req.body;
    try {
        const newProduct = new Product(req.body)
        // Teter si le produit existe déja
        const exist = await Product.findOne({ nom: req.body.nom, isActive: true })
        if (exist) { return res.status(200).json({ errors: [{ msg: "Product already exsit" }] }) }
        // si non
        await newProduct.save()
        return res.status(201).json({ payload: "Product created" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ payload: "Error adding product" })
    }
}

// Afficher tous les produits

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
        let data
        // Tester si la collection des produits est vide
        if (products && !products.length) { data = "No Data Found" }
        // Si non
        else { data = products }
        return res.status(200).json({ payload: data })
    } catch (error) {
        return res.status(500).json({ payload: "Error getting products" })
    }
}

// Afficher un produit

exports.getOneProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, isActive: true })
        let data
        if (product) { data = product }
        else { data = "No Data Found" }
        return res.status(200).json({ payload: data })
    } catch (error) {
        return res.status(500).json({ payload: "Error getting product" })
    }
}

// Mise à jour des données d'un produit

exports.updateProduct = async (req, res) => {
    try {
        const exist = await Product.findOne({ nom: req.body.nom, isActive: true })
        if (exist) { return res.status(200).json({ errors: [{ msg: "Can't update this product" }] }) }
        const product = await Product.findByIdAndUpdate({ _id: req.params.id, isActive: true }, req.body, { new: true })
        let data
        if (product) { data = product }
        else { data = "No Data Found" }
        return res.status(200).json({ payload: data })
    } catch (error) {
        return res.status(500).json({ payload: "Error updating product" })
    }
}

// Supprimer un produit 

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
        let data
        if (product) { data = "Product id deleted" }
        else { data = "No Data Found" }
        return res.status(200).json({ payload: data })
    } catch (error) {
        return res.status(500).json({ payload: "Error deleting product" })
    }
}