import { Col, Layout, Row } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppFooter from '../shared/footer/AppFooter';

export default function UnauthorizedLayout() {
  return (
    <Layout>
      <Layout.Content>
        <Row
          style={{ minHeight: 'calc(100vh - 125px)' }}
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
