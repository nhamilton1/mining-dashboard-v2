import React from 'react'
import { Layout, Space } from 'antd';
const { Header } = Layout;

const Navbar = () => {

    return (
      <Layout>
        <Header className="header">
          <Space direction="horizontal">
            <div className="logo" />
          </Space>
        </Header>
      </Layout>
    )
}

export default Navbar
