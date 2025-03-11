import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getAuthHeaders } from '../utilities/utility'

const addReview = async (data) => {
    const response = await axios
        .post(API_URL + 'review/', data, { headers: getAuthHeaders() })
    return response.data.results
}

const updateReview = async (data) => {
    const response = await axios
        .put(API_URL + 'review/' + data._id, data, { headers: getAuthHeaders() })
    return response.data.results
}

const removeReview = async (data) => {
    const response = await axios
        .delete(API_URL + 'review/' + data.id, { headers: getAuthHeaders() })
    return response.data.results
}

const ReviewServices = {
    addReview,
    updateReview,
    removeReview
}

export default ReviewServices;