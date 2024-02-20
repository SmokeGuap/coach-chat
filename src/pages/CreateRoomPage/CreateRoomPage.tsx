import { FC } from 'react';
import { Navigate } from 'react-router';

import { Paths } from 'src/constants';
import { useAppSelector } from 'src/hooks';
import { CreateRoomForm, Header } from 'src/organizms';

import styles from './CreateRoomPage.module.scss';

const CreateRoomPage: FC = () => {
  const roomId = useAppSelector((state) => state.user.user.room_uuid);

  if (roomId) {
    return <Navigate to={`${Paths.room}/${roomId}`} replace={true} />;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.createRoom}>
        <h2>Создать комнату</h2>
        <CreateRoomForm />
      </div>
    </div>
  );
};

export default CreateRoomPage;
