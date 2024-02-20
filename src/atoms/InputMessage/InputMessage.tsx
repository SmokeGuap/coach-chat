import { FC } from 'react';

import styles from './InputMessage.module.scss';
import { TInputMessageProps } from './InputMessage.types';

const InputMessage: FC<TInputMessageProps> = (props) => {
  const { ...rest } = props;

  return <input {...rest} className={styles.input} placeholder="Введите сообщение..." />;
};

export default InputMessage;
