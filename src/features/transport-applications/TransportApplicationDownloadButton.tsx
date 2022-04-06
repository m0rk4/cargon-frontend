import React, { VFC } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

type TransportApplicationDownloadButtonProps = {
  documentUid: string;
  onOpenDocument: (documentUid: string) => void;
};

const TransportApplicationDownloadButton: VFC<
  TransportApplicationDownloadButtonProps
> = ({ documentUid, onOpenDocument }) => (
  <Button
    onClick={() => onOpenDocument(documentUid)}
    type="primary"
    shape="round"
    icon={<DownloadOutlined />}
  >
    Download
  </Button>
);

export default TransportApplicationDownloadButton;
