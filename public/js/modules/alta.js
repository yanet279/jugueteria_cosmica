import productController from '/js/controllers/product.js';
console.log('Hola estas en alta. Bienvenido!!!');
class Alta{

    static form
    static fields
    static btnCreate 
    static btnCancel 
    static btnUpdate

    static validators = {
        'id': /^[\da-f]{0,24}$/,
        'name': /^[A-Za-z0-9_ ¿?¡!.,:-]{1,30}$/,
        'price': /^\d+$/,
        'stock': /^\d+$/,
        'brand': /^[A-Za-z0-9_¿?¡! .,:-]{1,50}$/,
        'category': /^[A-Za-z0-9_¿?¡ !.,:-]{1,40}$/,
        'shortDescription': /^[A-Za-z0-9_¿?¡!.,: -]{1,100}$/,
        'longDescription': /^[A-Za-z0-9_¿?¡!.,: -]{1,100}$/,
        'ageFrom': /^\d+$/,
        'ageUntil': /^\d+$/,
        'photo': /^[\w\W]+?/
    };

    static emptyForm() {
        Alta.fields.forEach(field => field.value = '');
    }

    static completeForm(product) {
        Alta.fields.forEach(field => {
            field.value = product[field.name];
        });
    }

    static validate(value, validator) {
        console.log(validator);
        return validator.test(value);
    }
    
    static validateForm() {
        let allValidated = true;
        const productToSave = {};
        console.log('\n\n');

        for (const field of Alta.fields) {
            const validated = Alta.validate(field.value, Alta.validators[field.name]);
            console.log(field.name, validated);
            if (!validated) {
                allValidated = false;
                break;
            } else {
                productToSave[field.name] = field.value;
            }
        }
        console.log('allValidated:', allValidated);
        if (!allValidated) {
            return false;
        }
        return productToSave;
    }

    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);    
        Alta.renderTemplateTable(products);
        return savedProduct;
    }

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        const products = await productController.getProducts();
        console.log(`Ahora hay ${products.length} productos`);    
        Alta.renderTemplateTable(products);
        return updatedProduct;
    }

    static async addFormEvents() {
        Alta.form.addEventListener('submit', async e => {
            e.preventDefault();
            const productToSave = Alta.validateForm();
            if (productToSave) {
                const savedProduct = await Alta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                Alta.emptyForm();
            }
        });

        this.btnCancel.addEventListener('click', e => {
            Alta.emptyForm();
            Alta.btnCreate.disabled = false;
            Alta.btnUpdate.disabled = true;
            Alta.btnCancel.disabled = true;
        });

        this.btnUpdate.addEventListener('click', async e => {
            const productToSave = Alta.validateForm();
            if (productToSave) {
                const updatedProduct = await Alta.updateProduct(productToSave);
                console.log('updatedProduct:', updatedProduct);
            }
            Alta.emptyForm();
            Alta.btnCreate.disabled = false;
            Alta.btnUpdate.disabled = true;
            Alta.btnCancel.disabled = true;

        });
    }
    
    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.products-table-container').innerHTML = html;
    }


    static async addTableEvents() {
        const deleteProduct = async (e) => {
            if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
                return;
            }
            const row = e.target.closest('tr');
            const id = row.dataset.id;
            const deletedProduct = await productController.deleteProduct(id);
            console.log('Producto eliminado:', deletedProduct);
            // row.remove();
            const products = await productController.getProducts();
            console.log(`Aún quedan ${products.length} productos`);    
            Alta.renderTemplateTable(products);
        };

        const editProduct = async e => {
            const row = e.target.closest('tr');
            const id = row.dataset.id;
            const name = row.querySelector('.cell-name').innerHTML;
            const price = row.querySelector('.cell-price').innerHTML;
            const stock = row.querySelector('.cell-stock').innerHTML;
            const brand = row.querySelector('.cell-brand').innerHTML;
            const category = row.querySelector('.cell-category').innerHTML;
            const shortDescription = row.querySelector('.cell-short-description').innerHTML;
            const longDescription = row.querySelector('.cell-long-description').innerHTML;
            const ageFrom = row.querySelector('.cell-age-from').innerHTML;
            const ageUntil = row.querySelector('.cell-age-until').innerHTML;
            const photo = row.querySelector('.cell-photo').innerHTML;
            const productToEdit = {};
            productToEdit.id = id;
            productToEdit.name = name;
            productToEdit.price = price;
            productToEdit.stock = stock;
            productToEdit.brand = brand;
            productToEdit.category = category;
            productToEdit.shortDescription = shortDescription;
            productToEdit.longDescription = longDescription;
            productToEdit.ageFrom = ageFrom;
            productToEdit.ageUntil = ageUntil;
            productToEdit.photo = photo;
            Alta.completeForm(productToEdit);
            Alta.btnCreate.disabled = true;
            Alta.btnUpdate.disabled = false;
            Alta.btnCancel.disabled = false;
        };

        document.querySelector('.products-table-container').addEventListener('click', e => {
            if (e.target.classList.contains('btn-delete')) {
                deleteProduct(e);
                return;
            }
            if (e.target.classList.contains('btn-edit')) {
                editProduct(e);
                return;
            }
        });

    }

    static async init () {
        // console.log('PageAlta.init()');
        Alta.form = document.querySelector('form');
        Alta.fields = Alta.form.querySelectorAll('input, textarea');
        Alta.btnCreate = Alta.form.querySelector('#btn-create');
        Alta.btnUpdate = Alta.form.querySelector('#btn-update');
        Alta.btnCancel = Alta.form.querySelector('#btn-cancel');

        Alta.addFormEvents();
    
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        
        await Alta.renderTemplateTable(products);
        Alta.addTableEvents();
    }
};
export default Alta;