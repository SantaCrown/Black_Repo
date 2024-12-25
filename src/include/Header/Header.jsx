import { BrowserRouter as Router, Link } from "react-router-dom";
import { getImgURL } from "../../util/image-util";
import { MenuIcon } from "../../icons/icons";
import LogoutButton from "../../components/LogoutButton";
import { useState } from "react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccount, setValue } from "../../redux/slices/swapSlice";

const { bsc } = WagmiCoreChains;
const { configureChains, createConfig, getAccount, readContract, fetchBalance, sendTransaction } = WagmiCore;
const chains = [bsc];
const projectId = "2aca272d18deb10ff748260da5f78bfd";
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ chains, version: 2, projectId }),
    new WagmiCoreConnectors.CoinbaseWalletConnector({
      chains,
      options: {
        appName: "html wagmi example",
      },
    }),
  ],
  publicClient,
});

let ethereumClient = new EthereumClient(wagmiConfig, chains);
let walletAddress = ethereumClient.getAccount().address


export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
)

const Header = ({ hendlmobilemenu }) => {
  const dispatch = useDispatch()
  dispatch(setAccount(ethereumClient))

  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getBalances(walletAddress) {
    const chainId = 1; // Ethereum Mainnet
    const apiKey = "cqt_rQKFf4yBj6BX8fKKKh76YFv6b3bm";

    const response = await fetch(
      `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/balances_v2/?key=${apiKey}`
    );

    const data = await response.json();

    const res = data.data.items.map((item) => ({
      name: item.contract_name,
      symbol: item.contract_ticker_symbol,
      balance: item.balance / Math.pow(10, item.contract_decimals),
      price: item.quote_rate
    }));
    setBalances(res)
  }

  dispatch(setValue(balances))

  useEffect(() => {
    getBalances(walletAddress);
  }, [])

  return (
    <Router>
      <header>
        <nav>
          <Link to="/" className="blacklemon-app-logo"><img src={getImgURL("logo.png")} /></Link>
          <ul className="end-menu">
            <li><w3m-core-button></w3m-core-button></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/documentation">Documentation</Link></li>
            <li><Link to="/tnc">Terms & Conditions</Link></li>
            <li><LogoutButton></LogoutButton></li>
          </ul>
          <div className="mob-menu"> <Link onClick={hendlmobilemenu} itemType="button"><MenuIcon /></Link></div>
        </nav>
      </header>
    </Router>
  );
}

export default Header;