import { useGetUserQuery } from '../usersApiSlice';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../../shared/not-found';
import NetworkErrorResult from '../../shared/network-error-result';
import Loading from '../../shared/loading';
import { Card, Col, Row, Statistic, Timeline } from 'antd';
import UserRating from '../../shared/rating';
import React from 'react';
import { format } from 'date-fns';

function UserPage() {
  const { userId } = useParams();
  if (!userId) {
    return <NotFoundPage />;
  }

  const { data: user, isLoading, isError } = useGetUserQuery(+userId);
  if (isError) {
    return <NetworkErrorResult />;
  }

  if (!user || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Name"
              value={`${user.firstName} ${user.lastName}`}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Email" value={user.email} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="User Rating">
            <UserRating rating={+user.userRating} />
          </Card>
        </Col>
        <Col offset={6} span={6}>
          <Card>
            <Timeline>
              <Timeline.Item>
                Last Update Date{' '}
                {format(new Date(user.updatedAt), 'MM/dd/yyyy hh:mm')}
              </Timeline.Item>
              <Timeline.Item>
                Registration Date{' '}
                {format(new Date(user.createdAt), 'MM/dd/yyyy hh:mm')}
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserPage;
