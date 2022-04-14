import React from 'react';
import { Rate } from 'antd';

type UserRatingProps = {
  rating: number;
  enabled?: boolean;
  onChange?: (value: number) => void;
};

export default function UserRating({
  rating,
  enabled,
  onChange,
}: UserRatingProps) {
  return <Rate onChange={onChange} defaultValue={rating} disabled={!enabled} />;
}
