import Card from "../components/Card/card";
import Notes from "../components/Notes/Notes";
import { Info, Eth, Tether, Sui, Aptus } from "../icons/icons";
import Button from "../uielement/Button";
import CandleChart from "../components/CandleChart/CandleChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  const InfoIco = Info;
  const EthIco = Eth;
  const TetherIco = Tether;
  const SuiIco = Sui;
  const AptusIco = Aptus;
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [botAccount, setBotAccount] = useState(null)
  const [state, setState] = useState(true)
  const [getBotInfo, setGetBotInfo] = useState('')

  const moveTo = () => {
    navigate('/strategies')
  }

  const getAccount = async () => {
    const response = await axios.get('http://localhost:5000/api/bot-get')
    setGetBotInfo(response.data)
    const bot = response?.data || []
    const formData = bot?.map((item) => ((!item.status) ? {
      value: item._id,
      label: item.botName
    } : {}))

    setBotAccount(formData)
  }

  useEffect(() => {
    getAccount()
  }, [state])

  useEffect(() => {
    // Get token from query params
    const params = new URLSearchParams(window.location.search);
    // const token = params.get('token');
    if (params.get('token')) {
      setToken(params.get('token'));
      // Store the token in localStorage
      localStorage.setItem('token', params.get('token'));

      // Clear the query parameter from the URL
      window.history.replaceState(null, '', window.location.pathname);
      window.location.href = '/dashboard'; // Redirect after login

    } else if (localStorage.getItem('token')) {
      // navigate('/dashboard')
      setToken(localStorage.getItem('token'));

    } else {
      // Redirect to login if token is missing
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <div>
      <h2 className="heading-top">Dashboard</h2>
      <div className="conatiner-grid cards">

        <Card heading="Bots" className = 'relative'>

          <div className="list-data-bot">
            {
              !getBotInfo ?
                <Notes
                  className="bot-dash"
                  icon={<InfoIco />}
                  discription="No bots are currently running. Try one of our examples or check out strategies from the community to start creating a bot."
                />
                : getBotInfo.map((item, key) => (
                  <div index={key} className="text-white flex items-center gap-1 text-yellow-300">
                    <span>+</span>
                    <p>{item?.botName}</p>
                  </div>
                ))
            }


          </div>
          <Button handler={moveTo} className="default-btn" >Explore More Stratiges</Button>
        </Card>

        <Card heading="Monthly (P&L)" >
          <CandleChart />
        </Card>

        <Card heading="Balances">
          <div className="table-bar">
            <div className="head">
              <p>Token</p>
              <p>Doller Value</p>
            </div>
            <div className="head heading">
              <p>Local Wallet</p>

            </div>
            <div className="head data">
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
            </div>
            <div className="head heading">
              <p>BINANCE</p>

            </div>
            <div className="head data">
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
              <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
              </div>
            </div>
          </div>
        </Card>

        <Card heading="Your Portfolio" otherInfo="$12544.44">
          <div className="tokens-status">
            <div className="token">
              <span><div className="icon-blu"><EthIco /></div><p>Etheroum(ETH)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>
            <div className="token">
              <span><div className="icon-blu green"><TetherIco /></div><p>Tether (USDT)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>
            <div className="token">
              <span><div className="icon-blu blue-lit"><SuiIco /></div><p>SUI(SUI)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>
            <div className="token">
              <span><div className="icon-blu white-bg"><AptusIco /></div><p>Aptos(APT)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
}

export default Dashboard;
