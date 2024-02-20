import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Message, Modal } from 'src/atoms';
import { Paths } from 'src/constants';
import { useWebSocket } from 'src/context/WebSocketContext/WebSocketContext';
import { TResultOfUser } from 'src/context/WebSocketContext/WebSocketContext.types';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { clearChat, updateChat } from 'src/store/slices/chatSlice';

import styles from './Messages.module.scss';
import { TMessage } from './Messages.types';
import { formateResult, sortMessages } from './Messages.utils';

const Messages: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [date, setDate] = useState(0);
  const [results, setResults] = useState<TResultOfUser[]>([]);
  const messages = useAppSelector((state) => state.chat.chat.messages);
  const role = useAppSelector((state) => state.user.user.role);

  const { socket, data } = useWebSocket();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resultMessage = formateResult(results);
  const sortedMessages = sortMessages([...messages]);
  const isUser = role === 'student';

  useEffect(() => {
    if (data) {
      if (data.type === 'room_info') dispatch(updateChat(data));
      if (data.type === 'training_close' && data.results) {
        setResults(data.results);
        setDate(Date.now());
        setIsOpenModal(true);
      }
      if (data.type === 'message_select') {
        socket?.send(JSON.stringify({ type: 'room_info' }));
      }
    }
  }, [data]);

  const handleContinue = () => {
    if (isUser) {
      setIsOpenModal(false);
    } else {
      dispatch(clearChat());
      navigate(Paths.chatClose);
    }
  };

  return (
    <>
      <div className={styles.messages}>
        {results.length > 0 && (
          <Message
            username={'Администратор'}
            text={resultMessage}
            createdAt={date}
            isSelected={false}
            isLocked={true}
            isTrainerMessage={true}
          />
        )}
        {sortedMessages.map((message: TMessage) => (
          <Message
            key={message.id}
            messageId={message.id}
            username={message.role === 'trainer' ? 'Администратор' : message.username}
            text={message.text}
            createdAt={message.created_at}
            isSelected={message.is_selected}
            isLocked={message.is_locked}
            isTrainerMessage={message.role === 'trainer'}
          />
        ))}
      </div>
      {isOpenModal && (
        <Modal
          handleContinue={handleContinue}
          title="Тренинг окончен"
          text="Для того чтобы остаться в чате, и ознакомиться с ответами, нажмите кнопку «Продолжить. Если Вам это не нужно, нажмите кнопку «Выйти»"
        />
      )}
    </>
  );
};

export default Messages;
