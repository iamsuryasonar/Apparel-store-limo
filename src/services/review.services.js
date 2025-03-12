import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getAuthHeaders, getNonAuthHeaders } from '../utilities/utility'

const getReview = async (data) => {
    const response = await axios
        .get(API_URL + 'review/' + data.productId, {
            params: {
                page: data?.page,
            },
            headers: getNonAuthHeaders()
        })
    return response.data.results
}

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
    getReview,
    addReview,
    updateReview,
    removeReview
}

export default ReviewServices;