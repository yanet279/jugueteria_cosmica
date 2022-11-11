import fs from 'fs';

class ProductModelFile {

    productsFile = 'products.dat';
    charset = 'utf-8';

    getNextProductId(products) {
        const nextId = products.length ? String(Number(products[products.length - 1].id) + 1) : "1";
        return nextId;
    }

    async readFileProducts() {
        // return [];
        let products = [];
        try {
            const fileContent = await fs.promises.readFile(this.productsFile, this.charset);
            products = JSON.parse(fileContent);
        } catch (error) {
            console.error(error.message);
        }
        return products;
    }

    async saveFileProducts(products) {
        // await fs.promises.writeFile(this.productsFile, JSON.stringify(products));
        await fs.promises.writeFile(this.productsFile, JSON.stringify(products, null, '\t'));
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                                    CRUD                                    //
    ////////////////////////////////////////////////////////////////////////////////

    // CRUD - C: CREATE
    async createProduct(product) {
        const products = await this.readFileProducts();
        
        product.id = this.getNextProductId(products);
        products.push(product);
        await this.saveFileProducts(products);
        return product;
    }

    // CRUD - R: READ
    async readProducts() {
        const products = await this.readFileProducts();
        return products;
    }

    async readProduct(id) {
        const products = await this.readFileProducts();
        const product = products.find( product => product.id === id ) || {};
        return product;
    }

    // CRUD - U: UPDATE
    async updateProduct(id, product) {
        const products = await this.readFileProducts();

        const index = products.findIndex( product => product.id === id);
        // Si no se encontró
        if (index === -1) {
            return {};
        }
        product.id = id;
        products[index] = product;

        await this.saveFileProducts(products);
        return product;
    }

    // CRUD - D: DELETE
    async deleteProduct(id) {
        const products = await this.readFileProducts();

        const index = products.findIndex( product => product.id === id );
        // Si no se encontró
        if (index === -1) {
            return {};
        }
        const removedProduct = products.splice(index, 1)[0];

        await this.saveFileProducts(products);
        return removedProduct;
    }

}

export default ProductModelFile;
