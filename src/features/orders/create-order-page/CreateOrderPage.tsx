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
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [fromLocation, setFromLocation] = useState<GeoLocation>();
  const [toLocation, setToLocation] = useState<GeoLocation>();

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
    const body: CreateOrderDto = {
      toLocation: {
        home: toLocation!.home,
        street:
          streets.find(
            (streetFromDb) => streetFromDb.name === toLocation!.street.name,
          ) ?? toLocation!.street,
        city:
          cities.find(
            (streetFromDb) => streetFromDb.name === toLocation!.city.name,
          ) ?? toLocation!.city,
      },
      fromLocation: {
        home: fromLocation!.home,
        street:
          streets.find(
            (streetFromDb) => streetFromDb.name === fromLocation?.street.name,
          ) ?? fromLocation!.street,
        city:
          cities.find(
            (streetFromDb) => streetFromDb.name === fromLocation?.city.name,
          ) ?? fromLocation!.city,
      },
      cargos,
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

  return (
    <>
      <Steps style={{ marginBottom: '40px' }} current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {currentStep === 0 && (
        <CreateCargoForm
          title="Please Add Order Cargos:"
          cargos={cargos}
          setCargos={(cargos) => setCargos(cargos)}
          next={nextStep}
        />
      )}
      {currentStep === 1 && (
        <CreateLocationForm
          title="Please add source and destination locations"
          cities={cities}
          streets={streets}
          next={nextStep}
          fromLocation={fromLocation}
          toLocation={toLocation}
          setFromLocation={setFromLocation}
          setToLocation={setToLocation}
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
