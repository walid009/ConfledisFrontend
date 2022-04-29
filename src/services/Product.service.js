import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:3001/product";

class ProductService {

    getProducts(){
        return axios.get(PRODUCT_API_BASE_URL);
    }

    createProduct(product){
        return axios.post(PRODUCT_API_BASE_URL + '/create', product);
    }

    getProductById(productId){
        return axios.get(PRODUCT_API_BASE_URL + '/find/' + productId);
    }

    updateProduct(product, productId){
        return axios.put(PRODUCT_API_BASE_URL + '/update/' + productId, product);
    }

    deleteProduct(productId){
        return axios.delete(PRODUCT_API_BASE_URL + '/delete/' + productId);
    }
}

export default new ProductService()