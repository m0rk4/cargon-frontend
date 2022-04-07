import { notification } from 'antd';

export const openNotification = (
  message: string,
  description: string,
  icon: JSX.Element,
) =>
  notification.info({
    message,
    description,
    icon,
    placement: 'bottomRight',
  });
