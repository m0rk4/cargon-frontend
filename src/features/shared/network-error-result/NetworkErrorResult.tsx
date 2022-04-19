import React from 'react';
import { Result } from 'antd';

function NetworkErrorResult() {
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
    />
  );
}

export default NetworkErrorResult;
