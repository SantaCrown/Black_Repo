import { ethers } from 'ethers';
import abi from './abi/nft.json' assert {type: 'json'}

const removeLiquidity = async (
    tokenId,
    liquidity
) => {

    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const nft_address = ethers.getAddress(process.env.NFT_ADDRESS)

    const positionManager = new ethers.Contract(
        nft_address,
        abi, // Add ABI
        wallet
    );

    const params = {
        tokenId: tokenId,
        liquidity: ethers.parseUnits(liquidity, 18),
        amount0Min: 0,
        amount1Min: 0,
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
    };

    try {
        const tx = await positionManager.decreaseLiquidity(params);
        await tx.wait();
        alert("Liquidity removed successfully!");
    } catch (error) {
        console.error(error);
        alert("Error removing liquidity!");
    }
}

export default removeLiquidity