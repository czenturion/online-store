import { API } from "../api/requests.js";
import {
  errorMsg,
  createProductCard,
  showError,
  showNotification,
} from "./handlers.js";

let currentPage = 0;
let productsByPage = 6;

const productList = document.querySelector(".product-list");
const categories = document.querySelector(".dropdown-menu");

const loadBtn = document.querySelector(".load-more-btn");
const homeNavLink = document.querySelector(".home");

const addItemBtn = document.querySelector(".add-item-btn");
const addItemModal = document.querySelector(".add-item-modal");
const closeModalBtn = document.querySelector(".close-btn");
const addItemForm = document.querySelector(".add-item-form");
const formCategory = document.querySelector("#productCategory");
const submitBtn = document.querySelector(".submit");

const loadProducts = async () => {
  loadBtn.style.display = "none";

  const products = await API.getProducts((currentPage + 1) * productsByPage);
  products.splice(0, productsByPage * currentPage);
  currentPage++;

  if (products.length === 0) {
    showError("Products not found");
    errorMsg();
  }

  products.forEach((product) => {
    const productCard = createProductCard(product, deleteProduct);
    productList.appendChild(productCard);
  });

  loadBtn.style.display = "inline-block";
};

const loadProductsByCategory = async (cat) => {
  loadBtn.style.display = "none";
  const products = await API.getProductsByCategory(cat);
  productList.innerHTML = "";

  if (!products) {
    showError("Products not found");
    errorMsg();
  }

  products.forEach((product) => {
    const productCard = createProductCard(product, deleteProduct);
    productList.appendChild(productCard);
  });
};

const loadCategories = async () => {
  const categoriesRes = await API.getAllCategories();

  if (!categoriesRes) {
    showError("Categories not found");
  }

  categoriesRes.forEach((cat) => {
    const category = document.createElement("div");
    category.addEventListener("click", () => loadProductsByCategory(cat));

    category.innerHTML = `
            <li><a href="#">${cat}</a></li>
        `;

    const catOption = document.createElement("option");
    catOption.innerText = cat;

    formCategory.appendChild(catOption);
    categories.appendChild(category);
  });
};

const deleteProduct = async (id) => {
  try {
    const res = await API.deleteProduct(id);

    const productCard = document.querySelector(
      `.product-card[data-id="${id}"]`,
    );
    if (productCard) productCard.remove();

    showNotification(`Product with id: ${id} deleted!`);
  } catch (error) {
    showError(`Product with id: ${id} didnt deleted`);
  }
};

addItemBtn.addEventListener("click", () => {
  addItemModal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  addItemModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === addItemModal) {
    addItemModal.style.display = "none";
  }
});

addItemForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitBtn.style.display = "none";

  const productName = document.querySelector("#productName").value;
  const productDescription = document.querySelector(
    "#productDescription",
  ).value;
  const productPrice = document.querySelector("#productPrice").value;
  const productImage = document.querySelector("#productImage").value;
  const productCategory = document.querySelector("#productCategory").value;

  const newProduct = {
    title: productName,
    description: productDescription,
    price: parseFloat(productPrice),
    image: productImage,
    category: productCategory,
  };

  const res = await API.addNewProduct(newProduct);

  showNotification("Product added");
  const productCard = createProductCard(res);
  productList.appendChild(productCard);

  addItemForm.reset();
  addItemModal.style.display = "none";
  submitBtn.style.display = "inline-block";
});

window.onload = async () => {
  await loadProducts();
  await loadCategories();

  loadBtn.addEventListener("click", loadProducts);
  homeNavLink.addEventListener("click", () => {
    currentPage = 0;
    productList.innerHTML = "";
    loadProducts();
  });
};
