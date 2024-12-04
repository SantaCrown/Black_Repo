import axios from "axios"
import dotenv from 'dotenv'
import MarketPrice from '../models/marketPrice.js';
import fetchMarketData from './fetchOrder.js';
import Bot from '../models/bot.js'

dotenv.config()

const calculateSpread = (bid, ask) => {
    return (ask - bid) / ask;
}

const startBot = () => {
    if (!botRunning) {
        console.log("Starting the bot...");
        botRunning = true;
        runStrategy();
    }
}

const stopBot = (reason) => {
    if (botRunning) {
        console.log(`Stopping the bot: ${reason}`);
        botRunning = false;
    }
}


const runStrategy = async () => {
    console.log("here is run bot");

    if (!botRunning) return;

    const market = await fetchMarketData(marketData.symbol);
    if (!market) return stopBot("Market data unavailable");

    const isSpreadValid = market.spread >= THRESHOLDS.MIN_SPREAD;

    if (isSpreadValid) {
        const orderSize = 0.01; // Example order size
        await placeOrder("buy", market.bid, orderSize);
        await placeOrder("sell", market.ask, orderSize);
    } else {
        const reason = !isSpreadValid ? "Spread too narrow" : "normal"
        stopBot(reason);
    }
}

async function placeOrder(symbol, side, price, size) {
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


const runningBot = async () => {

    const marketData = await MarketPrice.find({}).sort({ createdAt: -1 })
    console.log("marktData", marketData[0]);
    const marketDataVal = marketData[0]
    const gottenSpreadVal = (marketDataVal.sell - marketDataVal.buy) / marketDataVal.sell
    const averagePrice = marketDataVal.averagePrice
    const feeRate = marketDataVal.takerFeeRate
    const symbol = marketDataVal.symbol

    const botData = await Bot.find({})
    console.log('botdta', botData);


    if (gottenSpreadVal < 0.2) {
        console.log("plavceorder fatal");

    } else {
        console.log("success===============================");

        // placeOrder(symbol, sell, averagePrice, 0.1)
    }

    // const THRESHOLDS = {
    //     MIN_SPREAD: 0.002, // Minimum bid-ask spread (e.g., 0.2%)
    //     MAX_VOLATILITY: 0.02, // Maximum volatility (e.g., 2%)
    //     MIN_LIQUIDITY: 10, // Minimum liquidity factor (e.g., 10x order size)
    //     MIN_PROFIT_MARGIN: 0.001, // Minimum profit margin (e.g., 0.1%)
    // };

    // const marketData = await marketPrice.find()
}

export default runningBot

let botRunning = false;

const marketData = {
    symbol: "BTC-USDT",
    bid: 95209,
    ask: 95209.1,
    spread: 0.002, // Example spread calculation (ask - bid) / ask
    volatility: 0.015, // Example hourly volatility
    liquidityFactor: 12, // Example liquidity calculation
    feeRate: 0.001, // Taker fee rate
};






