import { ethers } from "ethers";
import SwapRouterABI from "./ABI.json" assert { type: "json" };
import EthABI from "./eth.json" assert { type: "json" };

const swapController = async (baseToken, quoteToken, amount, address12) => {
    try {
        const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const SWAP_ROUTER = process.env.SWAP_ROUTER_ADDRESS;

        const swapRouterContract = new ethers.Contract(SWAP_ROUTER, SwapRouterABI, wallet);
        const baseTokenAddress = ethers.getAddress(process.env.WETH_ADDRESS);
        const quoteTokenAddress = ethers.getAddress(process.env.USDT_ADDRESS);

        const tokenContract = new ethers.Contract(baseTokenAddress, EthABI, wallet);

        // Approve tokens for the router
        console.log("Approving tokens...");
        const approveTx = await tokenContract.approve(SWAP_ROUTER, ethers.parseEther(amount.toString()));
        console.log("Approval transaction sent, waiting...");
        await approveTx.wait();
        console.log("Tokens approved:", approveTx.hash);


        // Prepare swap parameters
        const params = {
            tokenIn: baseTokenAddress,
            tokenOut: quoteTokenAddress,
            fee: 3000,
            recipient: ethers.getAddress(process.env.WALLET_ADDRESS),
            deadline: Math.floor(Date.now() / 1000) + 60 * 10,
            amountIn: ethers.parseEther(amount),
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0,
        };

        // Execute the swap
        console.log("Executing swap..........................................");
        const swapTx = await swapRouterContract.exactInputSingle(params, {
            gasLimit: 200000,
        });
        console.log("Swap transaction sent:::::::::::::::::::::::::", swapTx.hash);

        console.log('swapT____', swapTx);
        
        const receipt = await swapTx.wait();
        console.log("Swap completed:_______________________________", receipt.transactionHash);

    } catch (err) {
        console.error("Error during swap process:", err);
    }
};

export default swapController;
