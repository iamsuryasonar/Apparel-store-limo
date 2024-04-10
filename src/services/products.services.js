import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getNonAuthHeaders } from '../utilities/utility'

const getProduct = async (id) => {
    const response = await axios
        .get(API_URL + 'product/public/' + id, { headers: getNonAuthHeaders() })
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
            headers: getNonAuthHeaders()
        })
    return response.data.results
}

const getProductsByTag = async (tag) => {
    const response = await axios
        .get(API_URL + 'product/tag/' + tag, {
            headers: getNonAuthHeaders()
        })
    return response.data.results
}

const ProductsService = {
    getProduct,
    getProducts,
    getProductsByTag
}

export default ProductsService;