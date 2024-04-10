import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getAuthHeaders } from '../utilities/utility'

const getAllOrders = async () => {
    const response = await axios
        .get(API_URL + 'order/orders/ordered', { headers: getAuthHeaders() })
    return response.data.results
}

const OrderServices = {
    getAllOrders,
}

export default OrderServices;