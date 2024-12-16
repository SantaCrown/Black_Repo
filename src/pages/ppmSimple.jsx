import React, { useState } from 'react'
import Card from "../components/Card/card";
import InputType from "../uielement/InputType";
import Button from "../uielement/Button";;
import { SettingIcon, ViewIcon, PlayIcon } from "../icons/icons";
import axios from 'axios';
import Popmsg from '../uielement/Popmsg';
import DropDownSelect from '../uielement/DropDownSelect';
import { useNavigate } from 'react-router-dom';

function PpmSimple() {

  const navigate = useNavigate()
  const [buttonOpen, setButtonOpen] = useState(false)
  const [refreshT, setRefreshT] = useState(null)
  const [coolT, setCoolT] = useState(null)
  const [mode, setMode] = useState(null)

  const handleClick = () => {
    setButtonOpen(!buttonOpen)
  }

  function selectedValue(data) {
    setMode(data.value);
  }

  const selectData = [
    {
      label: 'paper Mode',
      value: 'papermode'
    },
    {
      label: 'live Mode',
      value: 'livemode'
    },
  ]

  const [botName, setBotName] = useState("")
  const [size, setSize] = useState('')
  const [profit, setProfit] = useState('')
  const [popmsg, setPopmsg] = useState(null);
  const [error, setError] = useState(null);
  const [spread, setSpread] = useState(null);
  const [tokenA, setTokenA] = useState(null)
  const [tokenB, setTokenB] = useState(null)

  const addBotName = (val) => {
    setBotName(val.target.value)
  }

  const addSize = (event) => {
    setSize(event.target.value)
  }

  const addProfit = (event) => {
    setProfit(event.target.value)
  }

  const refreshTime = (event) => {
    setRefreshT(event.target.value)
  }

  const coolTime = (event) => {
    setCoolT(event.target.value)
  }

  const addSpread = (event) => {
    setSpread(event.target.value)
  }

  const addTokenAMaxAmount = (event) => {
    setTokenA(event.target.value)
  }

  const addTokenBSwapAmount = (event) => {
    setTokenB(event.target.value)
  }

  const [checkboxes, setCheckboxes] = useState({
    ETH: false,
    XRP: false,
    BTC: false,
    USDT: false,
  });

  const [connectors, setConnectors] = useState({
    Binance: false,
    Kucoin: false,
    Bybit: false,
    UniSwap: false,
  });

  const handleConnector = (key) => {
    const selectedCount = Object.values(connectors).filter((value) => value).length;
    setConnectors((prev) => {
      const newValue = !prev[key];
      if (!newValue && selectedCount === 1) return prev;
      return { ...prev, [key]: newValue };
    });
  };

  const handleCheckboxChange = (key) => {
    const selectedCount = Object.values(checkboxes).filter((value) => value).length;
    setCheckboxes((prev) => {
      const newValue = !prev[key];
      if (!newValue && selectedCount === 2) return prev;
      return { ...prev, [key]: newValue };
    });
  };

  let connector = Object.keys(connectors).filter((key) => connectors[key]);

  const saveFunc = async () => {

    const mode = "paper"
    const numberSize = parseFloat(size)
    const profitSize = parseFloat(profit)
    const spreadSize = parseFloat(spread)
    const selected = Object.keys(checkboxes).filter((key) => checkboxes[key]);
    // const connector = Object.keys(connectors).filter((key) => connectors[key]);


    console.log('conn', connector);

    if (!botName) {
      setError("bot name error")
      setPopmsg("Bot name is required!")
    }

    if (!size || isNaN(numberSize)) {
      setError("Trading size error")
      setPopmsg("Trading Size is a valid number!")
    }

    if (!profit || isNaN(profitSize)) {
      setError("Minimum Profitability error")
      setPopmsg("Minimum Profitability is a valid number!")
    }

    if (!profit || isNaN(spreadSize)) {
      setError("Spread value error")
      setPopmsg("Spread Value is a valid number!")
    }

    let tradingValue;
    let connectorValue;

    if (selected.length !== 2) {
      setError("Trading pair error")
      setPopmsg("Trading Pair is required!")
    } else {
      tradingValue = selected.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
    }

    if (connector.length !== 1) {
      setError("connector error")
      setPopmsg("connector is required!")
    } else {
      connectorValue = connector.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
    }


    if (botName && profit && size && !isNaN(numberSize) && !isNaN(profitSize) && !isNaN(spreadSize) && tradingValue && connectorValue) {
      console.log("sar");

      const response = await axios.post('http://localhost:5000/api/bot-config',
        {
          botName,
          connectorValue,
          tradingValue,
          size,
          profit,
          spread,
          mode,
          refreshT,
          coolT,
          tokenA,
          tokenB,
        })
      if (response.data?.msg === 'success') {
        navigate('/bots')
      }
    }
  }

  const cancelFunc = async () => {
    console.log('here is cancel part');
  }

  return (
    <div className="bots">
      <h2 className="heading-top">
        Bots
      </h2>
      <p className="bot-breadcrumb">Create bot based on <span>“Tony’s Strategy”</span></p>
      <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
          <div className="table-bar">
            <div className="head">
              <p>New Bot Configuration</p>
            </div>
          </div>
          <div className="bot-form mt-3">
            <InputType
              onInputChange={addBotName}
              label="Name" type="text" icon="false"
              placeholder="Type the name for your bot" />

            <p className="form-subhead">Exchange</p>

            <div className='feild-exchange'>
              {Object.keys(connectors).map((key) => (
                <InputType
                  checked={connectors[key]}
                  onInputChange={() => handleConnector(key)}
                  label={key}
                  type="checkbox"
                  icon="false"
                  placeholder="Type the name for your bot" />
              ))}
            </div>

            <p className="form-subhead">Trading Pair (select two)</p>

            <div className='feild-exchange'>
              {Object.keys(checkboxes).map((key) => (
                <InputType
                  checked={checkboxes[key]}
                  onInputChange={() => handleCheckboxChange(key)}
                  label={key}
                  type="checkbox"
                  icon="false"
                  placeholder="Type the name for your bot" />
              ))}
            </div>

            <div className='bot-field mt-5'>
              <div className='table-bar'>
                <div className='head'>
                  <p className='text-lg'>Risk Management</p>
                </div>
              </div>
              <div className='mt-5 flex justify-between gap-2'>
                <InputType onInputChange={addProfit} label="Minimum Profit Margin" type="text" icon="false" placeholder="e.g.0.002" />
                <InputType onInputChange={refreshTime} label="Refresh Time" type="text" icon="false" placeholder="e.g.0.002" />
                <InputType onInputChange={coolTime} label="Stop Loss Cooldown Time" type="text" icon="false" placeholder="e.g.0.002" />
              </div>
            </div>

            <div className="flex mt-5 gap-2 justify-between items-end">
              <InputType className='w-full' onInputChange={addSize} label="Trading Amount" type="text" icon="false" placeholder="e.g.1.0" />
              <InputType className='w-full' onInputChange={addSpread} label="Spread" type="text" icon="false" placeholder="e.g.0.02" />
            </div>
            {
              connector.length && <div className='flex flex-col w-full mt-5 gap-5'>
                <div className='table-bar'>
                  <div className='head'>
                    <p className='text-lg'>More Details ...</p>
                  </div>
                </div>
                <div className='flex justify-between gap-2'>
                  <InputType onInputChange={addTokenBSwapAmount} label="Token A Amount for Swaping" type="text" icon="false" placeholder="e.g.0.002" />
                  <InputType onInputChange={addTokenAMaxAmount} label="Token B Limit Amount for Swaping" type="text" icon="false" placeholder="e.g.0.002" />
                </div>
              </div>
            }

            {/* {buttonOpen && <div className="submit-con"> */}
            <div className='flex w-full justify-between gap-2 mt-5'>

              <Button
                handler={cancelFunc}
                className="w-full default-btn"><ViewIcon />Cancel</Button>
              <Button
                handler={saveFunc}
                className="w-full default-btn"><PlayIcon />Save</Button>
            </div>
            {/* </div>} */}

          </div>
        </Card>
      </div>

      {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}

    </div>
  );
}

export default PpmSimple;
