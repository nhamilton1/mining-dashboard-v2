import React from 'react';
import './App.less';
import Navbar from './components/Navbar';
import Sidebar  from './components/Sidebar'

const App = () => (
  <div className="App">
    <Navbar />
    <Sidebar />
  </div>
);

export default App;
