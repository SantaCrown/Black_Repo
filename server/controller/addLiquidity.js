import { ethers } from "ethers";
import abi from './abi/nft.json' assert {type: 'json'}

const addLiquidity = async (
    tokenA, tokenB, amountA, amountB
) => {
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nft_address = ethers.getAddress(process.env.NFT_ADDRESS)
    const positionManager = new ethers.Contract(
        nft_address, // NonfungiblePositionManager address
        abi, // Add ABI here
        wallet
    );

    const params = {
        token0: tokenA,
        token1: tokenB,
        fee: 3000,
        tickLower: -887220,
        tickUpper: 887220,
        amount0Desired: ethers.parseUnits(amountA, 18),
        amount1Desired: ethers.parseUnits(amountB, 18),
        amount0Min: 0,
        amount1Min: 0,
        recipient: ethers.getAddress(process.env.WALLET_ADDRESS),
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    };

    try {
        const tx = await positionManager.mint(params);
        await tx.wait();
        alert("Liquidity added successfully!");
    } catch (error) {
        console.error(error);
        alert("Error adding liquidity!");
    }
}

export default addLiquidity