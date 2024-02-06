import ProductManager from "./productManager.js";
import express from "express";

const PORT = 8080
const app = express()
const productManager = new ProductManager()

app.get('/products', async (req, res) => {
    const { limit } = req.query
    const products = await productManager.getProducts()
    if (limit) {
        const productsLimit = products.slice(0, limit)
        res.send(productsLimit)
    } else {
        res.send(products)
    }
})

app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    res.send(await productManager.getProductById(id))
})

app.listen(PORT, () => {
    console.log(`Servidor establecido en puerto ${PORT}`)
})
