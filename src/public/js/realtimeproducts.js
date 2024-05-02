const socket = io()
const form = document.getElementById("formId")
const productsContainer = document.getElementById("productsContainer")

socket.on('products', (products) => {
    productsContainer.innerHTML=""
    products.forEach(product => {
     productsContainer.innerHTML +=`<div  class="card text-bg-dark mb-3 productContainer"  style="width: 18rem;">
        <img src="${product.thumbnail}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
             <p class="card-text">
                 ${product.description}
                 Precio $${product.price}
                 Stock ${product.stock}
                 ${product.category}
             </p>
            <a href="#" class="btn btn-primary">Comprar</a>
        </div>
        </div>`
        });
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const product = Object.fromEntries(datForm)
    socket.emit('newObject', product)
    e.target.reset()

})