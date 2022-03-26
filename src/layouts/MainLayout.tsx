import React, { ReactNode, useState } from 'react';
import './MainLayout.css';
import logo from '../logo.svg';
import { Layout, Menu, PageHeader } from 'antd';
import {
  CarOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link, useLocation } from 'react-router-dom';
import { AllAppRoutes, AppRoutes } from '../routes/routes.enum';

const menuMap: Record<AppRoutes, [string, string]> = {
  [AppRoutes.USERS]: ['sub1', 'sub1-1'],
  [AppRoutes.ORDERS]: ['sub1', 'sub1-2'],
  [AppRoutes.TRANSPORT_APPLICATIONS]: ['sub1', 'sub1-3'],
  [AppRoutes.NOT_EXISTING_ROUTE]: ['', ''],
};

export const MainLayout: React.FC<{ children: ReactNode }> = (props: {
  children: ReactNode;
}) => {
  const { Header, Content, Footer, Sider } = Layout;

  const location = useLocation();
  const currentRoute =
    AllAppRoutes.find((route) => location.pathname.includes(route)) ??
    AppRoutes.NOT_EXISTING_ROUTE;
  const [subMenuId, menuId] = menuMap[currentRoute];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <img src={logo} className="logo" alt={'logo'} />
        <Menu
          defaultOpenKeys={[subMenuId]}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuId]}
        >
          <SubMenu key="sub1" icon={<ToolOutlined />} title="Management">
            <Menu.Item icon={<UserOutlined />} key="sub1-1">
              <Link to={`/${AppRoutes.USERS}`}>Users</Link>
            </Menu.Item>
            <Menu.Item icon={<ShoppingCartOutlined />} key="sub1-2">
              <Link to={`/${AppRoutes.ORDERS}`}>Orders</Link>
            </Menu.Item>
            <Menu.Item icon={<CarOutlined />} key="sub1-3">
              <Link to={`/${AppRoutes.TRANSPORT_APPLICATIONS}`}>
                Applications
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, marginRight: '16px' }}
        >
          <PageHeader title={'Cargon'} subTitle={'Demo'} />
        </Header>
        <Content style={{ margin: '24px 16px 0 0', overflow: 'initial' }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: 'center',
              height: 'calc(100vh - 160px)',
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Cargon ©{new Date().getFullYear()} Created by Mark, Vlad and Nikita
        </Footer>
      </Layout>
    </Layout>
  );
};
