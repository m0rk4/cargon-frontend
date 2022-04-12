import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const onBackClicked = () => {
    navigate('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={onBackClicked} type="primary">
          Back Home
        </Button>
      }
    />
  );
}
