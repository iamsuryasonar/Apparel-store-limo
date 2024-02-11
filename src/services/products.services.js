import axios from "axios";
import { API_URL } from '../constants/constant'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
    }
    return headers
}

const getProduct = async (id) => {
    const response = await axios
        .get(API_URL + 'product/public/' + id, { headers: getheaders() })
    return response.data.results
}

const getProducts = async () => {
    const response = await axios
        .get(API_URL + 'product/public/products', { headers: getheaders() })
    return response.data.results
}

const getProductsByCategoryId = async (data) => {
    const response = await axios
        .get(API_URL + 'product/category/' + data.id, {
            params: {
                page: data?.pageNo,
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