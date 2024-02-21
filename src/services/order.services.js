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

const getAllOrders = async () => {
    const response = await axios
        .get(API_URL + 'order/orders/ordered', { headers: getheaders() })
    return response.data.results
}

const OrderServices = {
    getAllOrders,
}

export default OrderServices;