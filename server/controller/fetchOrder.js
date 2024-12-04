import kucoinRequest from "./request.js";

const fetchMarketData = async (symbol) => {
    try {
        const fetchEndPoint = `/api/v1/market/orderbook/level1`
        const params = { symbol }
        const fetchBookData = await kucoinRequest(fetchEndPoint, 'GET', params);
        return fetchBookData.data;
    } catch (error) {
        console.error("Error fetching market data:", error.message);
        return null;
    }
}

export default fetchMarketData
