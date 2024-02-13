import { Router } from "express";
import ProductManager from "../productManager.js";

const productRouter = Router()
const productManager = new ProductManager()


productRouter.get('/', async (req, res) => {
    const { limit } = req.query
    const products = await productManager.getProducts()
    if (limit) {
        const productsLimit = products.slice(0, limit)
        res.send(productsLimit)
    } else {
        res.send(products)
    }
})

productRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    res.send(await productManager.getProductById(id))
})


productRouter.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    res.send(await productManager.deleteProductById(id))
})

productRouter.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const updated = req.body
    res.send(await productManager.updateProduct(id,updated))
})

productRouter.post('/', async (req, res) => {
    const newproduct = req.body
    res.send(await productManager.addProduct(newproduct))
})

export default productRouter;