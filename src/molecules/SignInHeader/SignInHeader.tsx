import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowBack, LogoIcon } from 'src/assets/icons';

import styles from './SignInHeader.module.scss';
import { ISignInHeaderProps } from './SignInHeader.types';

const SignInHeader: FC<ISignInHeaderProps> = (props) => {
  const { title } = props;
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <button onClick={() => navigate('/')} className={styles.arrowBack}>
        <img src={ArrowBack} alt="Arrow back" />
      </button>
      <div className={styles.logo}>
        <img src={LogoIcon} alt="Logo" />
      </div>
      <h2 className={styles.headerTitle}>{title}</h2>
    </header>
  );
};

export default SignInHeader;
