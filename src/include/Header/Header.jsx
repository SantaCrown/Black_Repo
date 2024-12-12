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
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../redux/slices/swapSlice";

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

console.log('ethereumClient-->', ethereumClient);



export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
)

// async function getWalletBalance() {


//   try {
//     // Get the connected account
//     const account = getAccount();
//     console.log('header accout', account);

//     if (!account.isConnected) {
//       console.log("Wallet not connected");
//       return;
//     }

//     const walletAddress = account.address;

//     // Fetch the wallet balance
//     const balance = await fetchBalance({
//       address: walletAddress, // Connected wallet address
//       chainId: bsc.id,        // Specify the chain ID
//     });

//     console.log(`Wallet Address: ${walletAddress}`);
//     console.log(`Balance: ${balance.formatted} ${balance.symbol}`);
//     return { walletAddress, balance: `${balance.formatted} ${balance.symbol}` };
//   } catch (error) {
//     console.error("Error fetching wallet balance:", error);
//   }
// }

const Header = ({ hendlmobilemenu }) => {
  const dispatch = useDispatch()
  dispatch(setAccount(ethereumClient))

  // useEffect(()=> {
  //   getWalletBalance()
  // }, [])

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