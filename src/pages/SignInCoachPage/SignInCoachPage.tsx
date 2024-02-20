import { FC } from 'react';

import { SignInHeader } from 'src/molecules';
import { SignInCoachForm } from 'src/organizms';

import styles from './SignInCoachPage.module.scss';

const SignInCoachPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <SignInHeader title="Войти в личный кабинет" />
        <SignInCoachForm />
      </div>
    </div>
  );
};

export default SignInCoachPage;
