import React, { useEffect, useState } from 'react'
import Card from "../components/Card/card";
import Notes from "../components/Notes/Notes";
import DropDownSelect from "../uielement/DropDownSelect";
import InputType from "../uielement/InputType";
import Button from "../uielement/Button";
import stratigy from "../assets/BlackLemon_Strategies.png"
import PopOut from "../uielement/PopOut";
// import StrategiesDetails from '../components/StratigyDetails/StratigyDetails';
import { DigoIcon } from "../icons/icons";
import axios from 'axios';



function Strategies() {
  const options = [
    { value: "1", label: "Scalping" },
    { value: "2", label: "Moving averages" },
    { value: "3", label: "Day trading crypto" },
  ];
  const [isconfig, SetConfig] = useState(false);
  const [marketData, setMarketData] = useState([])
  const [id, setId] = useState('')

  const fetchMarketData = async () => {
    const res = await axios.get('http://localhost:5000/api/get-strategy')
    setMarketData(res?.data?.strategy)
  }

  useEffect(() => {
    fetchMarketData()
  }, [])

  const handleStratigy = (prop) => {
    setId(prop)
    SetConfig(!isconfig)
  }

  const StrategiesDetails = () => {

    const selectedObjectArray = marketData?.filter(item => item._id === id);

    return (
      <div>
        {
          selectedObjectArray && selectedObjectArray.map((item) => (
            <div>
              <div>
                {item?.botName}'s more detailed information
              </div>
              <div> BotName : {item?.botName} </div>
              <div> symbol : {item?.info?.symbol} </div>
              <div> baseCurrency : {item?.info.baseCurrency} </div>
              <div> quoteCurrency : {item?.info.quoteCurrency} </div>
              <div> feeCurrency : {item?.info.feeCurrency} </div>
              <div> market : {item?.info.market} </div>
              <div> baseMinSize : {item?.info.baseMinSize} </div>
              <div> quoteMinSize : {item?.info.quoteMinSize} </div>
              <div> baseMaxSize : {item?.info.baseMaxSize} </div>
              <div> quotenaxSize : {item?.info.quotenaxSize} </div>
              <div> priceIncrement : {item?.info.priceIncrement} </div>
              <div> priceLimitRate : {item?.info.priceLimitRate} </div>
              <div> minFunds : {item?.info.minFunds} </div>
              <div> isMarginEnabled : {item?.info.isMarginEnabled ? 'True' : 'False' } </div>
              <div> enableTrading : {item?.info.enableTrading ? 'True' : 'False' } </div>
              <div> feeCategory : {item?.info.feeCategory} </div>
              <div> makerFeeCoefficient : {item?.info.makerFeeCoefficient} </div>
              <div> takerFeeCoefficient : {item?.info.takerFeeCoefficient} </div>
              <div> st : {item?.info.st ? 'True' : 'False' } </div>
              <div> callauctionIsEnabled : {item?.info.callauctionIsEnabled ? 'True' : 'False' } </div>
              <div> callauctionPriceCeiling : {item?.info.callauctionPriceCeiling ? `${item?.info.callauctionPriceCeiling}` : 'Null' } </div>
              <div> callauctionPriceFloor : {item?.info.callauctionPriceFloor? `${item?.info.callauctionPriceFloor}` : 'Null'} </div>
              <div> callauctionFirstStageStartTime : {item?.info.callauctionFirstStageStartTime? `${item?.info.callauctionFirstStageStartTime}` : 'Null'} </div>
              <div> callauctionSecondStageStartTime : {item?.info.callauctionSecondStageStartTime ? `${item?.info.callauctionSecondStageStartTime}` : 'Null'} </div>
              <div> callauctionThirdStageStartTime : {item?.info.callauctionThirdStageStartTime ? `${item?.info.callauctionThirdStageStartTime}` : 'Null'} </div>
              <div> tradingStartTime : {item?.info.tradingStartTime ? `${item?.info.tradingStartTime}` : 'Null'} </div>
            </div>
          ))
        }
      </div>
    )
  }



  return (
    <div className="stratiges">
      {isconfig && <PopOut className="config-popin" component={<StrategiesDetails />} />}
      <h2 className="heading-top">
        Strategies{" "}
        <span>
          {<DropDownSelect options={options} />}{" "}
          <InputType type="text" placeholder="Search" />
        </span>
      </h2>
      <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
          <div className="table-bar">
            <div className="head">
              <p>Strategy</p>
              <p>Details</p>
            </div>

            {
              marketData && marketData.map((item, key) => (
                <div index={key} className="table-tr head-tr" >
                  <div className="table-tr" onClick={() => handleStratigy(item._id)} >
                    <div className="table-td" >
                      <div className="badge">{key + 1}</div>
                      <div className="badge2"><img src={stratigy} /></div>
                    </div>
                    <div className="table-td">
                      <div className="details">
                        <p>{item?.botName}’s Strategy</p>
                        <p>Cloned from {item?.info.name} Strategy</p>
                      </div>
                    </div>
                  </div>
                  <div className="table-tr last-head hover:cursor-pointer" >
                    <div className="table-td">
                      {" "}
                      <div className="details">
                        <p>{item?.createdAt.slice(0, 10) + " " + item?.createdAt.slice(11, 19)}</p>
                        {/* <p>by 09xhti....be35</p> */}
                      </div>
                    </div>
                    <div className="table-td">
                      <a href="https://discord.com/invite/hummingbot" target="_blank" rel="noopener noreferrer">
                        <p className="discord">
                          discord <DigoIcon />
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </Card>
      </div>
      {isconfig && <div onClick={handleStratigy} className="back-drop"></div>}
    </div>

  );
}

export default Strategies;
