import React from 'react'
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const Navbar = () => {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        </Menu>
      </Header>
    )
}

export default Navbar
