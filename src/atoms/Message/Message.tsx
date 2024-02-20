import classNames from 'classnames';
import { FC, useState } from 'react';

import { CheckerOn, CheckerOff, Lock } from 'src/assets/icons';
import { useWebSocket } from 'src/context/WebSocketContext/WebSocketContext';
import { useAppSelector } from 'src/hooks';

import styles from './Message.module.scss';
import { IMessageProps } from './Message.types';
import { formateDate } from './Message.utils';

const Message: FC<IMessageProps> = (props) => {
  const { messageId, username, text, createdAt, isSelected, isLocked, isTrainerMessage } = props;
  const [correct, setCorrect] = useState(false);
  const role = useAppSelector((state) => state.user.user.role);

  const { socket } = useWebSocket();

  const isShowChecker = role === 'trainer' && !isTrainerMessage;

  const handleSetCorrect = () => {
    setCorrect((prevCorrect) => !prevCorrect);
    socket?.send(JSON.stringify({ type: 'message_select', message_id: messageId, is_selected: !correct }));
  };

  return (
    <div className={classNames(styles.message, { [styles.messageUser]: !isTrainerMessage })}>
      <p className={classNames(styles.username, { [styles.usernameUser]: !isTrainerMessage })}>{username}</p>
      <div
        className={classNames(
          styles.text,
          { [styles.textUser]: !isTrainerMessage },
          { [styles.textCorrect]: isSelected }
        )}
      >
        {text ? text : <Lock />}
        <span className={styles.time}>{formateDate(createdAt)}</span>
      </div>
      {isShowChecker && !isLocked && (
        <button onClick={handleSetCorrect} type="button" className={styles.checker}>
          {correct ? <CheckerOn /> : <CheckerOff />}
        </button>
      )}
    </div>
  );
};

export default Message;
