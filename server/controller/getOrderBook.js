import kucoinRequest from './request.js'

const getOrderBook = async (symbol) => {
    const orderBookEndpoint = `/api/v1/market/orderbook/level2_100`;
    const params = { symbol };
    const orderBookData = await kucoinRequest(orderBookEndpoint, 'GET', params);
    return orderBookData.data;
};

export default getOrderBook