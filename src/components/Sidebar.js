import React from 'react';
import { Layout, Menu } from 'antd';

const Sidebar = (props) => {
  const { handleClick } = props;

    return (
        <Layout.Sider style={{ minHeight: '100vh' }}width={'15vw'}>
          <Menu theme="dark" mode="inline" openKeys={"sub1"}>
            <Menu.Item key="1" onClick={handleClick}>
              Home
            </Menu.Item>
            <Menu.Item key="2" onClick={handleClick}>
              Option 2
            </Menu.Item>
            <Menu.Item key="3" onClick={handleClick}>
              Option 3
            </Menu.Item>
            <Menu.Item key="4" onClick={handleClick}>
              Option 4
            </Menu.Item>
          </Menu>
        </Layout.Sider>
      );
}

export default Sidebar
