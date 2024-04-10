import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getNonAuthHeaders } from '../utilities/utility'

const sendEmail = async (data) => {
    const response = await axios
        .post(API_URL + 'contact-us/', data, { headers: getNonAuthHeaders() })
    return response.data.results
}

const ContactUsServices = {
    sendEmail,
}

export default ContactUsServices;