import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Paths } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { UserChoicePage, SignInUserPage, SignInCoachPage, CreateRoomPage, RoomPage, ChatClosePage } from 'src/pages';
import { getUserInfo } from 'src/store/slices/userActions';

import { PublicRoute, PrivateRoute } from './elements';

const Router: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={Paths.home} element={<UserChoicePage />} />
        <Route path={Paths.signInUser} element={<SignInUserPage />} />
        <Route path={Paths.signInCoach} element={<SignInCoachPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path={Paths.createRoom} element={<CreateRoomPage />} />
        <Route path={`${Paths.room}/:id`} element={<RoomPage />} />
        <Route path={Paths.chatClose} element={<ChatClosePage />} />
      </Route>

      <Route path="*" element={<Navigate to={Paths.home} replace />} />
    </Routes>
  );
};

export default Router;
