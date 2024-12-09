// import { ethers } from "ethers";
// import dotenv from "dotenv";

// dotenv.config();

// // Uniswap V2 Router Address
// const UNISWAP_ROUTER_ADDRESS = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
// const routerABI = [
//   // swapExactTokensForTokens
//   "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
//   // approve
//   "function approve(address spender, uint amount) external returns (bool)"
// ];

// // Token Addresses
// const WETH_ADDRESS = "0xC02aaa39b223FE8D0A0E5C4F27eAD9083C756Cc2";
// const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

// // Initialize ethers provider and signer
// const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// // Connect to Uniswap Router Contract
// const router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, routerABI, wallet);

// // Approve Tokens for Spending
// async function approveToken(tokenAddress, spenderAddress, amount) {
//   const erc20ABI = [
//     "function approve(address spender, uint amount) external returns (bool)"
//   ];
//   const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, wallet);
//   const tx = await tokenContract.approve(spenderAddress, amount);
//   await tx.wait();
//   console.log(`Approved ${amount} tokens for ${spenderAddress}`);
// }

// // Swap Function
// async function swapTokens(amountIn, amountOutMin, tokenIn, tokenOut, recipient) {
//   const path = [tokenIn, tokenOut]; // Swap path: tokenIn -> tokenOut
//   const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

//   // Approve the router to spend your tokens
//   await approveToken(tokenIn, UNISWAP_ROUTER_ADDRESS, amountIn);

//   // Perform the swap
//   const tx = await router.swapExactTokensForTokens(
//     amountIn,       // Amount of tokenIn to swap
//     amountOutMin,   // Minimum amount of tokenOut to receive
//     path,           // Swap path
//     recipient,      // Recipient address
//     deadline        // Transaction deadline
//   );
//   const receipt = await tx.wait();
//   console.log("Swap Successful:", receipt);
// }

// // Execute a Swap
// (async () => {
//   const amountIn = ethers.utils.parseUnits("0.1", 18); // 0.1 WETH
//   const amountOutMin = ethers.utils.parseUnits("100", 6); // Minimum 100 USDT
//   const recipient = wallet.address;

//   await swapTokens(amountIn, amountOutMin, WETH_ADDRESS, USDT_ADDRESS, recipient);
// })();


// ///buy order

// const buyOrder = async (amountIn, tokenIn, tokenOut, fee, slippage) => {
//     const params = {
//         tokenIn: tokenIn, // USDT
//         tokenOut: tokenOut, // WETH
//         fee: fee, // e.g., 3000 for 0.3%
//         recipient: wallet.address,
//         deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
//         amountIn: ethers.utils.parseUnits(amountIn.toString(), 6), // USDT decimals
//         amountOutMinimum: ethers.utils.parseUnits(
//             (amountIn * (1 - slippage)).toString(),
//             18 // WETH decimals
//         ), // Minimum WETH to receive
//         sqrtPriceLimitX96: 0, // No price limit
//     };

//     const tx = await router.exactInputSingle(params, {
//         gasLimit: 200000, // Adjust based on gas estimation
//     });

//     console.log(`Transaction Hash: ${tx.hash}`);
// };


// ///sell order
// const sellOrder = async (amountIn, tokenIn, tokenOut, fee, slippage) => {
//     const params = {
//         tokenIn: tokenIn, // WETH
//         tokenOut: tokenOut, // USDT
//         fee: fee, // e.g., 3000 for 0.3%
//         recipient: wallet.address,
//         deadline: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
//         amountIn: ethers.utils.parseUnits(amountIn.toString(), 18), // WETH decimals
//         amountOutMinimum: ethers.utils.parseUnits(
//             (amountIn * (1 - slippage)).toString(),
//             6 // USDT decimals
//         ), // Minimum USDT to receive
//         sqrtPriceLimitX96: 0, // No price limit
//     };

//     const tx = await router.exactInputSingle(params, {
//         gasLimit: 200000, // Adjust based on gas estimation
//     });

//     console.log(`Transaction Hash: ${tx.hash}`);
// };

// ///wallet connect 
// import { ethers } from "ethers";

// const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL");
// const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

// // Uniswap V3 Router Address
// const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

// // ABI for the Router Contract
// const routerAbi = [
//     "function exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160)) payable returns (uint256)"
// ];

// // Router Contract Instance
// const router = new ethers.Contract(routerAddress, routerAbi, wallet);
