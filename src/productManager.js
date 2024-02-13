import fs from "fs"


const PATH = './products.json'
export default class ProductManager {
    constructor() {
        this.path = PATH
    }

    async addProduct(title, description, price, category, stock, code) {
        let newcode = code
        let products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        if (products.find((product) => product.code === newcode)) {
            console.log(`Error = Codigo ${newcode}de producto repetido`)
        } else {
            const product = {
                nombre: this.title = title,
                descripcion: this.description = description,
                precio: this.price = price,
                imagen: this.thumbnail = [],
                stock: this.stock = stock,
                id: this.#idCreator(products) + 1,
                code: this.code = code,
                categoria: this.category = category,
                status: true,
            }
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }
    }

    #idCreator(products) {
        let id = 0
        products.map((product) => {
            if (product.id > id) id = product.id
        })
        return id
    }
    async getProducts() {
        let products = []
        if (fs.existsSync(this.path)) {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let products = JSON.parse(data)
            return products
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return products
        }
    }


    async getProductById(id) {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        let products = JSON.parse(data)
        let productFilter = products.find((product) => product.id === id)
        if (productFilter) {
            return productFilter
        } else {
            return `Error:no se encuentra el producto con el id (${id})`
        }
    }

    async updateProduct(id, changeProduct) {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        let products = JSON.parse(data)
        const product = products.find((product) => product.id === id)
        let productFinder = products.findIndex((product) => product.id === id)
        if (productFinder != -1) {
            products[productFinder] = {
                ...product,
                ...changeProduct
            }
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }
        else {
            console.log(`Error:no se encuentra el producto con el id (${id})`)
        }

    }

    async deleteProductById(id) {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        let products = JSON.parse(data)
        let productFilter = products.find((product) => product.id === id)

        if (productFilter) {
            let newlist = products.filter((product) => product.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newlist))
        } else {
            console.log(`Error:no se encuentra el producto con el id (${id})`)
        }
    }
}


