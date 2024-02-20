import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ArrowBack, Download } from 'src/assets/icons';
import { API_URL, Paths } from 'src/constants';
import { useWindowWidth } from 'src/hooks';
import { storage } from 'src/services/StorageService';

import styles from './ChatClose.module.scss';

const ChatClose: FC = () => {
  const windowWidth = useWindowWidth();

  const isMobile = windowWidth && windowWidth < 1024;
  const link = `${API_URL}rooms/${storage.GET('access')}/report/`;

  return (
    <div className={styles.chatClose}>
      <NavLink to={Paths.createRoom} className={styles.navButton}>
        <img className={styles.arrowBack} src={ArrowBack} alt="Arrow back" /> ВЕРНУТЬСЯ НА ГЛАВНУЮ СТРАНИЦУ
      </NavLink>
      <h2 className={styles.title}>Тренинг окончен</h2>
      <p>Для того чтобы сохранить результаты тренинга, нажмите кнопку «Скачать подробную информацию»</p>
      <div className={styles.download}>
        <a href={link} className={styles.downloadButton}>
          Скачать подробную информацию
        </a>
        <span className={styles.downloadFormat}>{isMobile ? '(.xls)' : 'XLS'}</span>
        <Download className={styles.downloadIcon} />
      </div>
    </div>
  );
};

export default ChatClose;
