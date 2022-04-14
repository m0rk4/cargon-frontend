import { Col, Layout, PageHeader, Row, Tabs } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppFooter from '../../shared/footer/AppFooter';
import { HomeFilled } from '@ant-design/icons';
import { AppRoutes } from '../../routes/models/routes.enum';

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
      <Layout.Content>
        <Row
          style={{ minHeight: 'calc(100vh - 190px)' }}
          align="middle"
          justify="space-around"
        >
          <Col span={8}>
            <Outlet />
          </Col>
        </Row>
      </Layout.Content>
      <AppFooter />
    </Layout>
  );
}

export default UnauthorizedLayout;
