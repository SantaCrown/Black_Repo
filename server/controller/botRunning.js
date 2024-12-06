import axios from "axios"
import dotenv from 'dotenv'
import MarketPrice from '../models/marketPrice.js';
import fetchMarketData from './fetchOrder.js';
import Bot from '../models/bot.js'

dotenv.config()

const placeOrder = async (symbol, side, price, size) => {
    const BASE_URL = process.env.BASE_URL
    const API_KEY = process.env.KUCOIN_API_KEY

    try {
        const response = await axios.post(`${BASE_URL}/api/v1/orders`, {
            symbol,
            side,
            price,
            size
        }, {
            headers: { "KC-API-KEY": API_KEY },
        });
        console.log(`${side.toUpperCase()} Order placed:`, response.data);
    } catch (error) {
        console.error(`Error placing ${side} order:`, error.message);
    }
}

const calculatePrice = (bid, ask) => {
    return (bid + ask) / 2
}

const runningBot = async (botSelect) => {

    console.log("_______running bot_____");

    if (botSelect === 'kuocin') {
        console.log('__kucoin order start__');

        const marketData = await MarketPrice.find({}).sort({ createdAt: -1 })
        const marketDataVal = marketData[0]
        const ask = marketDataVal.marketprice.sell * 1
        const bid = marketDataVal.marketprice.buy * 1
        const gottenSpreadVal = (ask - bid) / ask
        const averagePrice = calculatePrice(ask, bid)
        const feeRate = marketDataVal.takerFeeRate * 1
        const symbol = marketDataVal.symbol
        const botData = await Bot.find({})
        const botDataVal = botData[0]
        const limit_spread = botDataVal.spread * 1
        const limit_profit = botDataVal.profit * 1
        const size = botDataVal.size * 1

        if (limit_profit < feeRate) {
            console.log("condition error");
            const msg = 'Condition Error'
            return 'error';

        } else {
            const sellPrice = averagePrice * 1 + averagePrice * limit_spread * 1
            const buyPrice = averagePrice * 1 - averagePrice * limit_spread * 1
            console.log("sellPrice", sellPrice);
            console.log("buyPrice", buyPrice);

            console.log("success===============================");
            // placeOrder(symbol, sell, sellPrice, size)
            // placeOrder(symbol, buy, buyPrice, size)
            return true;
        }
    }
    if (botSelect === 'uniswap') {
        console.log("uniswap placeorder");
        const orderCondition = await Bot.find({ botStyle: botSelect })
        const condition = orderCondition[0]
        const spreadVal = condition.spread
        const sizeVal = condition.size
        console.log("condition", condition.info);
        const bidPrice = condition.info.token1Price * (1 - spreadVal * 1)
        const askPrice = condition.info.token1Price * (1 + spreadVal * 1)

        // placeOrder()
        return true;
    }
}

export default runningBot

let botRunning = false;




