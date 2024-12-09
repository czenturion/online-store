import { instance } from "./api.js"
import { showError } from "../scripts/handlers.js"

export const API = {
  async getProducts(limit = 6) {
    try {
      const res = await instance.get(`/products?limit=${limit}`);

      return res.data;
    } catch (error) {
      console.error("Error while getting products: ", error);
      showError("Get all products error, try again later.");
    }
  },

  async addNewProduct(product) {
    try {
      const res = await instance.post("/products", {
        title: product.title,
        price: product.price,
        description: product.description,
        image: "https://i.pravatar.cc",
        category: product.category,
      });

      return res.data;
    } catch (error) {
      console.error(error);
      showError("Add new product error, try again later.");
    }
  },

  async getAllCategories() {
    try {
      const res = await instance.get("/products/categories");

      return res.data;
    } catch (error) {
      console.error(error);
      showError("Get all catergories error, try again later.");
    }
  },

  async getProductsByCategory(cat) {
    try {
      const res = await instance.get(`/products/category/${cat}`);

      return res.data;
    } catch (error) {
      console.error(error);
      showError("Get product by category error, try again later.");
    }
  },

  async deleteProduct(id) {
    try {
      const res = await instance.delete(`/products/${id}`);

      return res.data;
    } catch (error) {
      console.error(error);
      showError("Delete product error, try again later.");
    }
  },
};
