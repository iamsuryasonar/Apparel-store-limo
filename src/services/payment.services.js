import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getAuthHeaders } from '../utilities/utility'

const orderPayment = async () => {
    const response = await axios
        .post(API_URL + 'payment/', {}, { headers: getAuthHeaders() })
    return response.data.results
}

const validatePayment = async (data) => {
    const response = await axios
        .post(API_URL + 'payment/validate_payment/', data, { headers: getAuthHeaders() })
    return response.data
}

const PaymentServices = {
    orderPayment,
    validatePayment
}

export default PaymentServices;