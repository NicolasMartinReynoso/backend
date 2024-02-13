import { Router } from "express";
import CartManager from "../cartManager.js";

const cartRouter = Router()
const cartManager = new CartManager()

cartRouter.post('/', async (req, res) => {
    res.send(await cartManager.addNewCart())
})

cartRouter.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    res.send(await cartManager.getCartByid(id))
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid= parseInt(req.params.pid)

    res.send(await cartManager.addProductToCart(cid,pid))
})



export default cartRouter;