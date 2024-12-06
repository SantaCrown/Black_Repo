// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Card from "../components/Card/card";
import InputType from "../uielement/InputType";
import Button from "../uielement/Button";;
import { SettingIcon, ViewIcon, PlayIcon } from "../icons/icons";
import axios from 'axios';
import Popmsg from '../uielement/Popmsg';
import DropDownSelect from '../uielement/DropDownSelect';


function PpmSimple() {
  const [buttonOpen, setButtonOpen] = useState(false)

  const [refreshT, setRefreshT] = useState(null)
  const [coolT, setCoolT] = useState(null)

  const handleClick = () => {
    setButtonOpen(!buttonOpen)
  }

  const [mode, setMode] = useState(null)

  console.log('mode', mode);

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

  const paperHandler = async () => {

    const mode = "paper"
    const numberSize = parseFloat(size)
    const profitSize = parseFloat(profit)
    const spreadSize = parseFloat(spread)
    const selected = Object.keys(checkboxes).filter((key) => checkboxes[key]);
    const connector = Object.keys(connectors).filter((key) => connectors[key]);

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
          coolT
        })
      console.log(response.data);
    }

  }

  const liveHandler = async () => {

    const mode = "live"
    const numberSize = parseFloat(size)
    const profitSize = parseFloat(profit)
    const selected = Object.keys(checkboxes).filter((key) => checkboxes[key]);
    const connector = Object.keys(connectors).filter((key) => connectors[key]);

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
      console.log("tradingPair===>", tradingValue);
    }

    if (connector.length !== 1) {
      setError("connector error")
      setPopmsg("connector is required!")
    } else {
      connectorValue = connector.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      console.log("===>", connectorValue);
    }

    if (botName && profit && size && !isNaN(numberSize) && !isNaN(profitSize) && tradingValue && connectorValue) {
      console.log("sar");

      const response = await axios.post('http://localhost:5000/api/bot-config',
        {
          botName,
          connectorValue,
          tradingValue,
          size,
          profit,
          mode
        })
      console.log(response.data);
    }
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

            <div className="flex items-end bot-feild">
              <InputType onInputChange={addSize} label="Trading Amount" type="text" icon="false" placeholder="e.g.1.0" />
              <InputType onInputChange={addSpread} label="Spread" type="text" icon="false" placeholder="e.g.0.02" />
              <div className="advance-set flex items-center" onClick={handleClick}>
                <SettingIcon />
                <p>Advanced Options</p>
              </div>
              {/* <div>
                <h3>Select Mode</h3>

                <div className="available-accounts">
                  <DropDownSelect
                    setSelectedVal={selectedValue}
                    options={selectData} />
                </div>
              </div> */}
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

            {buttonOpen && <div className="submit-con">
              <Button
                handler={paperHandler}
                className="default-btn"><ViewIcon />Paper Trade</Button>
              <Button
                handler={liveHandler}
                className="default-btn"><PlayIcon />Live Trade</Button>
            </div>}

          </div>
        </Card>
      </div>

      {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}

    </div>
  );
}

export default PpmSimple;
