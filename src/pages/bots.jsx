// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import Card from "../components/Card/card";
import InputType from "../uielement/InputType";
import Button from "../uielement/Button";
import { listAccounts, getCredentials, listConfigScript, listScripts, createInstance } from '../util/Apis';
import { SettingIcon, ViewIcon, PlayIcon } from "../icons/icons";
import DropDownSelect from "../uielement/DropDownSelect";
import Popmsg from '../uielement/Popmsg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Bots() {
  const naviage = useNavigate()
  const [buttonOpen, setButtonOpen] = useState(false)
  const [account, setAccounts] = useState(null);
  const [data, setUserData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [configScript, setConfigScript] = useState([]);
  const [scripts, setScripts] = useState([]);
  const [cred, setCred] = useState(null);
  const [configVal, setConfigScValue] = useState(null);
  const [scriptValue, setScriptValue] = useState(null);
  const [popmsg, setPopmsg] = useState(null);
  const [error, setError] = useState(null);
  const [runAcc, setRunAcc] = useState('')
  const [botAccount, setBotAccount] = useState([])
  const [getBotInfo, setGetBotInfo] = useState(null)
  const [runBot, setRunBot] = useState(null)
  const [state, setState] = useState(true)
  const [hash, setHash] = useState(null)
  let infoData = [];


  // const handleClick = () => {
  //   setButtonOpen(!buttonOpen)
  // }

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const userData = await listScripts();

  //       setConfigScript([]); // Reset select data before setting new data
  //       userData.forEach(element => {
  //         setScripts(prevData => [...prevData, { value: element, label: element }]);
  //       });
  //     } catch (error) {
  //       setError('Failed to load users');
  //     }
  //   };

  //   fetchAccounts();
  // }, []);

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const userData = await listAccounts();
  //       setUserData([]);
  //       setSelectData([]); // Reset select data before setting new data
  //       userData.forEach(element => {
  //         setSelectData(prevData => [...prevData, { value: element, label: element }]);
  //       });

  //       // Use a for-loop to handle async operations properly
  //       for (const ele of userData) {
  //         try {
  //           const acc = await getCredentials(ele);
  //           setUserData(prevData => [...prevData, { ele, acc }]);
  //         } catch (error) {
  //           setError('Failed to load user credentials');
  //         }
  //       }

  //     } catch (error) {
  //       setError('Failed to load users');
  //     }
  //   };

  //   fetchAccounts();
  // }, []);

  // const createInstanceInit = async () => {
  //   try {
  //     const instance = await createInstance({
  //       "instance_name": account,
  //       "credentials_profile": cred,
  //       "image": "hummingbot/backend-api:latest",
  //       "script": scriptValue,
  //       "script_config": configVal
  //     });
  //     if (instance.success = true) {
  //       setPopmsg("Black Lemon Instance Created Sucesfully")
  //       setError(false)
  //     }
  //   } catch (error) {
  //     setPopmsg(error?.config.data)
  //     setError(true)
  //   }
  // };

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const userData = await listConfigScript();

  //       setConfigScript([]); // Reset select data before setting new data
  //       userData.forEach(element => {
  //         setConfigScript(prevData => [...prevData, { value: element, label: element }]);
  //       });

  //       // Use a for-loop to handle async operations properly


  //     } catch (error) {

  //     }
  //   };

  //   fetchAccounts();
  // }, []);

  // function addAccnoutInput(val) {
  //   setAccounts(val.target.value);
  // }
  // function selectedValue(data) {
  //   setCred(data.value);
  // }
  // function selectedconfigScriptValue(data) {
  //   setConfigScValue(data.value);
  // }
  // function selectedScriptValue(data) {
  //   setScriptValue(data.value);
  // }

  // function selectedValue(data) {
  //   setRunAcc(data.value);
  // }

  

  let average = true;

  const getBotAccount = async () => {
    const response = await axios.get('http://localhost:5000/api/bot-get')
    setGetBotInfo(response.data)
    console.log('responsedat', response.data);

    const bot = response?.data || []
    const formData = bot?.map((item) => ((!item.status) ? {
      value: item._id,
      label: item.botName
    } : {}))

    setBotAccount(formData)
  }

  useEffect(() => {
    getBotAccount()
  }, [state])

  getBotInfo?.map((item, key) => {
    return infoData[key] = item.info
  })


  const botStart = async (id) => {
    const response = await axios.post('http://localhost:5000/api/bot-start', { id })

    console.log('response-->', response?.data);
    setHash(response?.data.text)

    if (response?.data?.msg) setPopmsg(response?.data?.msg)
    setState(!state)
  }

  const botStop = async (id) => {
    const response = await axios.post('http://localhost:5000/api/bot-stop', { id })
    setState(!state)
  }

  useEffect(() => {
    setTimeout(() => {
      setHash('')
      setPopmsg('')
    }, 10000)
  }, [hash, popmsg])

  return (
    <div className="bots bot-run mt-10">
      {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}
      <h2 className="heading-top">
        Bot Control
      </h2>
      <div>
        {
          hash ? (
            <div className='text-center text-white text-lg'>
              Transaction Success! <br />
              <a target='_blank' href={`https://sepolia.etherscan.io/tx/${hash}`} className='text-white hover:cursor-point hover:text-green-500'>
                {`https://sepolia.etherscan.io/tx/${hash}`}
              </a>
            </div>
          )
            : (
              <div></div>
            )
        }
      </div>
      <div className='mt-10'>
        <div className='mt-5'>
          <table className='w-full text-center text-white'>
            <thead>
              <tr>
                <td>No</td>
                <td>Bot Name</td>
                <td>Exchange</td>
                <td>Connector</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                getBotInfo &&
                getBotInfo.map((item, key) => (
                  <tr index={key} className='p-1'>
                    <td>{key + 1}</td>
                    <td onClick={() => naviage('/strategies')} className='hover:cursor-pointer hover:bg-yellow-200 hover:text-black hover:rounded-md'>{item?.botName}</td>
                    <td>{item?.botStyle}</td>
                    <td>{item?.botStyle}</td>
                    <td className=''>
                      {(item.status) ?
                        (<p className='rounded-md bg-red-400 p-2'>Running ....</p>) :
                        (<p className='rounded-md bg-green-400 p-2'>Available</p>)} </td>
                    <td className='flex justify-center'>
                      {(item.status) ? (
                        <Button
                          buttonType='button'
                          handler={() => botStop(item?._id)}
                          className='default-btn py-2 px-6'>
                          Stop
                        </Button>
                      ) : (
                        <Button
                          buttonType='button'
                          handler={() => botStart(item?._id)}
                          className='default-btn py-2 px-6'>
                          Start
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className='text-white text-xl mt-10'>
        Bot Details :
      </div>
      <div className='grid grid-cols-2 gap-5 justify-between mt-2'>
        {

          infoData &&
          infoData?.map((ele) => (
            <table className='text-left border-white border-[1px] rounded-md p-2 text-white text-lg'>
              <thead className='p-2'>
                <td className='p-1 border-[1px] border-white'>Field</td>
                <td className='p-1 border-[1px] border-white'>Value</td>
              </thead>
              <tbody>
                <tr>
                  <td className='p-1 border-[1px] border-white'>Fee :</td>
                  <td className='p-1 border-[1px] border-white'>{Number(ele?.feeTier) / 10000} % </td>
                </tr>
                <tr>
                  <td className='p-1 border-[1px] border-white'>Liquidity :</td>
                  <td className='p-1 border-[1px] border-white'>{(Number(ele?.liquidity) / 1000000000000000000).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className='p-1 border-[1px] border-white'>SqrtPrice : </td>
                  <td className='p-1 border-[1px] border-white'>{(Number(ele?.sqrtPrice) / Math.pow(2, 96)).toFixed(6)}</td>
                </tr>
                <tr>
                  <td className='p-1 border-[1px] border-white'>Token0Price : </td>
                  <td className='p-1 border-[1px] border-white'>{Number(ele?.token0Price).toFixed(4)}  {ele?.token1.symbol} / {ele?.token0.symbol}</td>
                </tr>
                <tr>
                  <td className='p-1 border-[1px] border-white'>Token1price : </td>
                  <td className='p-1 border-[1px] border-white'>{Number(ele?.token1Price).toFixed(1)} {ele?.token0.symbol} / {ele?.token1.symbol}</td>
                </tr>
                <tr>
                  <td className='p-1 border-[1px] border-white'>VolumnUSO :</td>
                  <td className='p-1 border-[1px] border-white'>${Number(ele?.volumeUSD).toFixed(2)} </td>
                </tr>
              </tbody>
            </table>
          ))
        }
      </div>
    </div>
  );
}

export default Bots;
