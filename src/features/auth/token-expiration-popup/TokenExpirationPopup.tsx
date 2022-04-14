import { Button, Modal, Result } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  clearCredentials,
  selectIsTokenExpirationPopupVisible,
  triggerExpirationPopup,
} from '../authSlice';
import { AppRoutes } from '../../routes/models/routes.enum';

function TokenExpirationPopup() {
  const isTokenExpirationPopupVisible = useAppSelector(
    selectIsTokenExpirationPopupVisible,
  );
  const dispatch = useAppDispatch();

  const handleOk = () => {
    location.href = `/${AppRoutes.SIGN_IN}`;
    dispatch(clearCredentials());
    dispatch(triggerExpirationPopup(false));
  };

  return (
    <Modal
      title="Token Expiration"
      centered
      visible={isTokenExpirationPopupVisible}
      onOk={handleOk}
      okText="Sign In Again"
      footer={[]}
    >
      <Result
        status="403"
        title="401"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button onClick={handleOk} type="primary">
            Sign In
          </Button>
        }
      />
    </Modal>
  );
}

export default TokenExpirationPopup;
