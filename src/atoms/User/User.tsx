import classNames from 'classnames';
import { FC } from 'react';
import { Tooltip } from 'react-tooltip';

import { Remove } from 'src/assets/icons';
import { useWebSocket } from 'src/context/WebSocketContext/WebSocketContext';
import { useAppSelector } from 'src/hooks';

import styles from './User.module.scss';
import { IUserProps } from './User.types';

const User: FC<IUserProps> = (props) => {
  const { username } = props;
  const { role, username: usernameAuth } = useAppSelector((state) => state.user.user);
  const trainingStatus = useAppSelector((state) => state.chat.chat.training_start_status);

  const { socket } = useWebSocket();

  const isStarted = trainingStatus === 'started';
  const isCoach = role === 'trainer';
  const isMe = username.nickname === usernameAuth;

  const handleDeleteUser = () => {
    socket?.send(JSON.stringify({ type: 'student_kick', student_id: username.user__id }));
  };

  return (
    <div className={classNames(styles.user, { [styles.userAuth]: isMe })}>
      <span>{username.nickname}</span>
      {isCoach && isStarted && (
        <button onClick={handleDeleteUser} type="button">
          <Remove data-tooltip-id="tooltip" data-tooltip-content="Исключить" />
          <Tooltip id="tooltip" place="top-end" />
        </button>
      )}
    </div>
  );
};

export default User;
