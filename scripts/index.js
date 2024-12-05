import { API } from "../api/requests.js";

let currentPage = 0;

const productList = document.getElementsByClassName("product-list")[0]

const loadProducts = async () => {
    const products = await API.getProducts()
    currentPage++

    if (!products) {
        const errorDiv = document.createElement('div')
        errorDiv.classList.add('error-result')
        errorDiv.innerHTML = 'Products load error, Please refresh page.'
        productList.appendChild(errorDiv)
        return
    }

    products.forEach(product => {
        const productCard = document.createElement('div');

        productCard.classList.add('product-card')

        productCard.innerHTML = `
            <img src=${product.image} alt='Product image'/>
            <h3 class={'lato-regular'}>${product.title}</h3>
            <p class={'lato-light'}>${product.description}</p>
            <p class={'lato-bold'}><strong>${product.price} $</strong></p>
        `
        productList.appendChild(productCard);
    });
}

window.onload = async () => {
    await loadProducts()
}
