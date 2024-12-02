import Card from "../Card/card";
import axios from "axios";
import { DigoIcon } from "../../icons/icons";
import stratigy from "../../assets/BlackLemon_Strategies.png"
import Button from "../../uielement/Button";
import chtImg from "../../assets/chat.png"
import { useState, useEffect } from "react";
function StrategiesDetails() {
  const [marketData, setMarketData] = useState([])

  const fetchMarketData = async () => {
    const res = await axios.get('http://localhost:5000/api/get-strategy')
    setMarketData(res?.data?.strategy)
    console.log("res-->", res?.data?.strategy);
  }

  useEffect(() => {
    fetchMarketData()
  }, [])

  return (
    <div className="stratiges stratiges-details">

      {/* <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
          <div className="table-tr head-tr">
            <div className="table-tr">
              <div className="table-td" >
                <div className="badge">12</div> <div className="badge2"><img src={stratigy} /></div>
              </div>
              <div className="table-td">
                <div className="details">
                  <p>Tony’s Strategy</p>
                  <p>Cloned from Cross Exchange Market Strategy</p>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon /></p></div>
              </div>
            </div>
            <div className="table-tr last-head">
              < p>clone/edit</p>
              <Button buttonType="button" className="default-btn">
                Create Bot
              </Button>

            </div>
          </div>
          <div className="btm-st-content">
            <img src={chtImg} />
          </div>
        </Card>
      </div> */}

      data

      {
        Object.keys(marketData.info).forEach(key => {
        <div>

          `${key}: ${marketData.info[key]}`
          </div>
        })
      }

    </div>

  );
}

export default StrategiesDetails;
