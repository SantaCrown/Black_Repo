import { ethers } from "ethers";
import { CurrentConfig } from './config'

const mainnetProvider = new ethers.JsonRpcProvider(
  CurrentConfig.rpc.mainnet
)
const sepoliaProvider = new ethers.JsonRpcProvider(
  CurrentConfig.rpc.sepolia
)

function getMainnetProvider() {
  return mainnetProvider
}
function getSepoliaProvider() {
  return sepoliaProvider
}

export function getProvider() {
  return CurrentConfig.env === 'Mainnet'
    ? getMainnetProvider()
    : getSepoliaProvider()
}

const wallet = createWallet()

function createWallet() {
  const provider = getProvider()
  const wallet = new ethers.Wallet(
    CurrentConfig.wallet.privateKey,
    provider,
  )
  return wallet
}

export function getWallet() {
  return wallet
}

export async function sendTransaction(
  transaction
) {
  if (transaction.value) {
    transaction.value = BigInt(transaction.value)
  }

  const txRes = await wallet.sendTransaction(transaction)

  const provider = getProvider()
  if (!provider) {
    return false
  }

  const nonce = await provider.getTransactionCount(getWallet().address)
  console.log("Current nonce:", nonce)

  const pendingNonce = await provider.getTransactionCount(getWallet().address, "pending")
  console.log("Pending nonce:", pendingNonce)

  console.log('txRes: ', txRes)

  console.log('transaction hash: ', txRes.hash)

  let receipt = null
  while (receipt === null) {
    try {
      receipt = await provider.getTransactionReceipt(txRes.hash)

      // console.log('receipt: ', receipt)

      if (receipt === null) {
        continue
      }
    } catch (error) {
      console.log('Error getting transaction receipt: ', error)
      break
    }
  }

  console.log('receipt: ', receipt)

  if (receipt) {
    return true
  } else {
    return false
  }
}