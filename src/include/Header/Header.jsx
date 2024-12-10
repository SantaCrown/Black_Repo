import { BrowserRouter as Router, Link } from "react-router-dom";
import { getImgURL } from "../../util/image-util";
import { MenuIcon } from "../../icons/icons";
import LogoutButton from "../../components/LogoutButton";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";
// import { parseEther } from 'https://cdn.jsdelivr.net/npm/viem@1.21.4/_cjs/index.min.js'

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
const { bsc } = WagmiCoreChains;
console.log({WagmiCoreChains});
const { configureChains, createConfig, getAccount, readContract,fetchBalance ,sendTransaction}  = WagmiCore;

// 1. Define chains
const chains = [bsc];
const projectId = "2aca272d18deb10ff748260da5f78bfd";

// 2. Configure wagmi client

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

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
)
function Header({ hendlmobilemenu }) {


  return (
    <Router>
      <header>
        <nav>
          <Link to="/" className="blacklemon-app-logo"><img src={getImgURL("logo.png")} /></Link>
          <ul className="end-menu">
          <li>  <w3m-core-button></w3m-core-button></li>
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