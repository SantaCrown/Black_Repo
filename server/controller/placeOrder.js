import kucoinRequest from "./request";

const placeOrder = async (symbol, side, price, size) => {
    const endpoint = "/api/v1/orders";
    const body = {
        clientOid: `order_${Date.now()}`,
        side,
        symbol,
        type: "limit",
        price: price.toString(),
        size: size.toString(),
    };
    const response = await kucoinRequest(endpoint, "POST", {}, JSON.stringify(body));
    return response.data;
};

export default placeOrder
