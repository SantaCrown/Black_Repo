import React, { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { addLiquidity } from "../v2/scripts/add_liquidity";

const Uniswap = () => {
    const account = useSelector((state) => state.swap.account);
    const [userAccount, setUserAccount] = useState(account)
    const userAddress = userAccount.getAccount().address

    const [tokenSymbolA, setTokenSymbolA] = useState('')
    const [tokenSymbolB, setTokenSymbolB] = useState('')
    const [tokenAmountA, setTokenAmountA] = useState('')
    const [recipient, setRecipient] = useState('')

    // add liquidity part

    const [token0AddressForAddingLiquidity, setToken0AddressForAddingLiquidity] = useState("");
    const [token1AddressForAddingLiquidity, setToken1AddressForAddingLiquidity] = useState("");
    const [token0AmountForAddingLiquidity, setToken0AmountForAddingLiquidity] = useState();
    const [token1AmountForAddingLiquidity, setToken1AmountForAddingLiquidity] = useState();

    const handleSwap = async () => {
        console.log('swap hande');
        
    }
    const handleAddLiquidity = async () => {
        console.log('token0AddressForAddingLiquidity', token0AddressForAddingLiquidity);
        
        await addLiquidity(
            token0AddressForAddingLiquidity,
            token1AddressForAddingLiquidity,
            token0AmountForAddingLiquidity,
            token1AmountForAddingLiquidity
        )
    }

    const [tokenId, setTokenId] = useState("");
    const [liquidity, setLiquidity] = useState("");

    const removeLiquidity = async () => {
       console.log('here is the remove page');
       
    }

    return (
        <div>
            <div className="text-center text-white">
                this is the uniswap page
            </div>

            <div className="flex flex-col gap-2 ">
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text" value={tokenSymbolA} onChange={(e) => setTokenSymbolA(e.target.value)} name="" id="" />
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text" value={tokenSymbolB} onChange={(e) => setTokenSymbolB(e.target.value)} name="" id="" />
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text" value={tokenAmountA} onChange={(e) => setTokenAmountA(e.target.value)} name="" id="" />
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} name="" id="" />
                <button onClick={handleSwap} className=" text-white border-[1px] border-green-500">
                    swap
                </button>

            </div>


            <div className="text-white text-center">
                Provideing Liquidity
            </div>
            <div className="text-white text-centeer">Add</div>
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


            <div className="text-white text-center">
                remove liquidity
            </div>
            <div className="flex flex-col gap-2 ">
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text"  value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="Token ID" />
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text"  value={liquidity} onChange={(e) => setLiquidity(e.target.value)} placeholder="Liquidity Amount" />
                <button onClick={removeLiquidity} className=" text-white border-[1px] border-green-500" >Remove Liquidity</button>
            </div>
        </div>
    )
}

export default Uniswap
