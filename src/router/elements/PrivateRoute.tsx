import { FC } from 'react';
import { Navigate, useOutlet } from 'react-router-dom';

import { useAppSelector } from 'src/hooks';
import { Paths } from 'src/constants';

const PrivateRoute: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const outlet = useOutlet();

  if (!user.role) {
    return <Navigate to={Paths.home} replace={true} />;
  }

  return <>{outlet}</>;
};

export default PrivateRoute;
