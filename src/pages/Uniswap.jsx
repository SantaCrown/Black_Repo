import React, { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { addLiquidity } from "../v2/scripts/add_liquidity";
import { swapTokenForExactToken } from "../v2/scripts/swap";

const Uniswap = () => {
  const account = useSelector((state) => state.swap.account);
  const [userAccount, setUserAccount] = useState(account)
  const userAddress = userAccount.getAccount().address

  const [token0AddressForSwap, setToken0AddressForSwap] = useState('')
  const [token1AddressForSwap, setToken1AddressForSwap] = useState('')
  const [token0MaxAmount, setToken0MaxAmount] = useState()
  const [token1AmountToBuy, setToken1AmountToBuy] = useState()

  const handleSwap = async () => {
    await swapTokenForExactToken(
      token0AddressForSwap,
      token1AddressForSwap,
      token0MaxAmount,
      token1AmountToBuy
    )
  }

  // add liquidity part

  const [token0AddressForAddingLiquidity, setToken0AddressForAddingLiquidity] = useState("");
  const [token1AddressForAddingLiquidity, setToken1AddressForAddingLiquidity] = useState("");
  const [token0AmountForAddingLiquidity, setToken0AmountForAddingLiquidity] = useState();
  const [token1AmountForAddingLiquidity, setToken1AmountForAddingLiquidity] = useState();

  const [msg, setMsg] = useState('')
  const [state, setState] = useState(true)

  const handleAddLiquidity = async () => {
    const res = await addLiquidity(
      token0AddressForAddingLiquidity,
      token1AddressForAddingLiquidity,
      token0AmountForAddingLiquidity,
      token1AmountForAddingLiquidity
    )
    console.log('addrequidty -->res', res);
    setMsg(res)
  }

  const [tokenId, setTokenId] = useState("");
  const [liquidity, setLiquidity] = useState("");

  const removeLiquidity = async () => {
    const response = await axios.post("http://localhost:5000/api/remove-liquidity", {
      tokenId,
      liquidity
    })
  }

  return (
    <div>
      <div className="text-center text-white mt-10 mb-5">
        this is the uniswap page
      </div>

      <div className="flex flex-col gap-2 ">
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="text"
          value={token0AddressForSwap}
          onChange={(e) => setToken0AddressForSwap(e.target.value)}
          name=""
          id=""
        />
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="text"
          value={token1AddressForSwap}
          onChange={(e) => setToken1AddressForSwap(e.target.value)}
          name=""
          id=""
        />
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="number"
          value={token0MaxAmount}
          onChange={(e) => setToken0MaxAmount(e.target.value)}
          name=""
          id=""
        />
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="text"
          value={token1AmountToBuy}
          onChange={(e) => setToken1AmountToBuy(e.target.value)}
          name=""
          id=""
        />
        <button
          onClick={handleSwap}
          className=" text-white border-[1px] border-green-500"
        >
          swap
        </button>

      </div>


      <div className="text-white text-center mt-10 mb-5">
        Provideing Liquidity
      </div>
      <div className="flex flex-col gap-2 ">
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="text"
          value={token0AddressForAddingLiquidity}
          onChange={(e) => setToken0AddressForAddingLiquidity(e.target.value)}
          placeholder="Token A Address"
        />
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="text"
          value={token1AddressForAddingLiquidity}
          onChange={(e) => setToken1AddressForAddingLiquidity(e.target.value)}
          placeholder="Token B Address"
        />
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="number"
          value={token0AmountForAddingLiquidity}
          onChange={(e) => setToken0AmountForAddingLiquidity(e.target.value)}
          placeholder="Amount of Token A"
        />
        <input
          className='text-white border-[1px] border-white rounded-md bg-black'
          type="number"
          value={token1AmountForAddingLiquidity}
          onChange={(e) => setToken1AmountForAddingLiquidity(e.target.value)}
          placeholder="Amount of Token B"
        />
        <button onClick={handleAddLiquidity} className=" text-white border-[1px] border-green-500" >Add Liquidity</button>
      </div>


      <div className="text-white text-center mt-10 mb-5">
        remove liquidity
      </div>
      <div className="flex flex-col gap-2 ">
        <input className='text-white border-[1px] border-white rounded-md bg-black' type="text" value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="Token ID" />
        <input className='text-white border-[1px] border-white rounded-md bg-black' type="text" value={liquidity} onChange={(e) => setLiquidity(e.target.value)} placeholder="Liquidity Amount" />
        <button onClick={removeLiquidity} className=" text-white border-[1px] border-green-500" >Remove Liquidity</button>
      </div>
    </div>
  )
}

export default Uniswap
