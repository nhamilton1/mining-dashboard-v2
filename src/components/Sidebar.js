import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AreaChartOutlined } from '@ant-design/icons';

const Sidebar = (props) => {
  const { handleClick } = props;

    return (
        <Layout.Sider style={{ minHeight: '100vh' }} width={'8vw'} >
          <Menu theme="dark" mode="inline" openKeys={"sub1"}>
            <Menu.Item key="1" onClick={handleClick}>
              <HomeOutlined style={{ fontSize: '32px' }}/>
            </Menu.Item>
            <Menu.Item key="2" onClick={handleClick}>
              <AreaChartOutlined style={{ fontSize: '32px' }}/>
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
