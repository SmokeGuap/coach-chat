import { FC } from 'react';

import { SignInHeader } from 'src/molecules';
import { SignInUserForm } from 'src/organizms';

import styles from './SignInUserPage.module.scss';

const SignInUserPage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <SignInHeader title="Войти в чат" />
        <SignInUserForm />
      </div>
    </div>
  );
};

export default SignInUserPage;
