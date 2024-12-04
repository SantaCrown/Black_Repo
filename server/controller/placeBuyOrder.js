import placeOrder from './placeOrder'

const placeBuyOrder = async () => {
    const buyPrice = 45000;  // Example price
    const buySize = 0.001;  // Example size
    return await placeOrder("BTC-USDT", "buy", buyPrice, buySize);
};

export default placeBuyOrder
