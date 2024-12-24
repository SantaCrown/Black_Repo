import React, { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { addLiquidity } from "../v2/scripts/add_liquidity";
import { swapTokenForExactToken } from "../v2/scripts/swap";
import Popmsg from "../uielement/Popmsg";

const Uniswap = () => {
  const account = useSelector((state) => state.swap.account);
  const [userAccount, setUserAccount] = useState(account)
  const userAddress = userAccount.getAccount().address
  const [popmsg, setPopMsg] = useState('')
  const [error, setError] = useState(null);
  const [hash, setHash] = useState(null)
  const [pairAddress, setPairAddress] = useState(null)
  const [msg, setMsg] = useState('')
  const [state, setState] = useState(true)

  console.log('----');
  console.log('msg-->', msg);
  console.log('----');

  const [token0AddressForAddingLiquidity, setToken0AddressForAddingLiquidity] = useState("");
  const [token1AddressForAddingLiquidity, setToken1AddressForAddingLiquidity] = useState("");
  const [token0AmountForAddingLiquidity, setToken0AmountForAddingLiquidity] = useState();
  const [token1AmountForAddingLiquidity, setToken1AmountForAddingLiquidity] = useState();

  let tokenA, tokenB;

  switch (token0AddressForAddingLiquidity) {
    case 'ETH': tokenA = '0x397Fb50090C910Bc9d4624a7F211f1bB2100fd45'; break;
    case 'XRP': tokenA = '0xeD055569c252f569B3f1C3f0559a7A8cd9CB2B42'; break;
    case 'BCT': tokenA = '0xB6A1743DC31507F181b12E7742Ae100Bb1f13878'; break;
    case 'USDT': tokenA = '0x68143aEE5344CF0C5CdE599f16d18951D4b69Ea9'; break;
  }

  switch (token1AddressForAddingLiquidity) {
    case 'ETH': tokenB = '0x397Fb50090C910Bc9d4624a7F211f1bB2100fd45'; break;
    case 'XRP': tokenB = '0xeD055569c252f569B3f1C3f0559a7A8cd9CB2B42'; break;
    case 'BCT': tokenB = '0xB6A1743DC31507F181b12E7742Ae100Bb1f13878'; break;
    case 'USDT': tokenB = '0x68143aEE5344CF0C5CdE599f16d18951D4b69Ea9'; break;
  }
  const handleAddLiquidity = async () => {
    const res = await addLiquidity(
      tokenA,
      tokenB,
      token0AmountForAddingLiquidity,
      token1AmountForAddingLiquidity
    )
    console.log('addrequidty -->res', res);
    setMsg(res)
    setHash(res?.hash)
    setPairAddress(res?.pairAddress)
    setPopMsg(res?.msg)
  }

  return (
    <div>
      {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}

      {
        msg ?
          (
            <div className="text-center text-white text-xl mt-10">
              <a target='_blank' href={`https://sepolia.etherscan.io/tx/${hash}`} className='text-white hover:cursor-point hover:text-green-500'>
                {`https://sepolia.etherscan.io/tx/${hash}`}
              </a>
              {/* <a href={`https;//`} target="_blank" className="hover:text-green">{msg?.hash}</a> */}
              <p>pairAddress : {pairAddress}</p>
            </div>
          ) : (
            <div>

            </div>
          )
      }
       <div className="flex flex-col w-full p-[20px] bg-[#000000] rounded-lg swapContainer">
      <div className="text-[#FEF200] font-bold text-[25px] text-left mb-5">
       <h1> Provideing Liquidity </h1>
      </div>

      <div className="flex flex-col gap-2 ">

        <div className="flex flex-col md:flex-row gap-2 py-3 input-feild">
        <input
          className='text-white border-[1px] border-white rounded-md bg-black py-3 w-full md:w-[50%] pl-0'
          type="text"
          value={token0AddressForAddingLiquidity}
          onChange={(e) => setToken0AddressForAddingLiquidity(e.target.value)}
          placeholder="Token A Address"
        />
        <input
        className='text-white border-[1px] border-white rounded-md bg-black py-3 px-2 w-full md:w-[50%] pl-0'
          type="text"
          value={token1AddressForAddingLiquidity}
          onChange={(e) => setToken1AddressForAddingLiquidity(e.target.value)}
          placeholder="Token B Address"
        />
        </div>
        <div className="flex flex-col md:flex-row gap-2 py-3 input-feild">
        <input
       className='text-white border-[1px] border-white rounded-md bg-black py-3 px-2 w-full md:w-[50%] pl-0'
          type="number"
          value={token0AmountForAddingLiquidity}
          onChange={(e) => setToken0AmountForAddingLiquidity(e.target.value)}
          placeholder="Amount of Token A"
        />
        <input
          className='text-white border-[1px] border-white rounded-md bg-black py-3 px-2 w-full md:w-[50%] pl-0'
          type="number"
          value={token1AmountForAddingLiquidity}
          onChange={(e) => setToken1AmountForAddingLiquidity(e.target.value)}
          placeholder="Amount of Token B"
        />
        </div>
        <button onClick={handleAddLiquidity} className=" border-[1px] border-green-500 default-btn login-btn mt-[20px] text-[#000000]"  >Add Liquidity</button>
      </div>
      </div>
    </div>
  )
}

export default Uniswap
