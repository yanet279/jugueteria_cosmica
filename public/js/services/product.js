import http from '/js/clients/http.client.js';

class ProductService {
    
    URL_PRODUCTOS = '/api/products/'

    async getProduct(id) {
        const product = await http.get(this.URL_PRODUCTOS, id);
        return product;
    }

    async getProducts() {
        const products = await http.get(this.URL_PRODUCTOS);
        return products;
    }

    async saveProduct(product) {
        const savedProduct = await http.post(this.URL_PRODUCTOS, product);
        return savedProduct;
    }

    async updateProduct(id, product) {
        const updatedProduct = await http.put(this.URL_PRODUCTOS, id, product);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await http.delete(this.URL_PRODUCTOS, id);
        return deletedProduct;
    }
}

const productService = new ProductService();

export default productService;
