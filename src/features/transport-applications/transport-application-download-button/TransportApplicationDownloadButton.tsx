import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

type TransportApplicationDownloadButtonProps = {
  documentUid: string;
  onOpenDocument: (documentUid: string) => void;
};

function TransportApplicationDownloadButton({
  documentUid,
  onOpenDocument,
}: TransportApplicationDownloadButtonProps) {
  return (
    <Button
      onClick={() => onOpenDocument(documentUid)}
      type="primary"
      shape="round"
      icon={<DownloadOutlined />}
    >
      Open
    </Button>
  );
}

export default TransportApplicationDownloadButton;
