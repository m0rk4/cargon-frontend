import { message, Typography, Upload } from 'antd';
import React from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';
import { useAddTransportApplicationMutation } from './transportApplicationSlice';

const CreateTransportApplicationPage = () => {
  const [addTransportApplication] = useAddTransportApplicationMutation();

  const onChange = async ({ file }: UploadChangeParam) => {
    if (file.status !== 'done') return;

    const publicId: string = file.response.public_id;
    try {
      await addTransportApplication({ driverId: 1, publicId }).unwrap();
      message.success('Successfully uploaded transport application.');
    } catch (e) {
      message.error('Failed to save transport application document.');
    }
  };

  return (
    <MainLayout>
      <Typography.Title level={2}>
        Upload document for your transport application:
      </Typography.Title>
      <Upload.Dragger
        onChange={onChange}
        accept={'.pdf'}
        action={`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`}
        name={'file'}
        data={{ upload_preset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single upload.</p>
      </Upload.Dragger>
    </MainLayout>
  );
};

export default CreateTransportApplicationPage;
