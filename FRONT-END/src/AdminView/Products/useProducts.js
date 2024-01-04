// Ce code est à optimiser pour mettre chaque api dans un fichier.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useProducts = () => {

    // définition des states utilisées

    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [newProduct, setNewProduct] = useState({ nom: "", categorie: "658c66922b3a6f1c54058fbf", description: "", prix: "", image: "", stock: "" })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Get All Products 

    const getAllProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get("http://localhost:4000/products/getProducts")
            setProducts(response.data.payload)
        } catch (error) {
            setError('error fetching products')
            console.log("error getting all products", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Show One Product

    const getOneProduct = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`http://localhost:4000/products/getOneProduct/${id}`)
            console.log(response)
            setProductSelected(response.data.payload)
        } catch (error) {
            setError('error fetching product')
            console.log("error getting  product", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Delete Product

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`http://localhost:4000/products/deleteProduct/${id}`)
            await getAllProducts()
        } catch (error) {
            setError('Error deleting Product')
            console.log('Error deleting Product', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Add Product 

    const addProduct = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:4000/products/addProduct', newProduct)
            await getAllProducts()
        } catch (error) {
            setError('Error adding Product')
            console.log('Error adding Product', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Update Product 

    const updateProduct = async (id, newProductDetails) => {
        try {
            setIsLoading(true)
            const response = await axios.put(`http://localhost:4000/products/updateProduct/${id}`, newProductDetails)
            getAllProducts()
        } catch (error) {
            setError('Error Updating Product')
            console.log('Error Updating Product', error)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getAllProducts()
    }, [])

    return { getAllProducts, getOneProduct, deleteProduct, addProduct, updateProduct, isLoading, productSelected, products, error, handleShow, handleClose, show, setNewProduct, newProduct }
}

export default useProducts