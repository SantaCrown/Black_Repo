import React, { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";

const Uniswap = () => {


    const account = useSelector((state) => state.swap.account);

    const [userAccount, setUserAccount] = useState(account)
    console.log('userAccount--->', userAccount.getAccount());

    const userAddress = userAccount.getAccount().address
    console.log('useraddress', userAddress);

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
        </div>
    )
}

export default Uniswap
