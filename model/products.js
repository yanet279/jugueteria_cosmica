import config, {PERSISTENCE_TYPES} from '../config.js';
import ProductModelMem from './products-mem.js';
import ProductModelFile from './products-fs.js';
import ProductModelMongoDB from './products-mongodb.js';

class ProductModel {
    static get(type) {
        console.log(`#### Persistencia -> ${config.PERSISTENCE_TYPE || 'por defecto'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MEM:
                return new ProductModelMem();
            case PERSISTENCE_TYPES.TYPE_FILE:
                return new ProductModelFile();
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new ProductModelMongoDB();
            default:
                return new ProductModelMem();
        }
    }
}

export default ProductModel;
