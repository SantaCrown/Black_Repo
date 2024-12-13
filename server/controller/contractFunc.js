import { ethers } from "ethers";
import SwapRouterABI from "./abi/ABI.json" assert { type: "json" };
import EthABI from "./abi/eth.json" assert { type: "json" };
import UsdcABI from "./abi/usdc.json" assert { type: "json" };

const swapController = async (baseToken, quoteToken, amount, address12) => {
    try {
        const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        const SWAP_ROUTER = process.env.SWAP_ROUTER_ADDRESS;
        const weth_address = ethers.getAddress(process.env.WETH_ADDRESS);
        const usdc_address = ethers.getAddress(process.env.USDC_ADDRESS);
        const usdt_address = ethers.getAddress(process.env.USDT_ADDRESS);
        
        const swapRouterContract = new ethers.Contract(SWAP_ROUTER, SwapRouterABI, wallet);
        // const wethContract = new ethers.Contract(weth_address, EthABI, wallet);

        // const approveTx = await wethContract.approve(SWAP_ROUTER, ethers.MaxUint256);

        // await approveTx.wait();

        // console.log("Tokens approved:", approveTx.hash);

        // const overrides = {
        //     value: ethers.parseEther('0.0015'),
        //     gasLimit: 200000,
        // }

        // let tx = await wethContract.deposit(overrides)
        // await tx.wait()

        
        const amountIn = ethers.parseEther('0.001')

        const params = {
            tokenIn: ethers.ZeroAddress,
            tokenOut: usdt_address,
            fee: 3000,
            recipient: ethers.getAddress(process.env.WALLET_ADDRESS),
            deadline: Math.floor(Date.now() / 1000) + 60 * 10,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0,
        };

        console.log("Executing swap:");
        const swapTx = await swapRouterContract.exactInputSingle(params, {
            gasLimit: 200000,
            value: amountIn
        });
        console.log("Swap transaction sent:", swapTx.hash);

        console.log('swapTx____________________', swapTx);

        const receipt = await swapTx.wait();
        console.log("Swap completed:_________________________", receipt.transactionHash);

    } catch (err) {
        console.log('--------------------------------------------------');
        
        console.error("Error during swap process:", err);

        console.log('--------------------------------------------------');

    }
};

export default swapController;
