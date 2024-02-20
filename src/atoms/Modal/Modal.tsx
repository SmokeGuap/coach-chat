import { FC } from 'react';

import styles from './Modal.module.scss';
import { IModalProps } from './Modal.types';

const Modal: FC<IModalProps> = (props) => {
  const { title, text, handleExit, handleContinue } = props;

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttons}>
          {handleExit && (
            <button onClick={handleExit} className={styles.exit} type="button">
              Выйти
            </button>
          )}
          <button onClick={handleContinue} className={styles.continue} type="button">
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
