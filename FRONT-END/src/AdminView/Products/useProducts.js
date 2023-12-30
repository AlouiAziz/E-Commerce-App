import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useProducts = () => {

    // définition des states utilisées

    const [products, setProducts] = useState([])
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [newProduct, setNewProduct] = useState({ nom: "", desription: "", prix: "", categorie: "", image: "", stock: "" })
    const [productSelected, setProductSelected] = useState()
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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









    useEffect(() => {
        getAllProducts()
    }, [])

    return { getAllProducts, isLoading, products, error, productSelected, handleShow, show, handleClose, setNewProduct, newProduct }
}

export default useProducts