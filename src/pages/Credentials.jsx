import { useEffect, useState } from 'react';
import Card from "../components/Card/card";
import { listAccounts, getCredentials, addAccount, delAccount, getConnector, connectKey } from '../util/Apis';
import InputType from "../uielement/InputType";
import DropDownSelect from "../uielement/DropDownSelect";
import Button from '../uielement/Button';
import Popmsg from '../uielement/Popmsg';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

function Credentials() {
  const [accounts, setAccounts] = useState(null);
  const [data, setUserData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [error, setError] = useState(null);
  const [popmsg, setPopmsg] = useState(null);
  const [account, setAccountAdd] = useState(null);
  const [delAcc, setDelAcc] = useState(null);
  const [loadingState, setLoadingState] = useState(null); // Track button loading state
  const [selCon, setSelConnectors] = useState();
  const [apiData, setApiCred] = useState({});
  const [accountlist, setAccountList] = useState([])
  const [state, setState] = useState(true)
  const [selId, setSelId] = useState(null)
  

  function addAccnoutInput(val) {
    setAccounts(val.target.value);
  }

  function setApi(data) {
    const input = data.target.parentElement.innerText,  // The dynamic key (e.g., 'revDate')
      value = data.target.value;  // The value of that key (e.g., the value inputted)

    // Remove any object with the same key and value from prevData
    setApiCred(prevData => {
      const { [input]: removed, ...rest } = prevData; // Destructure to remove the existing key
      return { ...rest, [input]: value };
    });
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userData = await listAccounts();
        setUserData([]);
        setSelectData([]); // Reset select data before setting new data
        const accountList = userData?.accounts || [];
        const formattedData = accountList?.map((item) => ({
          value: item._id,// or any unique identifier
          label: item.name,            // assuming `item` is a string
        }));

        setSelectData(formattedData);

        accountList?.map(async (item) => {
          try {
            const itemId = item._id;
            const acc = await getCredentials(item._id);
            const accData = acc?.credentials || []
            setUserData(prevData => [...prevData, { itemId, accData }]);
          } catch (error) {
            setError('Failed to load user credentials');
          }
        })

      } catch (error) {
        setError('Failed to load users');
      }
    };

    fetchAccounts();
  }, [state]);

  useEffect(() => {
    const fetchConnectors = async () => {
      const connectors = await getConnector();
      const connector = connectors?.connectors || [];
      const formattedData = connector?.map((item) => ({
        value: item._id,// or any unique identifier
        label: item.name,            // assuming `item` is a string
      }));
      setConnectors(formattedData)
    }

    fetchConnectors();
  }, [state]); // Empty dependency array to fetch once when the component mounts

  const addAccountMn = async () => {
    setLoadingState('add'); // Set loading state to 'add' button
    const addedAcc = await addAccount(accounts);
    setError(false);
    setPopmsg(addedAcc?.msg);
    setAccountAdd(true);
    setState(!state)
    setLoadingState(null); // Reset loading state
  }

  function selectedValue(data) {
    setDelAcc(data.value);
  }

  function selectedValueConnectors(data) {
    setSelConnectors(data.value);
    setSelId(data.label)
  }

  function deleteAccountMn() {
    const deleteAccounts = async () => {
      setLoadingState('delete'); // Set loading state to 'delete' button

      try {
        const deleteAcc = await delAccount(delAcc);
        setError(false);
        setPopmsg(deleteAcc?.msg);
        if (deleteAcc?.msg == "success") setState(!state)
        setAccountAdd(true);
        // Refresh the dropdown options after deletion
        await fetchUpdatedAccounts(); // Refetch the accounts after deletion

      } catch (error) {
        setError(true);
        setPopmsg(error?.response?.data?.detail);
      } finally {
        setLoadingState(null); // Reset loading state
      }
    };
    deleteAccounts();
  }

  // Function to fetch updated accounts and refresh the dropdown
  const fetchUpdatedAccounts = async () => {
    try {
      const userData = await listAccounts();
      setSelectData([]); // Reset selectData before updating with new list
      userData.forEach(element => {
        setSelectData(prevData => [...prevData, { value: element, label: element }]);
      });
    } catch (error) {
      setError('Failed to refresh account list');
    }
  };

  function addCredentials() {
    const addconnector = async () => {
      setLoadingState('connectKy'); // Set loading state to 'delete' button

      try {
        const connector = await connectKey(apiData, selCon, delAcc);
        setLoadingState(null);
        setError(false);
        setPopmsg(connector.message);
        setAccountAdd(true);
      } catch (error) {
        setError(true);
        setPopmsg(error?.response?.data?.detail);
      } finally {
        setState(!state)
        setLoadingState(null); // Reset loading state
      }
    };
    addconnector();
  }

  return (
    <div>
      <h2 className="heading-top">Credentials</h2>
      <div className="container-grid cards credentials">
        <Card heading="Available Accounts and Credentials" size="full">
          <div className="available-accounts">
            <ul>
              {data?.map((item, index) => (
                <li key={index}>

                  {item?.accData?.map((eleItem) => (
                    <>
                      <div>
                        {
                          eleItem?.name?.name && <div>🏦 {eleItem?.name?.name}</div>
                        }
                      </div>
                      <div>account : {eleItem?.name?.name}</div>
                      <div>connector : {eleItem?.connector?.name}</div>
                    </>
                  )
                  )}

                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card heading="Add Account" size="full">
          <div className="available-accounts">
            <InputType onInputChange={addAccnoutInput} label="New Account Name" type="text" icon="false" placeholder="Type the name for your bot" />
            <Button
              disabled={!accounts?.length}
              buttonType="button"
              handler={addAccountMn}
              className="default-btn"
            >
              {loadingState === 'add' ? "Please Wait" : "Add Account"}
            </Button>
          </div>
        </Card>

        <Card heading="Delete Account" size="full">
          <div className="available-accounts">
            {selectData.length > 0 ? <DropDownSelect
              setSelectedVal={selectedValue}
              options={selectData} /> : "No account to delete"}
            <Button
              buttonType="button"
              handler={deleteAccountMn}
              className="default-btn"
            >
              {loadingState === 'delete' ? "Please Wait" : "Delete Account"}
            </Button>
          </div>
        </Card>

        <Card heading="Add Credentials" size="full">

          <div className="available-accounts add-cred-method">
            <div className='add-credentials'>
              <h3>Select Account</h3>
              {selectData.length > 0 ?
                <DropDownSelect
                  setSelectedVal={selectedValue}
                  options={selectData} /> : "No account to delete"}
            </div>

            <div className='add-credentials'>
              <h3>Select Connectors</h3>
              {selectData.length > 0 ?
                <DropDownSelect
                  setSelectedVal={selectedValueConnectors}
                  options={connectors} /> : "No account to delete"}
            </div>
          </div>

          <div className="available-accounts add-cred-method add-cred-bot">
            {delAcc && <p>Provide Configuration Map for <b>{selId}</b></p>}

            {selCon && <div className="bot-feild">
              <InputType onInputChange={setApi} label={`${selId}_api_key`} type="text" icon="false" placeholder="Api Key" />
              <InputType onInputChange={setApi} label={`${selId}_api_secret`} type="text" icon="false" placeholder="Api Secret" />

            </div>}
            <br />
            {Object.keys(apiData).length > 1 && <Button
              buttonType="button"
              handler={addCredentials}
              className="default-btn"
            >
              {loadingState === 'connectKy' ? "Please Wait" : "Add Credentials"}
            </Button>}
          </div>
        </Card>
        {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}
      </div>
    </div>
  );
}

export default Credentials;
