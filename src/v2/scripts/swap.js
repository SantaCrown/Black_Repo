import { ethers } from "ethers"
import { Token } from "@uniswap/sdk-core"
import { Pair } from "@uniswap/v2-sdk"

import { ERC20_ABI, getWethTokenAddress, ROUTER_ABI } from "../abi"
import { getProvider, getWallet } from "../providers"
import { CurrentConfig, TO_ADDRESS } from "../config"

import { SEPOLIA_CHAIN_ID } from "../constants"

const token0Address = CurrentConfig.token.token0Address
const token1Address = CurrentConfig.token.token1Address

const v2RouterAddress = CurrentConfig.env == 'Mainnet'
  ? '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  : '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3'

export async function swapTokenForExactToken() {
  if (!token0Address || !token1Address) {
    throw new Error(`Missing required environment variables:
      TOKEN0_ADDRESS: ${token0Address ? 'Set' : 'Not Set'}
      TOKEN1_ADDRESS: ${token1Address ? 'Set' : 'Not Set'}
    `);
  }

  const token0Contract = new ethers.Contract(token0Address, ERC20_ABI, getProvider())
  const token1Contract = new ethers.Contract(token1Address, ERC20_ABI, getProvider())
  
  const token0Decimals = await token0Contract.decimals()
  const token1Decimals = await token1Contract.decimals()

  const token0DecimalsNumber = Number(token0Decimals)
  const token1DecimalsNumber = Number(token1Decimals)

  // TODO: Change chain ID on Mainnet
  const token0 = new Token(SEPOLIA_CHAIN_ID, token0Address, token0DecimalsNumber)
  const token1 = new Token(SEPOLIA_CHAIN_ID, token1Address, token1DecimalsNumber)

  console.log('token 0: ', token0)
  console.log('token 1: ', token1)

  try {
    const pairAddress = Pair.getAddress(token0, token1)
    console.log('pair address: ', pairAddress)

    const pairContract = new ethers.Contract(pairAddress, ROUTER_ABI, getProvider())

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

    let amountOut = CurrentConfig.token.token1AmountForSwap
    let expectedAmountIn = reserves[0] - (reserves[0] * reserves[1]) / (reserves[1] + BigInt(amountOut))
    let amountInMax = CurrentConfig.token.token0AmountForSwapMax;

    console.log(`Swapping ${expectedAmountIn} ${token1.symbol} for ${amountOut} ${token0.symbol}`)

    const routerContract = new ethers.Contract(v2RouterAddress, ROUTER_ABI, getWallet())

    const path = [token1.address, token0.address]
    const to = TO_ADDRESS
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10

    const tx = await routerContract.swapTokensForExactTokens(
      amountOut,
      amountInMax,
      path,
      to,
      deadline,
    )

    await tx.wait()
    console.log("Swapped successfully")
    return true

  } catch (error) {
    console.error('Error getting swap transaction:', error)
    return false
  }
}
