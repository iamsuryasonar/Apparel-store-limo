import axios from "axios";
import { API_URL } from '../constants/constant'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
    }
    return headers
}

const sendEmail = async (data) => {
    const response = await axios
        .post(API_URL + 'contact-us/', data, { headers: getheaders() })
    return response.data.results
}

const ContactUsServices = {
    sendEmail,
}

export default ContactUsServices;