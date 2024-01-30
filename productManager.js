import fs from "fs"


const PATH = './products.json'
class ProductManager {
    constructor() {
        this.path = PATH
    }

    async addProduct(title, description, price, thumbnail, stock, code) {
        let newcode = code
        let products = JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        if (products.find((product) => product.code === newcode)) {
            console.log(`Error = Codigo ${newcode}de producto repetido`)
        } else {
            const product = {
                nombre: this.title = title,
                descripcion: this.description = description,
                precio: this.price = price,
                imagen: this.thumbnail = thumbnail,
                stock: this.stock = stock,
                id: this.#idCreator(products) + 1,
                code: this.code = code
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
            console.log(products)
        } else {
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log(products)
        }
    }


    async getProductById(id) {
        let data = await fs.promises.readFile(this.path, 'utf-8')
        let products = JSON.parse(data)
        let productFilter = products.find((product) => product.id === id)
        if (productFilter) {
            console.log(productFilter)
        } else {
            console.log(`Error:no se encuentra el producto con el id (${id})`)
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


// Proceso de testing //

const prueba = new ProductManager()
await prueba.getProducts()
await prueba.addProduct("producto de prueba", "Este es un producto prueba", 200, [], 20, "abc123")
await prueba.getProducts()
await prueba.getProductById(2)
await prueba.addProduct("producto de prueba", "Este es un producto prueba", 200, [], 20,"abc456")
await prueba.getProductById(2)
await prueba.updateProduct(1,{nombre:"producto actualizado"})
await prueba.deleteProductById(2)