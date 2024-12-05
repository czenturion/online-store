import { instance } from "./api.js";

export const API = {
    async getProducts(limit = 6) {
        try {
            const res = await instance.get(`/products?limit=${limit}`)
            return res.data
        } catch (error) {
            console.error('Error while getting products: ', error)
        }
    },

    async addNewProduct(product) {
        try {
            const res = await instance.post('/products', {
                    title: product.name,
                    price: product.price,
                    description: product.description,
                    image: 'https://i.pravatar.cc',
                    category: product.category
                })

            console.log(res)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
}