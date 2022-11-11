import api from '../api/products.js';

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async (req, res) => {
    res.json(await api.getProducts());
};

const getProduct = async (req, res) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    res.json(await api.getProduct(id));
};


///////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                             //
///////////////////////////////////////////////////////////////////////////////

const postProduct = async (req, res) => {
    let product = req.body;
    const newProduct = await api.createProduct(product);
    res.json(newProduct);
};


//////////////////////////////////////////////////////////////////////////////
//                              PUT Controllers                             //
//////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    // const id = Number(req.params.id);
    const id = req.params.id;
    const product = req.body;

    const updatedProduct = await api.updateProduct(id, product) || {};
    res.json(updatedProduct);
};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controllers                            //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async (req, res) => {
    // const id = Number(req.params.id);
    const id = req.params.id;

    const removedProduct = await api.deleteProduct(id) || {};
    res.json(removedProduct);
};


export default {
    getProducts,    
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
};
