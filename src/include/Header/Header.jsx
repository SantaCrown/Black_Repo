import { BrowserRouter as Router, Link } from "react-router-dom";
import { getImgURL } from "../../util/image-util";
import { MenuIcon } from "../../icons/icons";
import LogoutButton from "../../components/LogoutButton";

function Header({ hendlmobilemenu }) {


  return (
    <Router>
      <header>
        <nav>
          <Link to="/" className="blacklemon-app-logo"><img src={getImgURL("logo.png")} /></Link>
          <ul className="end-menu">
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/documentation">Documentation</Link></li>
            <li><LogoutButton></LogoutButton></li>
          </ul>
          <div className="mob-menu"> <Link onClick={hendlmobilemenu} itemType="button"><MenuIcon /></Link></div>

        </nav>
      </header>
    </Router>
  );
}

export default Header;
