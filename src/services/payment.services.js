import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getAuthHeaders } from '../utilities/utility'

const orderPayment = async () => {
    const response = await axios
        .post(API_URL + 'payment/', {}, { headers: getAuthHeaders() })
    return response.data.results
}

const validatePaymentAndOrder = async (data) => {
    try {
        const response = await axios
            .post(API_URL + 'payment/validate_payment/', data, { headers: getAuthHeaders() })
        return response.data;
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        return {
            code: statusCode,
            message: error.response ? error.response.data : 'An unexpected error occurred'
        };
    }
}

const PaymentServices = {
    orderPayment,
    validatePaymentAndOrder
}

export default PaymentServices;