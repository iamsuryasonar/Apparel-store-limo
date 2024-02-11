

import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../constants/constant'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).accessToken}`
    }
    return headers
}

const getAllCartItems = async () => {
    const response = await axios
        .get(API_URL + 'cart/' + id, { headers: getheaders() })
    return response.data.results
}

const addToCart = async (id) => {
    const response = await axios
        .post(API_URL + 'cart/' + id, { headers: getheaders() })
    return response.data.results
}

// const updateCartItemQuantity = async (cart_id) => {
//     const response = await axios.put(API_URL + 'cart/cart_id')
// }

const CartServices = {
    getAllCartItems,
    addToCart
}

export default CartServices;