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

    console.log("selectedObjectArray", selectedObjectArray);

    let infoData;
    return (
      <div className='w-full m-auto'>
        <table className='w-full text-center'>
          <thead className='text-lg font-bold'>
            <td>No</td>
            <td>Bot Name</td>
            <td>Exchange</td>
            <td>Trading pair</td>
            <td>Trading Size</td>
            <td>Spread</td>
            <td>Profit Margin</td>
            <td>Mode</td>
          </thead>
          <tbody>
            {
              selectedObjectArray && selectedObjectArray.map((item, key) => (
                <tr index={key} >
                  <td>
                    {key + 1}
                  </td>
                  <td>
                    {item?.botName}
                  </td>
                  <td>
                    {item?.botStyle}
                  </td>
                  <td>
                    {item?.botStyle}
                  </td>
                  <td>
                    {item?.size}
                  </td>
                  <td>
                    {item?.spread}
                  </td>
                  <td>
                    {item?.profit}
                  </td>
                  <td>
                    {item?.mode}
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>
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
