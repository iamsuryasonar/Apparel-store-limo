

import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../constants/constant'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
    }
    return headers
}

const getProduct = async (id) => {
    const response = await axios
        .get(API_URL + 'product/product/' + id, { headers: getheaders() })
    return response.data.results
}

const getProducts = async () => {
    const response = await axios
        .get(API_URL + 'product/products', { headers: getheaders() })
    return response.data.results
}

const getProductsByCategoryId = async (data) => {
    const response = await axios
        .get(API_URL + 'product/category/' + data.id, {
            params: {
                sort_type: data?.sortType,
                from: data?.from,
                to: data?.to,
            },
            headers: getheaders()
        })
    return response.data.results
}

const ProductsService = {
    getProduct,
    getProducts,
    getProductsByCategoryId,
    getProductsByCategoryId
}

export default ProductsService;