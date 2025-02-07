import "./App.css";
import Header from "./include/Header/Header";

import { useState } from "react";
import Main from "./include/Main/Main";
function App() {
  const [menu , setMenu] = useState(false);
  function hendlmobilemenu() {
    setMenu(!menu)
  }
  return (
    <>
      <div className="blacklemon-app">
        <Header hendlmobilemenu={hendlmobilemenu} />
        <Main menuState={menu}/>
      </div>
    </>
  );
}

export default App;
