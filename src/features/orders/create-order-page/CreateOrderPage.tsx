import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import './CreateOrdersPage.css';
import CreateCargoForm from '../create-cargo-form/CreateCargoForm';
import CreateLocationForm from '../create-location-form/CreateLocationForm';
import { GeoLocation } from '../../locations/models/location.interface';
import OrderConfirmation from '../order-confirmation/OrderConfirmation';
import NetworkErrorResult from '../../shared/network-error-result/NetworkErrorResult';
import {
  useGetCitiesQuery,
  useGetStreetsQuery,
} from '../../locations/locationsApiSlice';
import { useCreateOrderMutation } from '../ordersApiSlice';
import { CreateOrderDto } from '../models/create-order-dto.interface';
import { openNotification } from '../../util/notification';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Cargo } from '../models/cargo.interface';
import Loading from '../../shared/loading';
import { DeepPartial } from '@reduxjs/toolkit';

const { Step } = Steps;

const steps = [
  {
    id: 0,
    title: 'Create Cargos',
  },
  {
    id: 1,
    title: 'Set Locations',
  },
  {
    id: 2,
    title: 'Confirm Order',
  },
];

function CreateOrderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cargos, setCargos] = useState<Partial<Cargo>[]>([]);
  const [fromLocation, setFromLocation] = useState<DeepPartial<GeoLocation>>();
  const [toLocation, setToLocation] = useState<DeepPartial<GeoLocation>>();

  const {
    data: streets = [],
    isLoading: streetsLoading,
    isError: streetsError,
  } = useGetStreetsQuery();
  const {
    data: cities = [],
    isLoading: citiesLoading,
    isError: citiesError,
  } = useGetCitiesQuery();
  const [createOrder, { isLoading: isAdding }] = useCreateOrderMutation();

  if (streetsLoading || citiesLoading || isAdding) return <Loading />;

  if (streetsError || citiesError) return <NetworkErrorResult />;

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onProceed = async () => {
    const isToLocationSpecified =
      toLocation &&
      toLocation.home &&
      toLocation.city?.name &&
      toLocation.street?.name;
    const isFromLocationSpecified =
      fromLocation &&
      fromLocation.home &&
      fromLocation.city?.name &&
      fromLocation.street?.name;
    if (!isToLocationSpecified || !isFromLocationSpecified) {
      message.error("Seems like you haven't specified locations!");
      return;
    }

    const requestedCargos = cargos
      .map((cargoPartial) => {
        if (
          !cargoPartial.name ||
          !cargoPartial.length ||
          !cargoPartial.height ||
          !cargoPartial.width ||
          !cargoPartial.weight
        )
          return null;
        return { ...cargoPartial } as Cargo;
      })
      .filter((cargo) => cargo !== null) as Cargo[];

    const requestedFromLocation = fromLocation as GeoLocation;
    const requestedToLocation = toLocation as GeoLocation;

    const body: CreateOrderDto = {
      toLocation: {
        home: requestedToLocation.home,
        street:
          streets.find(
            (streetFromDb) =>
              streetFromDb.name === requestedToLocation.street.name,
          ) ?? requestedToLocation.street,
        city:
          cities.find(
            (streetFromDb) =>
              streetFromDb.name === requestedToLocation?.city?.name,
          ) ?? requestedToLocation.city,
      },
      fromLocation: {
        home: requestedFromLocation.home,
        street:
          streets.find(
            (streetFromDb) =>
              streetFromDb.name === requestedFromLocation?.street?.name,
          ) ?? requestedFromLocation.street,
        city:
          cities.find(
            (streetFromDb) =>
              streetFromDb.name === requestedFromLocation?.city?.name,
          ) ?? requestedFromLocation.city,
      },
      cargos: requestedCargos,
    };

    try {
      await createOrder(body).unwrap();
      openNotification(
        'Order Creation',
        'Created successfully!',
        <CheckCircleOutlined />,
      );
      setCargos([]);
      setToLocation(undefined);
      setFromLocation(undefined);
      setCurrentStep(0);
    } catch (e) {
      message.error('Order creation failed.');
    }
  };

  const onCargoChanged = (cargos: Partial<Cargo>[]) => {
    setCargos(cargos);
  };

  const onFromLocationChange = (location: DeepPartial<GeoLocation>) => {
    setFromLocation(location);
  };

  const onToLocationChange = (location: DeepPartial<GeoLocation>) => {
    setToLocation(location);
  };

  return (
    <>
      <Steps style={{ marginBottom: '40px' }} current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {currentStep === 0 && (
        <CreateCargoForm
          onChange={onCargoChanged}
          title="Please Add Order Cargos:"
          cargos={cargos}
          onSubmit={nextStep}
        />
      )}
      {currentStep === 1 && (
        <CreateLocationForm
          title="Please add source and destination locations"
          cities={cities}
          streets={streets}
          onSubmit={nextStep}
          fromLocation={fromLocation}
          toLocation={toLocation}
          onFromLocationChanged={onFromLocationChange}
          onToLocationChanged={onToLocationChange}
        />
      )}
      {currentStep === 2 && (
        <OrderConfirmation
          cargos={cargos}
          toLocation={toLocation}
          fromLocation={fromLocation}
        />
      )}
      <div>
        {currentStep === steps.length - 1 && (
          <Button
            style={{ display: 'flex', margin: '20px 0 ' }}
            type="primary"
            onClick={onProceed}
          >
            Proceed
          </Button>
        )}
        {currentStep > 0 && (
          <Button
            style={{ display: 'flex', margin: '20px 0 ' }}
            onClick={prevStep}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default CreateOrderPage;
