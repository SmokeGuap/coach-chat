import { FC } from 'react';

import { ChatClose, Header } from 'src/organizms';

import styles from './ChatClosePage.module.scss';

const ChatClosePage: FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <ChatClose />
    </div>
  );
};

export default ChatClosePage;
