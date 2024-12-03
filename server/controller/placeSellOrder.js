const placeSellOrder = async () => {
    const sellPrice = 46000;  // Example price
    const sellSize = 0.001;  // Example size
    return await placeOrder("BTC-USDT", "sell", sellPrice, sellSize);
  };
  
  export default placeSellOrder