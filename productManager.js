class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, stock, code) {
        let newcode = code
        let products = this.products
        if (products.find((product) => product.code === newcode)) {
            console.log("Error = Codigo de producto repetido")
        } else {
            const product = {
                nombre: this.title = title,
                descripcion: this.description = description,
                precio: this.price = price,
                imagen: this.thumbnail = thumbnail,
                stock: this.stock = stock,
                id: this.#idCreator() + 1,
                code: this.code=code
            }
            products.push(product)
        }
    }
    #idCreator() {
        let id = 0
        const products = this.products
        products.map((product) => {
            if (product.id > id) id = product.id
        })
        return id
    }

    getProducts() {
        const products = this.products
        console.log(products)
    }

    getProductsById(id) { 
        const products = this.products
        const productFilter = products.find((product) => product.id === id)
        if (productFilter) {
            console.log(productFilter)
        } else {
            console.log("No se encuentra el producto con el id ingresado")
        }
    }

}

const prueba = new ProductManager()
prueba.getProducts()
prueba.addProduct("producto de prueba", "Este es un producto prueba", 200, "sin imagen", 20, "abc123")
prueba.getProducts()
prueba.addProduct("producto de prueba", "Este es un producto prueba", 200, "sin imagen", 20, "abc125")
prueba.getProducts()
prueba.addProduct("producto de prueba", "Este es un producto prueba", 200, "sin imagen", 20, "abc123")
prueba.getProductById(2)