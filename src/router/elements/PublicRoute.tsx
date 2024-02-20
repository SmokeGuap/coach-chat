import { FC } from 'react';
import { Navigate, useOutlet } from 'react-router-dom';

import { Paths } from 'src/constants';
import { useAppSelector } from 'src/hooks';

const PublicRoute: FC = () => {
  const { role, room_id } = useAppSelector((state) => state.user.user);
  const outlet = useOutlet();

  if (role === 'trainer') {
    return <Navigate to={Paths.createRoom} replace={true} />;
  } else if (role === 'student') {
    return <Navigate to={`${Paths.room}/${room_id}`} replace={true} />;
  }

  return <>{outlet}</>;
};

export default PublicRoute;
