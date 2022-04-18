import { User } from '../../users/models/user.interface';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/models/routes.enum';

type UserLinkProps = {
  user: User;
};

function UserLink({ user }: UserLinkProps) {
  const navigate = useNavigate();

  const onLinkClicked = () => {
    navigate(`/${AppRoutes.USERS}/${user.id}`);
  };

  return <a onClick={onLinkClicked}>{`${user.firstName} ${user.lastName}`}</a>;
}

export default UserLink;
