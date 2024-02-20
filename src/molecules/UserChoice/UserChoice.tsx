import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { LogoIcon } from 'src/assets/icons';

import styles from './UserChoice.module.scss';

const UserChoice: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={LogoIcon} alt="Logo" />
      </div>
      <h2 className={styles.header}>Выберите тип пользователя</h2>
      <NavLink to="/sign-in-user" className={classNames(styles.navButton, styles.navButtonBrand)}>
        Ученик
      </NavLink>
      <NavLink to="/sign-in-coach" className={classNames(styles.navButton, styles.navButtonTransparent)}>
        Тренер
      </NavLink>
    </div>
  );
};

export default UserChoice;
