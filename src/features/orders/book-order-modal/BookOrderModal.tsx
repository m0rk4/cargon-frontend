import { message, Modal, Select, Typography } from 'antd';
import { Vehicle } from '../../vehicles/models/vehicle.interface';
import { CarTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';

type BookOrderModalProps = {
  vehicles: Vehicle[];
  visible: boolean;
  onCancel: () => void;
  onOk: (transports: number[]) => void;
  confirmLoading: boolean;
};

function BookOrderModal({
  vehicles,
  visible,
  onCancel,
  onOk,
  confirmLoading,
}: BookOrderModalProps) {
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<number[]>([]);

  const renderVehicle = (vehicle: Vehicle) => {
    return (
      <div>
        <CarTwoTone />
        {` ${vehicle.brand} ${vehicle.model} ${new Date(
          vehicle.yearOfProduction,
        ).getFullYear()}`}
      </div>
    );
  };

  const onOkClicked = () => {
    if (selectedVehicleIds.length === 0) {
      message.error('Please select at least one vehicle!');
      return;
    }

    onOk(selectedVehicleIds);
  };

  return (
    <Modal
      centered
      title="Book Order"
      visible={visible}
      onOk={onOkClicked}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Typography.Title level={5}>Select vehicles:</Typography.Title>
      <Select
        mode="multiple"
        allowClear
        onChange={(ids) => setSelectedVehicleIds(ids)}
        style={{ width: '100%' }}
        placeholder="Vehicles"
      >
        {vehicles.map((vehicle) => (
          <Select.Option value={vehicle.id} key={vehicle.id}>
            {renderVehicle(vehicle)}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
}

export default BookOrderModal;
