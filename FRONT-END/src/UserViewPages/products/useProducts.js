// Ce code est à optimiser pour mettre chaque api dans un fichier.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useProducts = () => {

    // définition des states utilisées

    const [products, setProducts] = useState([])
    const [productSelected, setProductSelected] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

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

    useEffect(() => {
        getAllProducts()
    }, [])

    return {
        getAllProducts,
        getOneProduct,
        setProducts,
        isLoading,
        productSelected,
        products,
        error,
    };
}

export default useProducts