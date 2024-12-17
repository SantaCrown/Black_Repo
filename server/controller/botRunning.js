import axios from "axios"
import dotenv from 'dotenv'
import MarketPrice from '../models/marketPrice.js';
import fetchMarketData from './fetchOrder.js';
import Bot from '../models/bot.js'
import { swapTokenForExactToken } from "./v2/scripts/swap.js";
// import contractRun from "./contractFunc.js";

dotenv.config()

const calculatePrice = (bid, ask) => {
    return (bid + ask) / 2
}

const runningBot = async (botSelect, first, second, id) => {

    console.log(`_______ ${botSelect} running bot_____`);

    // if (botSelect === 'kucoin') {
    //     console.log('__kucoin order start__');

    //     const marketData = await MarketPrice.find({}).sort({ createdAt: -1 })
    //     const marketDataVal = marketData[0]
    //     const ask = marketDataVal.marketprice.sell * 1
    //     const bid = marketDataVal.marketprice.buy * 1
    //     const gottenSpreadVal = (ask - bid) / ask
    //     const averagePrice = calculatePrice(ask, bid)
    //     const feeRate = marketDataVal.takerFeeRate * 1
    //     const symbol = marketDataVal.symbol
    //     const botData = await Bot.find({})
    //     const botDataVal = botData[0]
    //     const limit_spread = botDataVal.spread * 1
    //     const limit_profit = botDataVal.profit * 1
    //     const size = botDataVal.size * 1

    //     if (limit_profit < feeRate) {
    //         console.log("condition error");
    //         const msg = 'Condition Error'
    //         return 'error';

    //     } else {
    //         const sellPrice = averagePrice * 1 + averagePrice * limit_spread * 1
    //         const buyPrice = averagePrice * 1 - averagePrice * limit_spread * 1
    //         console.log("sellPrice", sellPrice);
    //         console.log("buyPrice", buyPrice);

    //         console.log("success===============================");
    //         // placeOrder(symbol, sell, sellPrice, size)
    //         // placeOrder(symbol, buy, buyPrice, size)
    //         return true;
    //     }
    // }

    if (botSelect === 'uniswap') {

        console.log("uniswap placeorder");
        const orderCondition = await Bot.find({ _id: id })
        const condition = orderCondition[0]
        const spreadVal = condition.spread
        const sizeVal = condition.size
        const bidPrice = condition.info.token1Price * (1 - spreadVal * 1)
        const askPrice = condition.info.token1Price * (1 + spreadVal * 1)
        const currentPrice = condition.info.token1Price
        const tokenA = first
        const tokenB = second
        const swapMaxSize = condition.maxAmount
        const swapAmount = condition.swapAmount

        console.log('currentPrice -->', currentPrice);

        if (swapMaxSize > swapAmount) {

            if (currentPrice > 4000) {
                await swapTokenForExactToken(
                    tokenA,
                    tokenB,
                    swapMaxSize,
                    swapAmount
                )
                return `${tokenA} to ${tokenB} swap success!`

            } else if (currentPrice < 3900) {

                const tokenA1 = '0xB6A1743DC31507F181b12E7742Ae100Bb1f13878'
                const tokenB1 = '0x397Fb50090C910Bc9d4624a7F211f1bB2100fd45'
                const swapMaxSize1 = '700'
                const swapAmount1 = '500'

                await swapTokenForExactToken(
                    tokenA1,
                    tokenB1,
                    swapMaxSize1,
                    swapAmount1
                )
                return `${tokenB} to ${tokenA} swap success!`
            } else {
                console.log('success');

            }

        }


        // const res = await swapContract(sizeVal)
        // const res = await contractRun(0.003, 10)
        // console.log('uniswap router contrct router-->', res);


        // placeOrder(first, "buy", bidPrice, sizeVal)
        // placeOrder(first, "sell", askPrice, sizeVal)

        // return true;
    }
}

export default runningBot

let botRunning = false;




