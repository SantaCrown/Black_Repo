import React, { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";

const Uniswap = () => {
    const account = useSelector((state) => state.swap.account);
    const [userAccount, setUserAccount] = useState(account)
    const userAddress = userAccount.getAccount().address

    const [tokenSymbolA, setTokenSymbolA] = useState('')
    const [tokenSymbolB, setTokenSymbolB] = useState('')
    const [tokenAmountA, setTokenAmountA] = useState('')
    const [recipient, setRecipient] = useState('')

    const handleSwap = async () => {
        if (!userAccount) return alert("MetaMask is not installed");

        try {
            //   const provider = new ethers.providers.Web3Provider(window.ethereum);
            //   const signer = provider.getSigner();
            //   const userAddress = await signer.getAddress();

            console.log('here is the swap controller');


            const response = await axios.post("http://localhost:5000/api/token-swap", {
                tokenSymbolA,
                tokenSymbolB,
                tokenAmountA,
                userAddress,
            });

            console.log('response', response);

            // if (response.data.msg === "success") {
            //     alert(`Swap Successful! Transaction Hash: ${response.data.txHash}`);
            // } else {
            //     alert(`Swap Failed: ${response.data.message}`);
            // }
        } catch (error) {
            console.error(error);
            // alert("An error occurred while swapping tokens.");
        }
    };

    // add liquidity part

    const [tokenA, setTokenA] = useState("");
    const [tokenB, setTokenB] = useState("");
    const [amountA, setAmountA] = useState("");
    const [amountB, setAmountB] = useState("");
    const addLiquidity = async () => {
        const response = await axios.post("http://localhost:5000/api/add-liquidity", {
            tokenA,
            tokenB,
            amountA,
            amountB
        })

        console.log('response', response);

    }
    // remove liquidity part

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
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text"  value={tokenA} onChange={(e) => setTokenA(e.target.value)} placeholder="Token A Address" />
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text"  value={tokenB} onChange={(e) => setTokenB(e.target.value)} placeholder="Token B Address" />
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text"  value={amountA} onChange={(e) => setAmountA(e.target.value)} placeholder="Amount of Token A" />
                <input className='text-white border-[1px] border-white rounded-md bg-black' type="text"  value={amountB} onChange={(e) => setAmountB(e.target.value)} placeholder="Amount of Token B" />
                <button onClick={addLiquidity} className=" text-white border-[1px] border-green-500" >Add Liquidity</button>
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
