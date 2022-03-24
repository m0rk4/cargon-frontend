import { MainLayout } from '../../layouts/MainLayout';

import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { User } from './models/user.interface';

export interface UserItem extends User {
  key: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Brown',
    email: 'test1@mail.com',
    isRegistrationApproved: false,
    isActive: false,
  },
  {
    id: 2,
    firstName: 'Mark',
    lastName: 'Brown',
    email: 'test2@mail.com',
    isRegistrationApproved: true,
    isActive: false,
  },
  {
    id: 3,
    firstName: 'Vlad',
    lastName: 'Brown',
    email: 'test3@mail.com',
    isRegistrationApproved: true,
    isActive: true,
  },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      /**
       * TODO: replace with getUsers call.
       */
      const fetchedUsers: User[] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(sampleUsers);
        }, 1000);
      });
      setUsers(
        fetchedUsers.map(
          (user): UserItem => ({ ...user, key: user.id.toString() }),
        ),
      );
      setLoading(false);
    }

    fetchUsers();
  }, []);

  const renderTags = (user: UserItem) => {
    const color =
      !user.isRegistrationApproved || !user.isActive ? 'red' : 'green';
    const text = !user.isRegistrationApproved
      ? 'Not Approved'
      : !user.isActive
      ? 'Not Active'
      : 'Active';
    return (
      <Tag color={color} key={text}>
        {text}
      </Tag>
    );
  };

  const renderActions = (user: UserItem) => {
    const initialText = !user.isRegistrationApproved
      ? 'Approve'
      : !user.isActive
      ? 'Activate'
      : 'Deactivate';

    const onClick = async () => {
      setLoading(true);
      /**
       * TODO: replace with real API call.
       */
      await fetch('https://jsonplaceholder.typicode.com/todos/1');

      setLoading(false);

      const index = users.findIndex((usr) => usr.id === user.id);
      if (index === -1) return;

      const newUser: UserItem = !user.isRegistrationApproved
        ? {
            ...users[index],
            isRegistrationApproved: !user.isRegistrationApproved,
          }
        : { ...users[index], isActive: !user.isActive };
      setUsers([...users.slice(0, index), newUser, ...users.slice(index + 1)]);
    };

    return <a onClick={onClick}>{initialText}</a>;
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (record: UserItem) => (
        <a>{`${record.firstName} ${record.lastName}`}</a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tags',
      key: 'tags',
      render: renderTags,
    },
    {
      title: 'Action',
      key: 'action',
      render: renderActions,
    },
  ];

  return (
    <MainLayout>
      <Table
        title={() => 'Users'}
        bordered
        loading={loading}
        columns={columns}
        dataSource={users}
      />
    </MainLayout>
  );
};

export default UsersPage;
