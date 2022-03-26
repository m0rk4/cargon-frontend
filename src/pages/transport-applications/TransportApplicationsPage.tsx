import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { notification, Space, Table } from 'antd';
import { User } from '../users/models/user.interface';
import { TransportApplication } from './models/transport-application.interface';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import useFetching from '../../hooks/useFetch';

const TransportApplicationsPage: React.FC = () => {
  const {
    data,
    isLoading,
    hasError,
    setData,
  } = useFetching<TransportApplication[]>('/transport-application/pending', []);

  const onApprove = async (id: number) => {
    const response = await fetch(`/transport-application/${id}/approve`, {
      method: 'PUT',
    });
    if (!response.ok) return;

    removeApplication(id);
    openNotification('Approved!', <CheckCircleOutlined />);
  };

  const onReject = async (id: number) => {
    const response = await fetch(`/transport-application/${id}/reject`, {
      method: 'PUT',
    });
    if (!response.ok) return;

    removeApplication(id);
    openNotification('Rejected!', <CloseCircleOutlined />);
  };

  const removeApplication = (id: number) => {
    const index = data.findIndex((app) => app.id === id);
    if (index === -1) return;

    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  const onOpenDocument = async (documentUid: string) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    );
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = objectURL;
    link.setAttribute('download', `${documentUid}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderActions = (id: number) => (
    <Space size={'large'}>
      <a onClick={() => onApprove(id)}>Approve</a>
      <a onClick={() => onReject(id)}>Reject</a>
    </Space>
  );

  const renderDocuments = (documentUid: string) => (
    <a onClick={() => onOpenDocument(documentUid)}>Download</a>
  );

  const openNotification = (text: string, icon: JSX.Element) =>
    notification.info({
      message: `Transport application approval`,
      description: text,
      placement: 'bottomRight',
      icon: icon,
    });

  const columns = [
    {
      title: 'Driver',
      key: 'driver',
      dataIndex: 'driver',
      render: ({ firstName, lastName }: User) => (
        <a>{`${firstName} ${lastName}`}</a>
      ),
    },
    {
      title: 'Document',
      key: 'document',
      dataIndex: 'documentUid',
      render: renderDocuments,
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: renderActions,
    },
  ];

  return (
    <MainLayout>
      {data && (
        <Table
          loading={isLoading}
          title={() => 'Transport Applications'}
          bordered
          columns={columns}
          dataSource={data.map((app) => ({
            ...app,
            key: app.id.toString(),
          }))}
        />
      )}
      {hasError && <h1>Something went wrong...</h1>}
    </MainLayout>
  );
};

export default TransportApplicationsPage;
