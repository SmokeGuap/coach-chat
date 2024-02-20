import { FC } from 'react';

import WebSocketProvider from 'src/context/WebSocketContext/WebSocketContext';
import { useAppSelector, useWindowWidth } from 'src/hooks';
import { ListOfUsers } from 'src/molecules';
import { Header, Messages, SendField } from 'src/organizms';
import { storage } from 'src/services/StorageService';

import styles from './RoomPage.module.scss';

const RoomPage: FC = () => {
  const roomId = useAppSelector((state) => state.user.user.room_uuid);

  const windowWidth = useWindowWidth();
  const isShowList = windowWidth && windowWidth >= 1024;

  return (
    <WebSocketProvider roomId={roomId} token={storage.GET('access')}>
      <div className={styles.container}>
        <Header />
        <div className={styles.chat}>
          <div className={styles.messages}>
            <Messages />
            <SendField />
          </div>
          {isShowList && <ListOfUsers />}
        </div>
      </div>
    </WebSocketProvider>
  );
};

export default RoomPage;
