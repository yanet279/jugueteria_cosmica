import productService from '/js/services/product.js';

class ProductController {

    async getProduct(id) {
        // console.log('getProduct:', id);
        const product = await productService.getProduct(id);
        return product;
    }

    async getProducts() {
        // console.log('getProducts');
        const products = await productService.getProducts();
        return products;
    }
    
    async saveProduct(product) {
        // console.log('saveProduct:', product);
        const savedProduct = await productService.saveProduct(product);
        return savedProduct;
    }

    async updateProduct(id, product) {
        // console.log('updateProduct:', id, product);
        const updatedProduct = await productService.updateProduct(id, product);
        return updatedProduct;
    }

    async deleteProduct(id) {
        // console.log('deleteProduct', id);
        const deletedProduct = await productService.deleteProduct(id);
        return deletedProduct;
    }
}

const productController = new ProductController();
export default productController;
