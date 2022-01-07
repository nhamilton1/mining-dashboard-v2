import React from "react";
import { Layout } from "antd";
import Sidebar  from './components/Sidebar'
import NormalDistribution from "./components/NormalDistribution";
import Cagr from "./components/Cagr/Cagr";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App = () => {
  return(
    <div className="App">
      <Layout>
      <Sidebar/>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/cagr" element={<Cagr/>}/>
            <Route path="/normal-distribution" element={<NormalDistribution/>}/>
          </Routes>
      </Layout>
    </div>
  )
};

export default App;
