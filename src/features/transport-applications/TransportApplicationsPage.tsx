import React, { useMemo } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { Table, Typography } from 'antd';
import { User } from '../../pages/users/managemnt/models/user.interface';
import { CheckOutlined } from '@ant-design/icons';
import NetworkErrorResult from '../../components/network-error-result/NetworkErrorResult';
import {
  useApproveTransportApplicationMutation,
  useDeclineTransportApplicationMutation,
  useGetPendingTransportApplicationsQuery,
  useLazyGetTransportApplicationDocumentQuery,
} from './transportApplicationSlice';
import TransportApplicationActions from './TransportApplicationActions';
import TransportApplicationDownloadButton from './TransportApplicationDownloadButton';
import { openNotification } from '../../util/notification';
import { formatDistanceToNow } from 'date-fns';

const TransportApplicationsPage = () => {
  const {
    data: applications = [],
    isFetching,
    isError,
  } = useGetPendingTransportApplicationsQuery();

  const [approveTransportApplication, { isLoading: isApproving }] =
    useApproveTransportApplicationMutation();

  const [declineTransportApplication, { isLoading: isDeclining }] =
    useDeclineTransportApplicationMutation();

  const [getTransportApplicationDocument, { isFetching: isDocumentFetching }] =
    useLazyGetTransportApplicationDocumentQuery();

  const onApprove = async (id: number) => {
    try {
      await approveTransportApplication(id).unwrap();
      openNotification(
        'Transport application approval',
        'Approved!',
        <CheckOutlined />,
      );
    } catch (e) {
      openNotification(
        'Transport application approval',
        'Approving failed!',
        <CheckOutlined />,
      );
    }
  };

  const onDecline = async (id: number) => {
    try {
      await declineTransportApplication(id).unwrap();
      openNotification(
        'Transport application approval',
        'Declined!',
        <CheckOutlined />,
      );
    } catch (e) {
      openNotification(
        'Transport application approval',
        'Declining failed!',
        <CheckOutlined />,
      );
    }
  };

  const onOpenDocument = async (documentPublicId: string) => {
    const blob = await getTransportApplicationDocument(
      documentPublicId,
    ).unwrap();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([blob]));
    link.setAttribute('download', `${documentPublicId}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderActions = (id: number) => (
    <TransportApplicationActions
      id={id}
      onApprove={onApprove}
      onDecline={onDecline}
    />
  );

  const renderDocuments = (documentUid: string) => (
    <TransportApplicationDownloadButton
      documentUid={documentUid}
      onOpenDocument={onOpenDocument}
    />
  );

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
      dataIndex: 'documentPublicId',
      render: renderDocuments,
    },
    {
      title: 'Created',
      key: 'created',
      dataIndex: 'createdAt',
      render: (createdAt: string) =>
        formatDistanceToNow(new Date(createdAt), { addSuffix: true }),
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: renderActions,
    },
  ];

  const isTableLoading =
    isFetching || isApproving || isDeclining || isDocumentFetching;

  const sortedApplications = useMemo(
    () =>
      applications
        .slice()
        .sort(
          (firstApplication, secondApplication) =>
            new Date(secondApplication.createdAt).getTime() -
            new Date(firstApplication.createdAt).getTime(),
        ),
    [applications],
  );

  return (
    <MainLayout>
      <Table
        loading={isTableLoading}
        title={() => (
          <Typography.Title level={2}>Transport Applications</Typography.Title>
        )}
        columns={columns}
        dataSource={sortedApplications.map((app) => ({
          ...app,
          key: app.id,
        }))}
      />
      {isError && <NetworkErrorResult />}
    </MainLayout>
  );
};

export default TransportApplicationsPage;
