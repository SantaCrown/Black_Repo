import { ethers } from "ethers"
import { Token } from "@uniswap/sdk-core"
import { Pair } from "@uniswap/v2-sdk"

import { SEPOLIA_CHAIN_ID, MAINNET_CHAIN_ID } from "../constants.js"
import { ERC20_ABI, UNISWAP_ROUTER_ABI, ROUTER_ABI } from "../abi.js"
import { getProvider, getWallet } from "../providers.js"
import { CurrentConfig } from "../config.js"

const v2RouterAddress = CurrentConfig.env == 'Mainnet'
  ? '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  : '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3'

export async function addLiquidity(token0Address, token1Address,
  token0Amount, token1Amount) {

  if (!token0Address || !token1Address) {
    throw new Error(`Missing required environment variables:
      TOKEN0_ADDRESS: ${token0Address ? 'Set' : 'Not Set'}
      TOKEN1_ADDRESS: ${token1Address ? 'Set' : 'Not Set'}
    `)
  }

  const tokenAContract = new ethers.Contract(token0Address, ERC20_ABI, getProvider())
  const tokenBContract = new ethers.Contract(token1Address, ERC20_ABI, getProvider())

  // const tokenAContract = new ethers.Contract(token0Address, UNISWAP_ROUTER_ABI, getProvider())
  // const tokenBContract = new ethers.Contract(token1Address, UNISWAP_ROUTER_ABI, getProvider())


  const tokenADecimals = await tokenAContract.decimals()
  const tokenBDecimals = await tokenBContract.decimals()

  const tokenADecimalsNumber = Number(tokenADecimals)
  const tokenBDecimalsNumber = Number(tokenBDecimals)

  // TODO: change chain id on mainnet
  const tokenA = new Token(SEPOLIA_CHAIN_ID, token0Address, tokenADecimalsNumber)
  const tokenB = new Token(SEPOLIA_CHAIN_ID, token1Address, tokenBDecimalsNumber)

  // const tokenA = new Token(MAINNET_CHAIN_ID, token0Address, tokenADecimalsNumber)
  // const tokenB = new Token(MAINNET_CHAIN_ID, token1Address, tokenBDecimalsNumber)

  console.log('tokenA: ', tokenA)
  console.log('tokenB: ', tokenB)

  try {
    const pairAddress = Pair.getAddress(tokenA, tokenB)
    console.log('pairAddress: ', pairAddress)
    console.log('sepolia v2 router address: ', v2RouterAddress)

    const pairContract = new ethers.Contract(pairAddress, ROUTER_ABI, getProvider())
    // const pairContract = new ethers.Contract(pairAddress, UNISWAP_ROUTER_ABI, getProvider())

    let reserves

    try {
      reserves = await pairContract.getReserves()
      console.log(`Reserves for pair: ${tokenA.symbol}-${tokenB.symbol}: ${reserves}`)
    } catch (error) {
      console.log('Pair does not exist, It will be created when liquidity is added')
    }

    const amountADesired = ethers.parseUnits(token0Amount.toString(), tokenA.decimals)
    const amountBDesired = ethers.parseUnits(token1Amount.toString(), tokenA.decimals)

    const tokenAContract = new ethers.Contract(tokenA.address, ERC20_ABI, getWallet())
    const tokenBContract = new ethers.Contract(tokenB.address, ERC20_ABI, getWallet())

    console.log("Approving tokens for router")
    await tokenAContract.approve(v2RouterAddress, amountADesired)
    await tokenBContract.approve(v2RouterAddress, amountBDesired)
    console.log("Tokens approved")

    const routerContract = new ethers.Contract(v2RouterAddress, ROUTER_ABI, getWallet())

    const slippageTolerance = 5n
    const amountAMin = amountADesired * (100n - slippageTolerance) / 100n
    const amountBMin = amountBDesired * (100n - slippageTolerance) / 100n
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10

    console.log("Adding liquidity")

    const gasLimit = 3000000n

    const tx = await routerContract.addLiquidity(
      tokenA.address,
      tokenB.address,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      getWallet().address,
      deadline,
      {
        gasLimit
      },
    )

    await tx.wait()
    console.log("Liquidity added successfully")
    return 'success!'

  } catch (error) {
    console.log('Error adding liquidity ', error)
  }
}
