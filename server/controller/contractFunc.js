// import { dotenv } from 'dotenv'
import dotenv from 'dotenv'

dotenv.config();
import Web3 from "web3";
import RouterABI from "./ABI.json"  assert { type: "json" };

const web3 = new Web3(process.env.INFURA_URL);

const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 SwapRouter
const walletAddress = process.env.WALLET_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

// Create a contract instance
const routerContract = new web3.eth.Contract(RouterABI, routerAddress);

async function swapExactInputSingle(tokenIn, tokenOut, amountIn, amountOutMinimum, fee) {
    try {
        const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
        const sqrtPriceLimitX96 = 0; // No price limit

        // Encode the function call

        // console.log('routerContract-->', routerContract);
        
        
        const txData = routerContract.methods
            .exactInputSingle({
                tokenIn,
                tokenOut,
                fee,
                recipient: walletAddress,
                deadline,
                amountIn,
                amountOutMinimum,
                sqrtPriceLimitX96,
            })
            .encodeABI();

        // Estimate gas
        const gasEstimate = await web3.eth.estimateGas({
            from: walletAddress,
            to: routerAddress,
            data: txData,
            value: tokenIn === "0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2" ? amountIn : "0", // ETH value if WETH
        });

        const gasPrice = await web3.eth.getGasPrice();

        // Create the transaction
        const tx = {
            from: walletAddress,
            to: routerAddress,
            data: txData,
            gas: gasEstimate,
            gasPrice,
            value: tokenIn === "0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2" ? amountIn : "0",
        };

        // Sign and send the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        console.log('signedtx', signedTx);
        
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    } catch (error) {
        console.error("Error during swap:", error);
    }
}

// Buy Function
const contractRun = async (amountInEth, amountInUsdt) => {

    async function buy(amountInEth) {
        const tokenIn = web3.utils.toChecksumAddress("0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2");
        const tokenOut = web3.utils.toChecksumAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7");

        // const tokenIn = "0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2"; // WETH
        // const tokenOut = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT
        const fee = 3000; // 0.3%
        const amountIn = web3.utils.toWei(amountInEth.toString(), "ether");
        const amountOutMinimum = 0; // Accept any output (add slippage protection if needed)
        
        await swapExactInputSingle(tokenIn, tokenOut, amountIn, amountOutMinimum, fee);
        console.log('suiccesss--->');
        
    }

    // Sell Function
    async function sell(amountInUsdt) {
        const tokenOut = web3.utils.toChecksumAddress("0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2");
        const tokenIn = web3.utils.toChecksumAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7");

        
        // const tokenIn = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT
        // const tokenOut = "0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2"; // WETH
        const fee = 3000; // 0.3%
        const amountIn = web3.utils.toWei(amountInUsdt.toString(), "mwei"); // USDT uses 6 decimals
        const amountOutMinimum = 0; // Accept any output (add slippage protection if needed)

        await swapExactInputSingle(tokenIn, tokenOut, amountIn, amountOutMinimum, fee);
    }

    console.log('amount-->', amountInEth);
    console.log('amountusdt-->', amountInUsdt);
    
    buy(amountInEth)
    sell(amountInUsdt)

}

export default contractRun