import { Col, Divider, message, Row, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CreateLocationForm from '../create-location-form/CreateLocationForm';
import React, { useState } from 'react';
import { GeoLocation } from '../../locations/models/location.interface';
import {
  useBookOrderMutation,
  useCompleteOrderMutation,
  useDeclineOrderMutation,
  useGetOrderQuery,
  useReleaseOrderMutation,
} from '../ordersApiSlice';
import NetworkErrorResult from '../../shared/network-error-result/NetworkErrorResult';
import { CheckCircleOutlined } from '@ant-design/icons';
import CreateCargoForm from '../create-cargo-form/CreateCargoForm';
import { Cargo } from '../models/cargo.interface';
import {
  useGetCitiesQuery,
  useGetStreetsQuery,
} from '../../locations/locationsApiSlice';
import OrderStatusMessage from '../order-status-message/OrderStatusMessage';
import UserInfo from '../../shared/user-info/UserInfo';
import { openNotification } from '../../util/notification';
import BookOrderModal from '../book-order-modal/BookOrderModal';
import { useLazyGetDriverVehiclesQuery } from '../../vehicles/vehiclesApiSlice';
import { Vehicle } from '../../vehicles/models/vehicle.interface';
import { OrderStatus } from '../models/order-status.interface';
import OrderActions from '../order-actions/OrderActions';
import Loading from '../../shared/loading';

function OrderPage() {
  const { orderId } = useParams();
  const [fromLocation, setFromLocation] = useState<GeoLocation>();
  const [toLocation, setToLocation] = useState<GeoLocation>();
  const [cargos, setCargos] = useState<Cargo[]>();
  const [vehicles = [], setVehicles] = useState<Vehicle[]>();
  const [isModalVisible, setModalVisible] = useState(false);
  const { data: order, isLoading, isError } = useGetOrderQuery(+orderId!);
  const { data: streets = [] } = useGetStreetsQuery();
  const { data: cities = [] } = useGetCitiesQuery();
  const [declineOrder, { isLoading: isDeclining }] = useDeclineOrderMutation();
  const [releaseOrder, { isLoading: isReleasing }] = useReleaseOrderMutation();
  const [bookOrder, { isLoading: isBooking }] = useBookOrderMutation();
  const [completeOrder, { isLoading: isCompleting }] =
    useCompleteOrderMutation();
  const [getDriverVehicles, { isFetching: isDriverVehiclesFetching }] =
    useLazyGetDriverVehiclesQuery();
  const navigate = useNavigate();

  const actionsLoading =
    isDeclining || isReleasing || isCompleting || isDriverVehiclesFetching;

  if (isLoading || actionsLoading) {
    return <Loading />;
  }

  if (isError) {
    return <NetworkErrorResult />;
  }

  const onDecline = async () => {
    try {
      await declineOrder(+orderId!).unwrap();
      openNotification(
        'Order Approval',
        'Declined successfully!',
        <CheckCircleOutlined />,
      );
    } catch (e) {
      message.error('Declining failed!');
    }
  };

  const onRelease = async () => {
    try {
      await releaseOrder(+orderId!).unwrap();
      openNotification(
        'Order Release',
        'Released successfully!',
        <CheckCircleOutlined />,
      );
    } catch (e) {
      message.error('Releasing failed!');
    }
  };

  const onComplete = async () => {
    try {
      await completeOrder(+orderId!).unwrap();
      navigate(`/orders/${orderId}/completion`);
    } catch (e) {
      message.error('Completion failed!');
    }
  };

  const onBookClicked = async () => {
    try {
      const vehicles = await getDriverVehicles().unwrap();
      setVehicles(vehicles);
      setModalVisible(true);
    } catch (e) {
      message.error('Driver transports fetching failed.');
    }
  };

  const onBookSuccessful = async (transportIds: number[]) => {
    try {
      await bookOrder({
        dto: { transportIds },
        orderId: +orderId!,
      }).unwrap();
      setModalVisible(false);
      openNotification(
        'Order Booking',
        'Booked successfully!',
        <CheckCircleOutlined />,
      );
    } catch (e) {
      message.error('Order booking failed.');
    }
  };

  //TODO: remove user order author
  const isUserOrderOwner = true;
  const isOrderEditAvailable =
    isUserOrderOwner &&
    (order?.status === OrderStatus.PENDING ||
      order?.status === OrderStatus.APPROVED);

  return (
    <>
      <Row style={{ justifyContent: 'center' }} gutter={[8, 16]}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '20px',
          }}
        >
          <Typography.Title style={{ display: 'box', margin: 0 }}>
            Order #{orderId}
          </Typography.Title>
          <OrderStatusMessage status={order!.status} />
        </div>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <UserInfo title="Owner Information" user={order!.user} />
        </Col>
        <Col span={12}>
          {order?.driver && (
            <UserInfo title="Driver Information" user={order.driver} />
          )}
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <CreateLocationForm
            disabled={!isOrderEditAvailable}
            title="Order Locations"
            setFromLocation={setFromLocation}
            setToLocation={setToLocation}
            fromLocation={fromLocation ?? order!.fromLocation}
            toLocation={toLocation ?? order!.toLocation}
            streets={streets}
            cities={cities}
          />
        </Col>
        <Col span={12}>
          <CreateCargoForm
            disabled={!isOrderEditAvailable}
            title="Order Cargos"
            setCargos={setCargos}
            cargos={cargos || order!.cargos}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <OrderActions
            onComplete={onComplete}
            onBook={onBookClicked}
            onRelease={onRelease}
            onDecline={onDecline}
          />
        </Col>
      </Row>
      <BookOrderModal
        vehicles={vehicles}
        visible={isModalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={onBookSuccessful}
        confirmLoading={isBooking}
      />
    </>
  );
}

export default OrderPage;
