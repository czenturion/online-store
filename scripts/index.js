import { API } from "../api/requests.js";

let currentPage = 1;
let productsByPage = 6;

const productList = document.getElementsByClassName("product-list")[0]
const categories = document.getElementsByClassName("dropdown-menu")[0]

const loadProducts = async () => {
    const products = await API.getProducts(currentPage * productsByPage)

    if (!products) {
        const errorDiv = document.createElement('div')
        errorDiv.classList.add('error-result')
        errorDiv.innerHTML = 'Products load error, Please refresh page.'
        productList.appendChild(errorDiv)
        return
    }

    if (currentPage > 1) {
        products.splice(0, productsByPage * currentPage)
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

    currentPage++
}

const loadCategories = async () => {
    const categoriesRes = await API.getAllCategories()

    if (!categoriesRes) {
        categories = ['Error while categories requesting']
    }

    categoriesRes.forEach(cat => {
        const category = document.createElement('div')

        category.innerHTML = `
            <li><a href="#">${cat}</a></li>
        `
        categories.appendChild(category)
    })
}

window.onload = async () => {
    await loadProducts()
    await loadCategories()
}
