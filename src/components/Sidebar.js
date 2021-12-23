import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    CalendarOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

    return (
        <Layout style={{ height: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1" icon={<CalendarOutlined />} title="dropdown ">
            <Menu.Item key="1">
              sub menu
            </Menu.Item>
              <Menu.Item key="2">
                sub menu
              </Menu.Item>
          </SubMenu>
          <Menu.Item key="3">
                menu item 
              </Menu.Item>
              <Menu.Item key="4">
                test
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '2vh 1vw' }}>
              <Content>
                content here
              </Content>
            </Content>
          </Layout>
        </Layout>
      );
}

export default Sidebar
