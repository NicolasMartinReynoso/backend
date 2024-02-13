import fs from "fs"

const path = "./carts.json"

export default class CartManager {
    constructor() {
        this.path = path
    }

    async addNewCart() {
        let carts = await this.getCarts()
        let newCart = { id: this.#newID(carts) + 1, products: [] }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
    }


    #newID(carts) {
        let maxId = 0
        carts.map((cart) => {
            if (cart.id > maxId) maxId = cart.id;
        })
        return maxId;
    }

    async getCartByid(id) {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        let carts = JSON.parse(data)
        let cartFilter = carts.find((cart) => cart.id === id)
        if (cartFilter) {
            return cartFilter
        } else {
            return `Error:no se encuentra el carrito con el id (${id})`
        }
    }

    async addProductToCart(cartId, pid) {
        const carts = await this.getCarts()
        const cartIndex = carts.findIndex(cart => cart.id === cartId)
        if (cartIndex != -1) {
            const prodIndex = carts[cartIndex].products.findIndex(prod => prod.id === pid)
            if (prodIndex != -1) {
                carts[cartIndex].products[prodIndex].quantity += 1
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                console.log(`Se añadió exitosamente otra unidad del producto ${pid} al carrito ${cartId}`)
            } else {
                carts[cartIndex].products = [...carts[cartIndex].products, { id: pid, quantity: 1 }]
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                console.log(`Producto añadido existosamente al carrito${cartId}`)
            }
        } else {
            return ("el carrito con el id ingresado no se encuentra en la base de datos")

        }

    }

    async getCarts() {
        let carts = []
        if (fs.existsSync(this.path)) {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let carts = JSON.parse(data)
            return carts
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return carts
        }
    }
}