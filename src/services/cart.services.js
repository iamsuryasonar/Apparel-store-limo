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
        .get(API_URL + 'cart/', { headers: getheaders() })
    return response.data.results
}

const addToCart = async (data) => {
    const response = await axios
        .post(API_URL + 'cart/', data, { headers: getheaders() })
    return response.data.results
}

const UpdateItemQuantity = async (data) => {
    const response = await axios
        .put(API_URL + 'cart/' + data.itemId, { quantity: data.quantity }, { headers: getheaders() })
    return response.data.results
}

const RemoveItemFromCart = async (data) => {
    const response = await axios
        .delete(API_URL + 'cart/' + data.itemId, { headers: getheaders() })
    return response.data.results
}

const CartServices = {
    getAllCartItems,
    addToCart,
    UpdateItemQuantity,
    RemoveItemFromCart
}

export default CartServices;