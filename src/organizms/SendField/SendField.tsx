import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { Cancel, Copy, More, Next, Send, Start } from 'src/assets/icons';
import { Button, InputMessage, Modal } from 'src/atoms';
import { EButtonVariants } from 'src/atoms/Button/Button.types';
import { useWebSocket } from 'src/context/WebSocketContext/WebSocketContext';
import { useAppDispatch, useAppSelector, useLogOut, useWindowWidth } from 'src/hooks';
import { clearRoom } from 'src/store/slices/roomSlice';
import { clearUserRoomUUID } from 'src/store/slices/userSlice';

import styles from './SendField.module.scss';
import { numberToTime } from './SendField.utils';

const SendField: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTrainingClose, setIsTrainingClose] = useState(false);
  const [message, setMessage] = useState('');
  const {
    is_allowed_to_send_message: isAllowedToSendMessage,
    training_start_status: trainingStatus,
    max_round_time: roundTime,
    current_round: currentRound,
    max_rounds_count: roundCount,
  } = useAppSelector((state) => state.chat.chat);
  const role = useAppSelector((state) => state.user.user.role);
  const [seconds, setSeconds] = useState(roundTime);
  const [isRunning, setIsRunning] = useState(false);

  const { id } = useParams();
  const { socket, data } = useWebSocket();
  const windowWidth = useWindowWidth();
  const logOut = useLogOut();
  const dispatch = useAppDispatch();

  const moreButton = windowWidth && windowWidth < 1024;
  const isStarted = trainingStatus === 'started';
  const isCoach = role === 'trainer';
  const isEnded = currentRound === roundCount;

  useEffect(() => {
    setSeconds(roundTime);
  }, [roundTime]);

  useEffect(() => {
    let timerInterval: ReturnType<typeof setInterval>;

    if (isRunning) {
      timerInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else {
          clearInterval(timerInterval);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, seconds]);

  useEffect(() => {
    if (!moreButton) setIsOpen(true);
    else setIsOpen(false);
  }, [moreButton]);

  useEffect(() => {
    if (
      data?.type === 'unready_students_elimination' ||
      data?.type === 'message_new' ||
      data?.type === 'round_timer_end' ||
      data?.type === 'round_new' ||
      data?.type === 'student_confirmation'
    ) {
      socket?.send(JSON.stringify({ type: 'room_info' }));
    }
    if (data?.type === 'training_start') {
      setIsOpenModal(true);
    }
    if (data?.type === 'message_new') {
      if (data?.message?.role === 'trainer') {
        setIsRunning(true);
      }
    }
  }, [data]);

  const openMenu = () => setIsOpen((prevState) => !prevState);

  const handleStartTraining = () => {
    socket?.send(JSON.stringify({ type: 'training_start' }));
  };

  const handleCloseTraining = () => {
    socket?.send(JSON.stringify({ type: 'training_close' }));
    setIsTrainingClose(true);
    dispatch(clearUserRoomUUID());
    dispatch(clearRoom());
  };

  const newRound = () => {
    socket?.send(JSON.stringify({ type: 'round_new' }));
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(id ? id : '');
  };

  const sendMessage = () => {
    socket?.send(JSON.stringify({ type: 'message_new', text: message }));
    setMessage('');
    if (!isCoach) {
      setIsRunning(false);
      setSeconds(roundTime);
    }
  };

  const typing = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  const handleExit = () => {
    // TODO: Не работает данная ручка с is_ready: false
    // socket?.send(JSON.stringify({ type: 'student_confirmation', is_ready: false }));
    logOut();
  };

  const handleContinue = () => {
    socket?.send(JSON.stringify({ type: 'student_confirmation', is_ready: true }));
    setIsOpenModal(false);
  };

  return (
    <>
      {!isCoach && isOpenModal && (
        <Modal
          handleExit={handleExit}
          handleContinue={handleContinue}
          title="Вы готовы?"
          text="До начала тренинга остается «20 сек.». Нажмите «Продолжить», если вы готовы начинать."
        />
      )}
      <div className={styles.sendField}>
        <InputMessage value={message} onChange={typing} disabled={!isStarted} />
        {isStarted
          ? isOpen &&
            isCoach && (
              <Button
                onClick={handleCloseTraining}
                disabled={!isStarted || isTrainingClose}
                data-tooltip-id="cancel"
                data-tooltip-content="Закончить тренинг"
                variant={EButtonVariants.Brand}
                className={styles.trainerButton}
              >
                <Cancel />
                <Tooltip id="cancel" />
              </Button>
            )
          : isOpen &&
            isCoach && (
              <Button
                onClick={handleStartTraining}
                data-tooltip-id="start"
                data-tooltip-content="Начать тренинг"
                variant={EButtonVariants.Brand}
                className={classNames(styles.trainerButton, styles.trainerButtonStart)}
              >
                <Start />
                <Tooltip id="start" />
              </Button>
            )}
        {isOpen && isCoach && (
          <>
            <Button
              onClick={newRound}
              disabled={!isStarted || isEnded || isTrainingClose}
              data-tooltip-id="next"
              data-tooltip-content="Начать раунд"
              variant={EButtonVariants.Brand}
              className={styles.trainerButton}
            >
              <Next />
              <Tooltip id="next" />
            </Button>

            <Button
              onClick={handleCopyRoomId}
              disabled={isStarted}
              data-tooltip-id="copy"
              data-tooltip-content="Скопировать код комнаты"
              variant={EButtonVariants.Brand}
              className={styles.trainerButton}
            >
              <Copy />
              <Tooltip id="copy" />
            </Button>
          </>
        )}
        {moreButton && isCoach && (
          <Button
            onClick={openMenu}
            variant={EButtonVariants.Brand}
            className={classNames(styles.menuButton, { [styles.rotate]: isOpen })}
          >
            <More />
          </Button>
        )}
        {isRunning && !isCoach && <p className={styles.time}>{numberToTime(seconds)}</p>}
        <Button
          onClick={sendMessage}
          disabled={!isStarted || !isAllowedToSendMessage}
          data-tooltip-id="send"
          data-tooltip-content="Отправить сообщение"
          variant={EButtonVariants.Brand}
          className={styles.sendButton}
        >
          <Send />
          <Tooltip id="send" />
        </Button>
      </div>
    </>
  );
};

export default SendField;
