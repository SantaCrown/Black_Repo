import { ethers } from "ethers"
import { Token } from "@uniswap/sdk-core"
import { Pair } from "@uniswap/v2-sdk"

import { ERC20_ABI, ROUTER_ABI, UNISWAP_ROUTER_ABI } from "../abi.js"
import { getProvider, getWallet } from "../providers.js"
import { CurrentConfig, TO_ADDRESS } from "../config.js"

import { SEPOLIA_CHAIN_ID, MAINNET_CHAIN_ID } from "../constants.js"

const v2RouterAddress = CurrentConfig.env == 'Mainnet'
  ? '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  : '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3'

export async function swapTokenForExactToken(
  token0Address,
  token1Address,
  token0AmountForSwapMax,
  token1AmountForSwap) {

  if (!token0Address || !token1Address) {
    throw new Error(`Missing required environment variables:
      TOKEN0_ADDRESS: ${token0Address ? 'Set' : 'Not Set'}
      TOKEN1_ADDRESS: ${token1Address ? 'Set' : 'Not Set'}
    `);
  }

  console.log('token0 address: ', token0Address)
  console.log('token1 address: ', token1Address)


  const token0Contract = new ethers.Contract(token0Address, ERC20_ABI, getWallet())
  const token1Contract = new ethers.Contract(token1Address, ERC20_ABI, getWallet())

  const token0Decimals = await token0Contract.decimals()
  const token1Decimals = await token1Contract.decimals()

  const token0DecimalsNumber = Number(token0Decimals)
  const token1DecimalsNumber = Number(token1Decimals)

  const token0 = new Token(SEPOLIA_CHAIN_ID, token0Address, token0DecimalsNumber)
  const token1 = new Token(SEPOLIA_CHAIN_ID, token1Address, token1DecimalsNumber)

  // const token0 = new Token(MAINNET_CHAIN_ID, token0Address, token0DecimalsNumber)
  // const token1 = new Token(MAINNET_CHAIN_ID, token1Address, token1DecimalsNumber)

  console.log('token 0: ', token0)
  console.log('token 1: ', token1)

  try {
    const pairAddress = Pair.getAddress(token0, token1)
    console.log('pair address: ', pairAddress)

    const pairContract = new ethers.Contract(pairAddress, ROUTER_ABI, getProvider())
    // const pairContract = new ethers.Contract(pairAddress, UNISWAP_ROUTER_ABI, getProvider())

    let reserves

    let isInitialized = false
    try {
      reserves = await pairContract.getReserves()
      console.log(`Reserves for pair: ${token0.symbol}-${token1.symbol}: ${reserves}`)
      isInitialized = true
    } catch (error) {
      console.log('Pair does not exist')
      return false
    }

    let amountOut = token1AmountForSwap
    let expectedAmountIn = reserves[0] - (reserves[0] * reserves[1]) / (reserves[1] + BigInt(amountOut))
    let amountInMax = token0AmountForSwapMax;

    console.log("Approving tokens for router")
    await token0Contract.approve(v2RouterAddress, amountInMax)
    console.log("Token approved")

    console.log(`Swapping ${expectedAmountIn} ${token0.symbol} for ${amountOut} ${token1.symbol}`)

    const routerContract = new ethers.Contract(v2RouterAddress, ROUTER_ABI, getWallet())
    // const routerContract = new ethers.Contract(v2RouterAddress, UNISWAP_ROUTER_ABI, getWallet())

    const path = [token0.address, token1.address]
    const to = TO_ADDRESS
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10

    const gasLimit = 3000000n

    const tx = await routerContract.swapTokensForExactTokens(
      amountOut,
      amountInMax,
      path,
      to,
      deadline,
      {
        gasLimit
      },
    )

    console.log("Transaction sent. Hash:", tx.hash);

    console.log('-----------------------------');
    console.log('tx-->', tx);
    console.log('-----------------------------');

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction mined. Receipt:", receipt);

    // Access specific details if needed
    console.log("Block Number:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("Swapped successfully")

    return true

  } catch (error) {
    console.error('Error getting swap transaction:', error)
    return false
  }
}
