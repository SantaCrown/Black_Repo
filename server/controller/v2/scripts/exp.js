import { swapTokenForExactToken } from "./swap"

const main = async () => {
  await swapTokenForExactToken()
}

main().then(() => {
  console.log("Swap executed successfully")
})
