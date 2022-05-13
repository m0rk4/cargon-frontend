import React from 'react';
import { Button, Form, Select } from 'antd';
import { DocumentType } from './models/document-type.enum';
import { DocumentFormat } from './models/document-format.enum';
import { downloadBlob } from '../util/download';
import { useLazyGetReportQuery } from './statsApiSlice';

interface DocumentFormValue {
  documentType: DocumentType;
  documentFormat: DocumentFormat;
}

function StatsPage() {
  const [getReport, { isFetching: isReportFetching }] = useLazyGetReportQuery();

  const onSubmit = async (value: DocumentFormValue) => {
    const blob = await getReport({
      documentType: value.documentType,
      documentFormat: value.documentFormat,
    }).unwrap();
    downloadBlob(blob, `${value.documentType}.${value.documentFormat}`);
  };

  return (
    <Form name="control-ref" onFinish={onSubmit}>
      <Form.Item
        name="documentFormat"
        label="Document Format"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a option" allowClear>
          <Select.Option value={DocumentFormat.PDF}>PDF</Select.Option>
          <Select.Option value={DocumentFormat.CSV}>CSV</Select.Option>
          <Select.Option value={DocumentFormat.XLSX}>XLSX</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="documentType"
        label="Document Type"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a option" allowClear>
          <Select.Option value={DocumentType.TRANSPORT_POPULARITY}>
            Transport Popularity
          </Select.Option>
          <Select.Option value={DocumentType.ORDERS_TIME}>
            Orders Time
          </Select.Option>
          <Select.Option value={DocumentType.DRIVER_STATISTICS}>
            Drivers Statistics
          </Select.Option>
          <Select.Option value={DocumentType.ORDERS_VOLUMES}>
            Orders Volumes
          </Select.Option>
          <Select.Option value={DocumentType.USERS_ORDERS_COUNT}>
            Users Orders Count
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isReportFetching}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default StatsPage;
