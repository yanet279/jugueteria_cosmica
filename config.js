const PERSISTENCE_TYPES = {
    TYPE_MEM: 'MEMORY',
    TYPE_FILE: 'FILE SYSTEM',
    TYPE_MONGODB: 'MONGODB',
};

const config = {
    PORT: 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPES.TYPE_MONGODB,
    MONGODB_CONNECTION_STR: 'mongodb://localhost/ecommerce',
    // MONGODB_CONNECTION_STR: 'mongodb+srv://sol3127G:lucia3127G@cluster0.odnu4cb.mongodb.net/ecommerce?retryWrites=true&w=majority',
    MONGODB_TIMEOUT: 2000   // Valor bajo para testing.
};

export {PERSISTENCE_TYPES, config as default};
