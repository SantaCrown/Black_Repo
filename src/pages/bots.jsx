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
function Bots() {
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
  const handleClick = () => {
    setButtonOpen(!buttonOpen)
  }


  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userData = await listScripts();

        setConfigScript([]); // Reset select data before setting new data
        userData.forEach(element => {
          setScripts(prevData => [...prevData, { value: element, label: element }]);
        });

        // Use a for-loop to handle async operations properly


      } catch (error) {
        setError('Failed to load users');
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userData = await listAccounts();
        setUserData([]);
        setSelectData([]); // Reset select data before setting new data
        userData.forEach(element => {
          setSelectData(prevData => [...prevData, { value: element, label: element }]);
        });

        // Use a for-loop to handle async operations properly
        for (const ele of userData) {
          try {
            const acc = await getCredentials(ele);
            setUserData(prevData => [...prevData, { ele, acc }]);
          } catch (error) {
            setError('Failed to load user credentials');
          }
        }

      } catch (error) {
        setError('Failed to load users');
      }
    };

    fetchAccounts();
  }, []);


  const createInstanceInit = async () => {
    try {
      const instance = await createInstance({
        "instance_name": account,
        "credentials_profile": cred,
        "image": "hummingbot/backend-api:latest",
        "script": scriptValue,
        "script_config": configVal
      });
      if (instance.success = true) {
        setPopmsg("Black Lemon Instance Created Sucesfully")
        setError(false)
      }

      // Use a for-loop to handle async operations properly


    } catch (error) {
      setPopmsg(error?.config.data)
      setError(true)
    }
  };



  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userData = await listConfigScript();

        setConfigScript([]); // Reset select data before setting new data
        userData.forEach(element => {
          setConfigScript(prevData => [...prevData, { value: element, label: element }]);
        });

        // Use a for-loop to handle async operations properly


      } catch (error) {

      }
    };

    fetchAccounts();
  }, []);
  function addAccnoutInput(val) {
    setAccounts(val.target.value);
  }
  function selectedValue(data) {
    setCred(data.value);
  }
  function selectedconfigScriptValue(data) {
    setConfigScValue(data.value);
  }
  function selectedScriptValue(data) {
    setScriptValue(data.value);
  }

  const botStart = async () => {
    const response = await axios.post('http://localhost:5000/api/bot-start')
    console.log(response);

  }
  return (
    <div className="bots bot-run">
      {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}
      <h2 className="heading-top">
        Bots

      </h2>
      <p className="bot-breadcrumb ">Create bot based on <span>“Tony’s Strategy”</span></p>
      <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
          <div className="table-bar">
            <div className="head">
              <p>New Bot Configuration</p>

            </div>

          </div>
          <div className="bot-form">
            <InputType onInputChange={addAccnoutInput} label="Instance Name" type="text" icon="false" placeholder="Type the name for your bot" />

            <p className="form-subhead">Select Account</p>

            <div className="feild-exchange">
              {selectData.length > 0 ? <DropDownSelect setSelectedVal={selectedValue} options={selectData} /> : "No account to delete"}

            </div>
            <p className="form-subhead">Select Configs scripts</p>
            <div className="feild-exchange">
              {configScript.length > 0 ? <DropDownSelect setSelectedVal={selectedconfigScriptValue} options={configScript} /> : "No account to delete"}

            </div>

            <p className="form-subhead">Select  scripts</p>
            <div className="feild-exchange">
              {scripts.length > 0 ? <DropDownSelect setSelectedVal={selectedScriptValue} options={scripts} /> : "No account to delete"}

            </div>

            <p className="form-subhead">Ceate Instance Now</p>


            {console.log(buttonOpen)}
            <div className="submit-con">
              <Button buttonType="button" className="default-btn" handler={createInstanceInit}><ViewIcon />Create Instance</Button>

            </div>


          </div>
        </Card>
      </div>

      <div>
        <button onClick={botStart}>
          Bot start
        </button>
      </div>
    </div>
  );
}

export default Bots;
