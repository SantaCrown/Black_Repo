import ccxt from 'ccxt';
import Bot from '../models/bot.js';
import Order from '../models/orderBook.js';
import MarketPrice from '../models/marketPrice.js';
import getOrderBook from './getOrderBook.js';
import getMarketPrice from './getMarketprice.js';


const kuCoinBot = async (symbol1, symbol2, botName, size, profit, spread, trading, connector, mode, botStyle, refreshTime, coolTime) => {

    console.log("_____________________kucoin start__________________");

    const kucoin = new ccxt.kucoin({
        apiKey: '673c26606cbc8d0001aa32c4',
        secret: '9179ae15-8ba3-4d75-8c3c-6c4f47aa47d4',
        password: '9717944941',
    })

    const marketData = await kucoin.loadMarkets()
    const ethUsdtMarket = marketData[`${symbol1}/${symbol2}`];

    if (ethUsdtMarket) {

        const symbol = ethUsdtMarket?.info.symbol
        const orderBook = await getOrderBook(symbol);
        const marketPrice = await getMarketPrice(symbol);
        // const fetchMarket = await fetchMarketData(symbol)

        const newOrderBook = new Order({
            orderbook: orderBook
        })
        await newOrderBook.save()

        const newMarketPrice = new MarketPrice({
            marketprice: marketPrice
        })
        await newMarketPrice.save()

        const bot = new Bot({
            botName: botName,
            size: size,
            profit: profit,
            spread: spread,
            trading: trading,
            connector: connector,
            botStyle : botStyle,
            mode: mode,
            info: ethUsdtMarket.info
        })

        await bot.save()
    }
}

export default kuCoinBot