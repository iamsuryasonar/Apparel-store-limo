import axios from "axios";
import { API_URL } from '../utilities/constants'
import { getNonAuthHeaders } from '../utilities/utility'

const getCategories = async () => {
    const response = await axios
        .get(API_URL + 'category/', { headers: getNonAuthHeaders() })
    return response.data.results
}

const CategoriesService = {
    getCategories,
}

export default CategoriesService;