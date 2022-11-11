import config from '../config.js';
import mongoose from "mongoose";

class DBMongoDB {

    static READY_STATE_DISCONNECTED = 0;
    static READY_STATE_CONNECTED = 1;
    static READY_STATE_CONNECTING = 2;
    static READY_STATE_DISCONNECTING = 3;
    static primaryKey = '_id';

    static getObjectWithId(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(el => {
                el.id = el[DBMongoDB.primaryKey];
                delete el[DBMongoDB.primaryKey];
            });
        } else {
            obj.id = obj[DBMongoDB.primaryKey];
            delete obj[DBMongoDB.primaryKey];
        }
        return obj;
    }

    static async connectDB() {
        try {
            // console.log('mongoose.connection.readyState:', mongoose.connection.readyState);
            if (mongoose.connection.readyState === DBMongoDB.READY_STATE_CONNECTED) {
                // console.log('Ya conectado');
                return true;
            }
            await mongoose.connect(config.MONGODB_CONNECTION_STR, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: config.MONGODB_TIMEOUT
            });
            console.log('Conexión con MongoDB exitosa.');
            return true;
        } catch (error) {
            console.error(`Error al intentar establecer la conexión con MongoDB. Detalle: ${error.message}`);
            return false;
        }
    }

}

export default DBMongoDB;
