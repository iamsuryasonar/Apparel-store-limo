import axios from "axios";
import { LOCAL_STORAGE_NAME, API_URL } from '../constants/constant'

const getheaders = () => {
    const headers = {
        "Accept": "*/*",
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)).accessToken}`,
    }
    return headers
}

const getCategories = async () => {
    const response = await axios
        .get(API_URL + 'category/categories', { headers: getheaders() })
    return response.data.results
}

const CategoriesService = {
    getCategories,
}

export default CategoriesService;