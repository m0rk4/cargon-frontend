import { User } from '../../users/models/user.interface';
import { Avatar, Card, Descriptions } from 'antd';
import UserRating from '../rating/UserRatingProps';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../routes/models/routes.enum';

type UserInfoProps = {
  loading: boolean;
  title: string;
  user?: User;
};

function UserInfo({ loading, title, user }: UserInfoProps) {
  return (
    <Card
      loading={loading}
      actions={[
        <Descriptions key="description" bordered>
          <Descriptions.Item label="First Name">
            {user?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {user?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Rating">
            <UserRating rating={+(user?.userRating ?? '0')} />
          </Descriptions.Item>
        </Descriptions>,
      ]}
    >
      <Card.Meta
        title={title}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        description={
          <Link
            to={`/${AppRoutes.USERS}/${user?.id}`}
          >{`${user?.firstName} ${user?.lastName}`}</Link>
        }
      />
    </Card>
  );
}

export default UserInfo;
