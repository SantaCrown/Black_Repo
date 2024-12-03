// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import Card from "../components/Card/card";
import InputType from "../uielement/InputType";
import Button from "../uielement/Button";;
import { SettingIcon, ViewIcon, PlayIcon } from "../icons/icons";
import axios from 'axios';
import Popmsg from '../uielement/Popmsg';

function PpmSimple() {
  const [buttonOpen, setButtonOpen] = useState(false)

  const handleClick = () => {
    setButtonOpen(!buttonOpen)
  }

  const [botName, setBotName] = useState("")
  const [size, setSize] = useState('')
  const [profit, setProfit] = useState('')
  const [popmsg, setPopmsg] = useState(null);
  const [error, setError] = useState(null);

  const addBotName = (val) => {
    setBotName(val.target.value)
  }

  const addSize = (event) => {
    setSize(event.target.value)
  }

  const addProfit = (event) => {
    setProfit(event.target.value)
  }

  const paperHandler = async () => {

    const mode = "paper"
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
          <div className="bot-form">
            <InputType
              onInputChange={addBotName}
              label="Name" type="text" icon="false" placeholder="Type the name for your bot" />

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

            <div className="bot-feild">
              <InputType onInputChange={addSize} label="Trading Size" type="text" icon="false" placeholder="e.g.1.0" />
              <InputType onInputChange={addProfit} label="Minimum Profitability" type="text" icon="false" placeholder="e.g.0.002" />
              <div className="advance-set" onClick={handleClick}><SettingIcon /> <p>Advanced Options</p></div>
            </div>

            {buttonOpen && <div className="submit-con">
              <Button
                handler={paperHandler}
                className="default-btn"><ViewIcon />Paper Trade</Button>
              <Button
                handler={liveHandler}
                className="default-btn"><PlayIcon />Live Trade</Button>
            </div>}


            {/* 
            <button onClick={handleSubmit}>
              start
            </button> */}


          </div>
        </Card>
      </div>

      {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}

    </div>
  );
}

export default PpmSimple;
