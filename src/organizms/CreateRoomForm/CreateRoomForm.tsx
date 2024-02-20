import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from 'src/atoms';
import { EButtonVariants } from 'src/atoms/Button/Button.types';
import { Paths } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setRoom } from 'src/store/slices/roomActions';
import { getUserInfo } from 'src/store/slices/userActions';

import styles from './CreateRoomForm.module.scss';
import { ICreateRoomFormValues } from './CreateRoomForm.types';

const CreateRoomForm: FC = () => {
  const createError = useAppSelector((state) => state.room.error);
  const roomId = useAppSelector((state) => state.room.room.connection_uuid);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateRoomFormValues>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: ICreateRoomFormValues) => {
    try {
      await dispatch(setRoom(data));
      dispatch(getUserInfo());
      navigate(`${Paths.room}/${roomId}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {createError.non_field_errors?.length > 0 &&
        createError.non_field_errors.map((item, index) => (
          <span key={index} className={styles.error}>
            {item}
          </span>
        ))}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="number"
          isError={!!errors.userCount}
          {...register('userCount', { required: true, min: 2, max: 15 })}
          label="Количество человек в комнате"
          className={styles.createRoomInput}
          classNameWrapper={styles.createRoomWrapper}
        />
        <Input
          type="number"
          isError={!!errors.time}
          {...register('time', { required: true, min: 15, max: 60 })}
          label="Время на ответ (сек)"
          className={styles.createRoomInput}
          classNameWrapper={styles.createRoomWrapper}
        />
        <Input
          type="number"
          isError={!!errors.rounds}
          {...register('rounds', { required: true, min: 2 })}
          label="Количество раундов"
          className={styles.createRoomInput}
          classNameWrapper={styles.createRoomWrapper}
        />
        <Button type="submit" variant={EButtonVariants.Brand}>
          Создать
        </Button>
      </form>
    </>
  );
};

export default CreateRoomForm;
