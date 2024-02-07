

import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../constants/constant'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
    }
    return headers
}

const getProducts = async () => {
    const response = await axios
        .get(API_URL + 'product/products', { headers: getheaders() })
    return response.data.results
}
const getProductsByCategoryId = async (id) => {
    const response = await axios
        .get(API_URL + 'product/category/' + id, { headers: getheaders() })
    return response.data.results
}

const ProductsService = {
    getProducts,
    getProductsByCategoryId,
}

export default ProductsService;