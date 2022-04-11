import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout';
import { Button, Result } from 'antd';
import React from 'react';

export default function ServerErrorPage() {
  const navigate = useNavigate();
  const onBackClicked = () => {
    navigate('/');
  };

  return (
    <MainLayout>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" onClick={onBackClicked}>
            Back Home
          </Button>
        }
      />
    </MainLayout>
  );
}
