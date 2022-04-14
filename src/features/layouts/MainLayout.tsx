import React, { useState } from 'react';
import './MainLayout.css';
import logo from '../../logo.svg';
import { Layout, Menu, PageHeader } from 'antd';
import {
  ApartmentOutlined,
  AuditOutlined,
  CarOutlined,
  MoneyCollectOutlined,
  OrderedListOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AllAppRoutes, AppRoutes } from '../routes/routes.enum';
import AppFooter from '../shared/footer/AppFooter';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../users/models/user.interface';

const URL_TO_MENU_MAP = new Map<string, [string, string]>([
  [`${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`, ['sub1', 'sub1-1']],
  [`${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`, ['sub1', 'sub1-2']],
  [
    `${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`,
    ['sub1', 'sub1-3'],
  ],
  [`${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`, ['sub2', 'sub2-1']],
  [`${AppRoutes.CUSTOMER}/${AppRoutes.ORDERS_HISTORY}`, ['sub2', 'sub2-2']],
  [
    `${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`,
    ['sub3', 'sub3-1'],
  ],
  [`${AppRoutes.DRIVER}/${AppRoutes.DRIVER_HISTORY}`, ['sub3', 'sub3-3']],
  [`${AppRoutes.DRIVER}/${AppRoutes.APPROVED_ORDERS}`, ['sub3', 'sub3-2']],
  [AppRoutes.NOT_EXISTING_ROUTE, ['', '']],
]);

const MainLayout = () => {
  const { Header, Content, Sider } = Layout;

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute =
    AllAppRoutes.find((route) => location.pathname.includes(route)) ??
    AppRoutes.NOT_EXISTING_ROUTE;
  const [, menuId] = URL_TO_MENU_MAP.get(currentRoute) ?? ['', ''];

  const [collapsed, setCollapsed] = useState(false);

  const is = (role: UserRole) => user?.role === role;

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <img src={logo} className="logo" alt={'logo'} />
        <Menu
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuId]}
        >
          {(is(UserRole.MANAGER) || is(UserRole.ADMIN)) && (
            <SubMenu key="sub1" icon={<ToolOutlined />} title="Management">
              <Menu.Item icon={<UserOutlined />} key="sub1-1">
                <Link to={`/${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`}>
                  Users
                </Link>
              </Menu.Item>
              <Menu.Item icon={<ShoppingCartOutlined />} key="sub1-2">
                <Link to={`/${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`}>
                  Orders
                </Link>
              </Menu.Item>
              <Menu.Item icon={<AuditOutlined />} key="sub1-3">
                <Link
                  to={`/${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`}
                >
                  Applications
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
          {(is(UserRole.CUSTOMER) || is(UserRole.ADMIN)) && (
            <SubMenu key="sub2" icon={<ProfileOutlined />} title="Customer">
              <Menu.Item icon={<PlusCircleOutlined />} key="sub2-1">
                <Link to={`/${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`}>
                  Create Order
                </Link>
              </Menu.Item>
              <Menu.Item icon={<UnorderedListOutlined />} key="sub2-2">
                <Link to={`/${AppRoutes.CUSTOMER}/${AppRoutes.ORDERS_HISTORY}`}>
                  Orders History
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
          {(is(UserRole.DRIVER) || is(UserRole.ADMIN)) && (
            <SubMenu key="sub3" icon={<ApartmentOutlined />} title="Driver">
              <Menu.Item icon={<CarOutlined />} key="sub3-1">
                <Link
                  to={`/${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`}
                >
                  Create Transport
                </Link>
              </Menu.Item>
              <Menu.Item icon={<MoneyCollectOutlined />} key="sub3-2">
                <Link to={`/${AppRoutes.DRIVER}/${AppRoutes.APPROVED_ORDERS}`}>
                  Book Order
                </Link>
              </Menu.Item>
              <Menu.Item icon={<OrderedListOutlined />} key="sub3-3">
                <Link to={`/${AppRoutes.DRIVER}/${AppRoutes.DRIVER_HISTORY}`}>
                  Driver History
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, marginRight: '16px' }}
        >
          <PageHeader
            avatar={{ src: 'https://picsum.photos/200' }}
            onBack={() => navigate(-1)}
            title={'Cargon'}
            subTitle={'Demo'}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 212px)',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
