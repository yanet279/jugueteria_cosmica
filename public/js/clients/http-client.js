class Http {

    /* GET */
    async get(url, id) {
        try {
            return await fetch(url + (id || ''), { method: 'get' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR GET', error);
        }
    }

    /* POST */
    async post(url, dato) {
        try {
            return await fetch(url, {
                method: 'post',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }
            }).then(r => r.json());
        } catch (error) {
            console.error('ERROR POST', error);
        }
    }

    /* PUT */
    async put(url, id, dato) {
        try {
            return await fetch(url + id, {
                method: 'put',
                body: JSON.stringify(dato),
                headers: { 'content-type': 'application/json' }
            }).then(r => r.json());
        } catch (error) {
            console.error('ERROR PUT', error);
        }
    }

    /* DELETE */
    async delete(url, id) {
        try {
            return await fetch(url + id, { method: 'delete' }).then(r => r.json());
        } catch (error) {
            console.error('ERROR DELETE', error);
        }
    }   
    async del() {
        console.error('No llamar a del(), sino a delete()!');
    }   
}

const http = new Http();

export default http;