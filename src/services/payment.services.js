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

const orderPayment = async () => {
    const response = await axios
        .post(API_URL + 'payment/', {}, { headers: getheaders() })
    return response.data.results
}

const validatePayment = async (data) => {
    const response = await axios
        .post(API_URL + 'payment/validate_payment/', data, { headers: getheaders() })
    return response.data
}



const PaymentServices = {
    orderPayment,
    validatePayment
}

export default PaymentServices;