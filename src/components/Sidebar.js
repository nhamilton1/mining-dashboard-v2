import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <SubMenu key="sub1"title="dropdown">
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
            <Content style={{margin: '2vh 1vw' }}>
                content here
            </Content>
          </Layout>
        </Layout>
      );
}

export default Sidebar
