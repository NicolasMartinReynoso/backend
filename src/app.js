import express, { urlencoded } from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import path from 'path'
import { engine } from 'express-handlebars';
import ProductManager from "./productManager.js";
import { Server } from "socket.io"

const PORT = 8080
const app = express()

const productManager = new ProductManager()


const server = app.listen(PORT, () => {
    console.log(`Servidor establecido en puerto ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'))


const io = new Server(server)




app.get('/static/', async (req, res) => {

    const products = await productManager.getProducts()
    res.render('home', {
        products: products,
        css:"home.css",
        js:"home.js"
    })
});

app.get('/static/realtimeproducts', async (req, res) => {
    io.on('connection', async (socket) => {
        console.log("cliente socket.io conectado")
    
    const products = await productManager.getProducts()
    socket.emit('products',products)

    socket.on('newObject', async (product) => {
        productManager.addProduct(product)
        const products = await productManager.getProducts()
        socket.emit('products', products)

    })
   
    
    })
    res.render('realTimeProducts', {
        js: "realtimeproducts.js",
        css: "realtimeproducts.css",

    })
})

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/static', express.static(path.join(__dirname, '/public/')))


