import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from './components/Navbar';
import Sidebar  from './components/Sidebar'
import { Content } from "antd/lib/layout/layout";
import Workers from "./components/Workers";
import GeneralInfo from "./components/GeneralInfo";
import DailyRewards from "./components/DailyRewards";
import NormalDistribution from "./components/NormalDistribution";
import Cagr from "./components/Cagr";

const App = () => {
  const [render, updateRender] = useState(1);

  const components = {
    1: <><GeneralInfo/><DailyRewards/><Workers/></>,
    2: <NormalDistribution/>,
    3: <Cagr/>,
    4: <div>Option 4</div>
  };


  const handleMenuClick = menu => {
    updateRender(menu.key);
  };

  return(
    <div className="App">
      <Navbar />
       <Layout style={{ minHeight: "100vh" }}>
        <Sidebar handleClick={handleMenuClick}/>
        <Layout style={{margin: '2vh 2vw'}}>
          <Content>{components[render]}</Content>
        </Layout>
      </Layout>
    </div>
  )
};

export default App;
