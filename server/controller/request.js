import axios from 'axios'

const kucoinRequest = async (endpoint, method = 'GET', params = {}) => {

    const baseUrl = process.env.BASE_URL

    try {
        const response = await axios({
            method,
            url: `${baseUrl}${endpoint}`,
            params,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data from KuCoin API:", error);
        throw error;
    }
};

export default kucoinRequest