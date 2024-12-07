import { API } from "../api/requests.js";

let currentPage = 0;
let productsByPage = 6;

const productList = document.getElementsByClassName("product-list")[0]
const categories = document.getElementsByClassName("dropdown-menu")[0]


const loadBtn = document.getElementsByClassName("load-more-btn")[0]
const homeNavLink = document.getElementsByClassName("home")[0]


const errorMsg = () => {
    const errorDiv = document.createElement('div')
    errorDiv.classList.add('error-result')
    errorDiv.innerHTML = 'Products load error, Please refresh page.'
    productList.appendChild(errorDiv)
    return
}

const createProductCard = (product) => {
    const productCard = document.createElement('div');

        productCard.classList.add('product-card')

        productCard.innerHTML = `
            <img src=${product.image} alt='Product image'/>
            <h3 class={'lato-regular'}>${product.title}</h3>
            <p class={'lato-light'}>${product.description}</p>
            <p class={'lato-bold'}><strong>${product.price} $</strong></p>
        `
    return productCard
}


const loadProducts = async () => {
    loadBtn.style.display = 'none'
    const products = await API.getProducts((currentPage + 1) * productsByPage)

    if (!products) {
        errorMsg()
    }

    products.splice(0, productsByPage * currentPage)
    currentPage++
    loadBtn.style.display = 'inline-block'

    products.forEach(product => {
        const productCard = createProductCard(product)
        productList.appendChild(productCard);
    });
}

const loadProductsByCategory = async (cat) => {
    loadBtn.style.display = 'none'
    const products = await API.getProductsByCategory(cat)
    productList.innerHTML = ''

    if (!products) {
        errorMsg()
    }

    products.forEach(product => {
        const productCard = createProductCard(product)
        productList.appendChild(productCard)
    })
}

const loadCategories = async () => {
    const categoriesRes = await API.getAllCategories()

    if (!categoriesRes) {
        categories = ['Error while categories requesting']
    }

    categoriesRes.forEach(cat => {
        const category = document.createElement('div')
        category.addEventListener('click', () => loadProductsByCategory(cat))

        category.innerHTML = `
            <li><a href="#">${cat}</a></li>
        `
        categories.appendChild(category)
    })
}



window.onload = async () => {
    await loadProducts()
    await loadCategories()

    loadBtn.addEventListener("click", loadProducts)
    homeNavLink.addEventListener("click", () => {
        currentPage = 0
        productList.innerHTML = ''
        loadProducts()
    })
}
