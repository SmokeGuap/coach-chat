import { isAxiosError } from 'axios';
import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from 'src/atoms';
import { EButtonVariants } from 'src/atoms/Button/Button.types';
import { Paths } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { signInUser } from 'src/services/UserService';
import { getUserInfo } from 'src/store/slices/userActions';
import { setToken } from 'src/utils';

import styles from './SignInUserForm.module.scss';
import { ISignInUserFormValues } from './SignInUserForm.types';

const SignInUserForm: FC = () => {
  const [errorText, setErrorText] = useState({ uuid: [], nickname: [] });
  const roomId = useAppSelector((state) => state.user.user.room_uuid);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<ISignInUserFormValues>();

  const watchAllInputs = watch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignInUserFormValues) => {
    try {
      const response = await signInUser(data);
      setToken(response.token);
      dispatch(getUserInfo());
      navigate(`${Paths.room}/${roomId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorText(error.response?.data);
      }
    }
  };

  return (
    <>
      {errorText.nickname?.length > 0 &&
        errorText.nickname.map((item, index) => (
          <span key={index} className={styles.error}>
            {item}
          </span>
        ))}
      {errorText.uuid?.length > 0 &&
        errorText.uuid.map((item, index) => (
          <span key={index} className={styles.error}>
            {item}
          </span>
        ))}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Имя Фамилия"
          placeholder="Александр Александров"
          isError={!!errors.nickname}
          {...register('nickname', { required: true })}
          className={watchAllInputs.nickname && styles.isFilled}
        />
        <Input
          label="ID"
          placeholder="123"
          isError={!!errors.uuid}
          {...register('uuid', { required: true })}
          className={watchAllInputs.uuid && styles.isFilled}
          isShowPasswordButton
        />
        <Button disabled={!isDirty || !isValid} variant={EButtonVariants.Brand} type="submit">
          Войти
        </Button>
      </form>
    </>
  );
};

export default SignInUserForm;
