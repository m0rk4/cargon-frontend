import { Button, Card, Result } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserRating from '../shared/rating/UserRatingProps';

export default function OrderCompletionPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const onRateSelected = (value: number) => {
    //TODO: update rating
    console.log(value);
    navigate('/driver/approved-orders');
  };

  return (
    <Card>
      <Result
        status="success"
        title="Successfully Completed Order!"
        subTitle={`Order number: ${orderId} Please leave your feedback.`}
        extra={[
          <Button onClick={() => navigate('/')} type="primary" key="home">
            Go Home
          </Button>,
          <Button
            onClick={() => navigate('/driver/approved-orders')}
            key="orders"
          >
            Available Orders
          </Button>,
          <UserRating
            onChange={onRateSelected}
            key="rating"
            enabled={true}
            rating={0}
          />,
        ]}
      />
    </Card>
  );
}
