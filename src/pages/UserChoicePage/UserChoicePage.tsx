import { FC } from 'react';

import { UserChoice } from 'src/molecules';

import styles from './UserChoicePage.module.scss';

const UserChoicePage: FC = () => {
  return (
    <div className={styles.container}>
      <UserChoice />
    </div>
  );
};

export default UserChoicePage;
