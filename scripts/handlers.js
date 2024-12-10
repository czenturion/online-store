export const errorMsg = () => {
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("error-result");
  errorDiv.innerHTML = "Products load error, Please refresh page.";
  productList.appendChild(errorDiv);
  return;
};

export const createProductCard = (product, deleteProduct) => {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.setAttribute("product-id", product.id);

  productCard.innerHTML = `
            <img src=${product.image} alt='Product image'/>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p><strong>${product.price} $</strong></p>
            <button class='delete-btn'>X</button>
        `;

  productCard.querySelector(".delete-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    deleteProduct(product.id);
  });

  return productCard;
};

export const showError = (message) => {
  const errorDiv = document.createElement("div");
  errorDiv.textContent = message;
  errorDiv.classList.add("error-message", "lato-regular");

  const mainContainer = document.querySelector("main");
  mainContainer.prepend(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
};

export const showNotification = (message, duration = 3000) => {
  const notification = document.querySelector("#notification");
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, duration);
};
