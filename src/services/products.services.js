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

const getProducts = async (data) => {
    const response = await axios
        .get(API_URL + 'product/public/products', {
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

const getProductsByTag = async (tag) => {
    const response = await axios
        .get(API_URL + 'product/tag/' + tag, {
            headers: getheaders()
        })
    return response.data.results
}

const ProductsService = {
    getProduct,
    getProducts,
    getProductsByTag
}

export default ProductsService;