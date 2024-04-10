import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getAuthHeaders } from '../utilities/utility'

const getAllCartItems = async () => {
    const response = await axios
        .get(API_URL + 'cart/', { headers: getAuthHeaders() })
    return response.data.results
}

const addToCart = async (data) => {
    const response = await axios
        .post(API_URL + 'cart/', data, { headers: getAuthHeaders() })
    return response.data.results
}

const updateItemQuantity = async (data) => {
    const response = await axios
        .put(API_URL + 'cart/' + data.itemId,
            { quantity: data.quantity },
            { headers: getAuthHeaders() })
    return response.data.results
}

const removeItemFromCart = async (data) => {
    const response = await axios
        .delete(API_URL + 'cart/' + data.itemId, { headers: getAuthHeaders() })
    return response.data.results
}

const CartServices = {
    getAllCartItems,
    addToCart,
    updateItemQuantity,
    removeItemFromCart
}

export default CartServices;