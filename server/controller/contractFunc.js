import dotenv from "dotenv";
import { ethers } from 'ethers'
// import swapRouterABI from './ABI.json'
import swapRouterABI from "./ABI.json" assert { type: "json" };
import Web3 from "web3";

dotenv.config()
// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_URL = process.env.INFURA_URL;
const SWAP_ROUTER_ADDRESS = process.env.SWAP_ROUTER_ADDRESS;

const swapContract = async (size) => {

    // Initialize Web3
    const web3 = new Web3(INFURA_URL);

    // Uniswap V3 Router Address
    const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // SwapRouter address

    // Token addresses
    const WETH = "0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2"; // WETH address
    const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT address


    const walletAddress = process.env.WALLET_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;

    // SwapRouter contract instance
    const routerContract = new web3.eth.Contract(swapRouterABI, routerAddress);

    // Input and output amounts (adjust as needed)
    const amountIn = ethers.parseUnits("0.1", "ether"); // Amount of WETH to swap
    const amountOutMin = 0; // Minimum amount of USDT to receive (set for simplicity, adjust for slippage)

    // Deadline for the swap (e.g., 20 minutes from now)
    const deadline = Math.floor(Date.now() / 1000) + 1200;

    // Create the transaction data
    const swapData = routerContract.methods
        .exactInputSingle({
            tokenIn: WETH,
            tokenOut: USDT,
            fee: 3000, // Fee tier: 0.3%
            recipient: walletAddress,
            deadline,
            amountIn,
            amountOutMinimum: amountOutMin,
            sqrtPriceLimitX96: 0, // No price limit
        })
        .encodeABI();

    // Get gas estimate
    const gasEstimate = await web3.eth.estimateGas({
        from: walletAddress,
        to: routerAddress,
        data: swapData,
    });

    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
        from: walletAddress,
        to: routerAddress,
        data: swapData,
        gas: gasEstimate,
        gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Swap Transaction Receipt:", receipt);

    console.log('tx--->', tx);


}
export default swapContract