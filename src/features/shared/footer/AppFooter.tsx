import { Divider, Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import React from 'react';

export default function AppFooter() {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      <Divider plain>Cargon © {new Date().getFullYear()}</Divider>
      <GithubOutlined />
      {
        <a target={'_blank'} href={'https://github.com/m0rk4'} rel="noreferrer">
          {' '}
          m0rk4
        </a>
      }
      ,
      {
        <a
          target={'_blank'}
          href={'https://github.com/newvlad2001'}
          rel="noreferrer"
        >
          {' '}
          newvlad2001
        </a>
      }
      ,
      {
        <a
          target={'_blank'}
          href={'https://github.com/FIFA-legend'}
          rel="noreferrer"
        >
          {' '}
          FIFA-legend
        </a>
      }
    </Layout.Footer>
  );
}
