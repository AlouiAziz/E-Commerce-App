import express from "express";
import products from "./data/products.js"


const app = express()

// Load product from server

app.get("/api/produts", (req, res) => {
    res.json(products)
})

// Single product from server

app.get("api/product", (req, res) => {
    const product = products.find((p) => p._id === match.params.id)
})

app.get("/", (req, res) => {
    res.send("API is Running")
})


app.listen(5000, console.log("server running on port 5000..."))
