import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { notification, Space, Table } from 'antd';
import { User } from '../users/models/user.interface';
import { TransportApplication } from './models/transport-application.interface';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

export interface TransportApplicationItem extends TransportApplication {
  key: string;
}

const sampleApplications: TransportApplication[] = [
  {
    id: 1,
    driver: {
      id: 3,
      firstName: 'Vlad',
      lastName: 'Brown',
      email: 'test3@mail.com',
      isRegistrationApproved: true,
      isActive: true,
    },
    documentUuid: '123456789',
  },
];

const TransportApplicationsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<TransportApplicationItem[]>(
    [],
  );

  useEffect(() => {
    async function fetchPendingTransportApplications() {
      /**
       * TODO: replace with real getPendingTransportApplications call.
       */
      const orders: TransportApplication[] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(sampleApplications);
        }, 1000);
      });

      setApplications(
        orders.map(
          (app): TransportApplicationItem => ({
            ...app,
            key: app.id.toString(),
          }),
        ),
      );
      setLoading(false);
    }

    fetchPendingTransportApplications();
  }, []);

  const columns = [
    {
      title: 'Driver',
      key: 'driver',
      dataIndex: 'driver',
      render: (driver: User) => (
        <a>{`${driver.firstName} ${driver.lastName}`}</a>
      ),
    },
    {
      title: 'Document',
      key: 'document',
      dataIndex: 'documentUuid',
      render: (documentUuid: string) => {
        const onClick = async () => {
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/comments',
          );
          const blob = await response.blob();
          const objectURL = URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = objectURL;
          link.setAttribute('download', `${documentUuid}.json`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        return <a onClick={onClick}>Download</a>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: TransportApplicationItem) => {
        const onApprove = async () => {
          setLoading(true);
          /**
           * TODO: replace with real API call. Change status of application to Approved
           */
          await fetch('https://jsonplaceholder.typicode.com/todos/1');

          setLoading(false);

          removeFromTable(record);
          openNotification('Approved!', <CheckCircleOutlined />);
        };

        const onReject = async () => {
          setLoading(true);
          /**
           * TODO: replace with real API call. Change status of application to CANCELLED
           */
          await fetch('https://jsonplaceholder.typicode.com/todos/1');

          setLoading(false);

          removeFromTable(record);
          openNotification('Rejected!', <CloseCircleOutlined />);
        };

        const removeFromTable = (record: TransportApplicationItem) => {
          const index = applications.findIndex((app) => app.id === record.id);
          if (index === -1) return;

          setApplications([
            ...applications.slice(0, index),
            ...applications.slice(index + 1),
          ]);
        };

        const openNotification = (text: string, icon: JSX.Element) => {
          notification.info({
            message: `Transport application approval`,
            description: text,
            placement: 'bottomRight',
            icon: icon,
          });
        };

        return (
          <Space size={'middle'}>
            <a onClick={onApprove}>Approve</a>
            <a onClick={onReject}>Reject</a>
          </Space>
        );
      },
    },
  ];

  return (
    <MainLayout>
      <Table
        loading={loading}
        title={() => 'Transport Applications'}
        bordered
        columns={columns}
        dataSource={applications}
      />
    </MainLayout>
  );
};

export default TransportApplicationsPage;
