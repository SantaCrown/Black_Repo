import kucoinRequest from './request.js'

const getMarketPrice = async (symbol) => {
    const marketPriceEndpoint = `/api/v1/market/stats`;
    const params = { symbol };
    const marketStatsData = await kucoinRequest(marketPriceEndpoint, 'GET', params);
    return marketStatsData.data
};

export default getMarketPrice