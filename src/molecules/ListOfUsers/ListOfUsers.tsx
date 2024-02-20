import { FC, useEffect, useState } from 'react';

import { Modal, User } from 'src/atoms';
import { useWebSocket } from 'src/context/WebSocketContext/WebSocketContext';
import { useAppDispatch, useAppSelector, useLogOut } from 'src/hooks';
import { addUsers } from 'src/store/slices/chatSlice';

import styles from './ListOfUsers.module.scss';
import { TListOfUsersProps, TUser } from './ListOfUsers.types';
import { formateUserCount } from './ListOfUsers.utils';

const ListOfUsers: FC<TListOfUsersProps> = (props) => {
  const { children, ...rest } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { users, max_students_count: maxStudentCount } = useAppSelector((state) => state.chat.chat);
  const role = useAppSelector((state) => state.user.user.role);

  const { data } = useWebSocket();
  const dispatch = useAppDispatch();
  const logOut = useLogOut();

  const isUser = role === 'student';

  useEffect(() => {
    if (data) {
      if (data.type === 'users_list') dispatch(addUsers(data.users));
      if (data.type === 'student_kick') {
        const userId = data.student_id;
        const user = users.find((user: TUser) => user.user__id === userId);
        if (!user) setIsOpenModal(true);
      }
    }
  }, [data]);

  const handleContinue = () => {
    logOut();
  };

  return (
    <div {...rest} className={styles.list}>
      {isUser && isOpenModal && (
        <Modal
          handleContinue={handleContinue}
          title="Вас удалили"
          text="Коллега, к сожалению, вас удалили из комнаты."
        />
      )}
      <p className={styles.userCount}>{formateUserCount(users.length, maxStudentCount)}</p>
      <div className={styles.users}>
        {users?.map((user: TUser) => (
          <User key={user.user__id} username={user} />
        ))}
      </div>
      {children}
    </div>
  );
};

export default ListOfUsers;
