
import Bot from '../models/bot.js'
import axios from 'axios';

const uniswapBot = async (
    symbol1,
    symbol2,
    botName,
    size,
    profit,
    spread,
    trading,
    connector,
    mode,
    botStyle,
    refreshTime,
    coolTime,
    maxAmount,
    swapAmount
) => {

    const query = `
    	{
            pools(where: {id: "0x4e68ccd3e89f51c3074ca5072bbac773960dfa36" }) {
                id
                token0 {
                    symbol
                    decimals
                }
                token1 {
                    symbol
                    decimals
                }
                feeTier
                liquidity
                sqrtPrice
                volumeUSD
                tick
                token0Price
                token1Price
            }
        }`;

    const UNISWAP_SUBGRAPH_URL = 'https://gateway.thegraph.com/api/2f73126e38f544d4381f91ce28d320cf/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B';
    const response = await axios.post(UNISWAP_SUBGRAPH_URL, { query });
    const saveData = response.data.data?.pools[0]

    const bot = new Bot({
        botName: botName,
        size: size,
        profit: profit,
        spread: spread,
        trading: trading,
        connector: connector,
        mode: mode,
        botStyle: botStyle,
        maxAmount: maxAmount,
        swapAmount: swapAmount,
        info: saveData
    })

    await bot.save()
}

export default uniswapBot
