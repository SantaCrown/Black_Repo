import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import {
  StatigesIcon,
  HomeIcon,
  BotIcon,
  Market,
  Setting,
} from "../../icons/icons";
function Sidebar({ menuState }) {
  const IconStratiges = StatigesIcon;
  const sideMenu = [

    {
      name: "Dashboard",
      icon: <HomeIcon />,
      link: "/dashboard",
    },
    {
      name: "🔑 Credentials",

      link: "/credentials",
    },
    {
      name: "👨‍🏫 PMM Simple",

      link: "/ppm-simple",
    },
    {
      name: "Bots",
      icon: <BotIcon />,
      link: "/bots",
      submenu: [
        {
          name: "Active Bots",
          icon: "",
          link: "/active-bots",
        },
      ],
    },
    {
      name: "Strategies",
      icon: <IconStratiges />,
      link: "/strategies",
    },
    {
      name: "Markets",
      icon: <Market />,
      link: "/markets",
    },
    {
      name: "Configurations",
      icon: <Setting />,
      link: "/configurations",
    },
  ];
  return (
    <div className={`side-bar ${menuState ? "open" : ''}`}>
      <ul>
        {sideMenu.map((ele, ind) =>
          !ele?.submenu ? (
            <li key={ind}>
              <NavLink to={ele.link}>
                <span>{ele?.icon}</span>
                {ele.name}
              </NavLink>
            </li>
          ) : (
            ele?.submenu && (
              <li key={ind}>
                <NavLink to={ele.link}>
                  <span>{ele?.icon}</span>
                  {ele.name}
                </NavLink>
                <ul className="sub-menu">
                  {ele?.submenu.map((eleSub, index) => (
                    <li key={index}>

                      <NavLink to={eleSub.link}>{eleSub.name}</NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
