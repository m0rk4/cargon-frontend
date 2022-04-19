import { Button, Col, Divider, message, Row, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CreateLocationForm from '../create-location-form/CreateLocationForm';
import React, { useMemo, useState } from 'react';
import { GeoLocation } from '../../locations/models/location.interface';
import {
  useBookOrderMutation,
  useCompleteOrderMutation,
  useDeclineOrderMutation,
  useGetOrderQuery,
  useReleaseOrderMutation,
  useUpdateOrderCargosMutation,
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
import { useAuth } from '../../hooks/useAuth';
import NotFoundPage from '../../shared/not-found';
import { AppRoutes } from '../../routes/models/routes.enum';
import { DeepPartial } from '@reduxjs/toolkit';

function OrderPage() {
  const { user } = useAuth();
  const { orderId } = useParams();
  const [fromLocation, setFromLocation] = useState<DeepPartial<GeoLocation>>();
  const [toLocation, setToLocation] = useState<DeepPartial<GeoLocation>>();
  const [cargos, setCargos] = useState<Partial<Cargo>[]>();
  const [vehicles = [], setVehicles] = useState<Vehicle[]>();
  const [isModalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  if (!orderId) {
    return <NotFoundPage />;
  }

  const { data: order, isLoading, isError } = useGetOrderQuery(+orderId);
  const { data: streets = [] } = useGetStreetsQuery();
  const { data: cities = [] } = useGetCitiesQuery();
  const [declineOrder, { isLoading: isDeclining }] = useDeclineOrderMutation();
  const [releaseOrder, { isLoading: isReleasing }] = useReleaseOrderMutation();
  const [bookOrder, { isLoading: isBooking }] = useBookOrderMutation();
  const [updateOrderCargos, { isLoading: isUpdatingCargos }] =
    useUpdateOrderCargosMutation();
  const [completeOrder, { isLoading: isCompleting }] =
    useCompleteOrderMutation();
  const [getDriverVehicles, { isFetching: isDriverVehiclesFetching }] =
    useLazyGetDriverVehiclesQuery();

  const actionsLoading =
    isLoading ||
    isDeclining ||
    isReleasing ||
    isCompleting ||
    isUpdatingCargos ||
    isDriverVehiclesFetching;

  if (isError) {
    return <NetworkErrorResult />;
  }

  const onDecline = async () => {
    try {
      await declineOrder(+orderId).unwrap();
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
      await releaseOrder(+orderId).unwrap();
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
      await completeOrder(+orderId).unwrap();
      navigate(`/${AppRoutes.ORDERS}/${orderId}/${AppRoutes.COMPLETION}`);
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
        orderId: +orderId,
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

  const cargosChanged = useMemo(() => {
    const equals = (cargoFirst: Partial<Cargo>, cargoSecond: Partial<Cargo>) =>
      cargoFirst.name === cargoSecond.name &&
      cargoFirst.length === cargoSecond.length &&
      cargoFirst.height === cargoSecond.height &&
      cargoFirst.width === cargoSecond.width &&
      cargoFirst.weight === cargoSecond.weight;
    return (
      cargos &&
      (cargos.length !== order?.cargos?.length ||
        !order?.cargos?.every(
          (value, index) =>
            cargos && cargos[index] && equals(cargos[index], value),
        ))
    );
  }, [cargos]);

  const isLocationsChanged = useMemo(
    () =>
      JSON.stringify(toLocation) !== JSON.stringify(order?.toLocation) ||
      JSON.stringify(fromLocation) !== JSON.stringify(order?.fromLocation),
    [toLocation, fromLocation],
  );

  const isUserOrderOwner = user?.id === order?.user?.id;
  const isOrderEditAvailable =
    isUserOrderOwner &&
    (order?.status === OrderStatus.PENDING ||
      order?.status === OrderStatus.APPROVED);

  const onCargoChanged = (cargos: Partial<Cargo>[]) => {
    setCargos(cargos);
  };

  const onToLocationChanged = (location: DeepPartial<GeoLocation>) => {
    console.log(location);
    setToLocation(location);
  };

  const onFromLocationChanged = (location: DeepPartial<GeoLocation>) => {
    setFromLocation(location);
  };

  const onCargoSubmitted = async () => {
    try {
      await updateOrderCargos({ orderId, cargos: cargos as Cargo[] }).unwrap();
      setCargos(undefined);
      message.success('Order Cargos updated!');
    } catch (e) {
      message.error('Failed to update order cargos!');
    }
  };

  const onLocationsSubmitted = () => {
    console.log({ fromLocation, toLocation });
  };

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
          <OrderStatusMessage status={order?.status} />
        </div>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <UserInfo
            loading={actionsLoading}
            title="Owner Information"
            user={order?.user}
          />
        </Col>
        <Col span={12}>
          {order?.driver && (
            <UserInfo
              loading={actionsLoading}
              title="Driver Information"
              user={order?.driver}
            />
          )}
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <CreateLocationForm
            title="Order Locations"
            loading={actionsLoading}
            disabled={!isOrderEditAvailable}
            fromLocation={fromLocation ?? order?.fromLocation}
            toLocation={toLocation ?? order?.toLocation}
            streets={streets}
            cities={cities}
            onSubmit={onLocationsSubmitted}
            onFromLocationChanged={onFromLocationChanged}
            onToLocationChanged={onToLocationChanged}
          />
        </Col>
        <Col span={12}>
          <Button
            disabled={!cargosChanged}
            onClick={() => setCargos(order?.cargos)}
            type="primary"
          >
            Reset To Defaults
          </Button>
          <CreateCargoForm
            title="Order Cargos"
            onSubmit={onCargoSubmitted}
            onChange={onCargoChanged}
            loading={actionsLoading}
            disabled={!isOrderEditAvailable}
            cargos={cargos || order?.cargos}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <Col span={12}>
          <OrderActions
            loading={actionsLoading}
            order={order}
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
