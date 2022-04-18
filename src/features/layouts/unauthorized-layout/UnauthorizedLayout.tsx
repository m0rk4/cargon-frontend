import { Layout, PageHeader, Tabs } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import { AppRoutes } from '../../routes/models/routes.enum';
import boats from './boats.jpg';

const { TabPane } = Tabs;

function UnauthorizedLayout() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <PageHeader
          onBack={() => navigate(`/${AppRoutes.LANDING}`)}
          backIcon={<HomeFilled />}
          title="Cargon"
          footer={
            <Tabs
              defaultActiveKey={`/${AppRoutes.SIGN_IN}`}
              onChange={(key) => navigate(key)}
            >
              <TabPane tab="Sign In" key={`/${AppRoutes.SIGN_IN}`} />
              <TabPane tab="Sign Up" key={`/${AppRoutes.SIGN_UP}`} />
            </Tabs>
          }
        />
      </Layout.Header>
      <Layout.Content
        style={{
          height: 'calc(100vh - 105px)',
          marginTop: '40px',
          backgroundImage: `url(${boats})`,
          backgroundSize: 'cover',
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}

export default UnauthorizedLayout;
