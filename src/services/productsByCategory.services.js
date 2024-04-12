import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getNonAuthHeaders } from '../utilities/utility'

const getProduct = async (id) => {
    const response = await axios
        .get(API_URL + 'product/public/' + id, { headers: getNonAuthHeaders() })
    return response.data.results
}

const getProducts = async () => {
    const response = await axios
        .get(API_URL + 'product/public/products', { headers: getNonAuthHeaders() })
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
            headers: getNonAuthHeaders()
        })
    return response.data.results
}

const ProductsByCategoryService = {
    // getProduct,
    // getProducts,
    // getProductsByCategoryId,
    // getProductsByCategoryId
}

export default ProductsByCategoryService;