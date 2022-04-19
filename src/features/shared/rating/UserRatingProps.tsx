import React from 'react';
import { Rate } from 'antd';

type UserRatingProps = {
  rating?: number;
  enabled?: boolean;
  onChange?: (value: number) => void;
};

function UserRating({ rating, enabled, onChange }: UserRatingProps) {
  return <Rate onChange={onChange} value={rating} disabled={!enabled} />;
}

export default UserRating;
