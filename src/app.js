import express, { urlencoded } from "express";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import path from 'path'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = 8080



app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))

app.listen(PORT, () => {
    console.log(`Servidor establecido en puerto ${PORT}`)
})