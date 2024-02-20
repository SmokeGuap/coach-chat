import { isAxiosError } from 'axios';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, Input } from 'src/atoms';
import { EButtonVariants } from 'src/atoms/Button/Button.types';
import { Paths } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { signInCoach } from 'src/services/UserService';
import { getUserInfo } from 'src/store/slices/userActions';
import { setToken } from 'src/utils';

import styles from './SignInCoachForm.module.scss';
import { ISignInCoachFormValues } from './SignInCoachForm.types';

const SignInCoachForm: FC = () => {
  const [errorText, setErrorText] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<ISignInCoachFormValues>();

  const watchAllInputs = watch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignInCoachFormValues) => {
    try {
      const response = await signInCoach(data);
      setToken(response.tokens);
      dispatch(getUserInfo());
      navigate(Paths.createRoom);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorText(error.response?.data.detail);
      }
    }
  };

  return (
    <>
      {errorText && <span className={styles.error}>{errorText}</span>}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Логин"
          placeholder="Login"
          isError={!!errors.username}
          {...register('username', { required: true })}
          className={watchAllInputs.username && styles.isFilled}
        />
        <Input
          label="Пароль"
          placeholder="***"
          isError={!!errors.password}
          {...register('password', { required: true })}
          className={watchAllInputs.password && styles.isFilled}
          isShowPasswordButton
        />
        <Button disabled={!isDirty || !isValid} variant={EButtonVariants.Brand} type="submit">
          Войти
        </Button>
      </form>
    </>
  );
};

export default SignInCoachForm;
