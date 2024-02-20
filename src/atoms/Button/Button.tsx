import classNames from 'classnames';
import { FC } from 'react';

import styles from './Button.module.scss';
import { IButtonProps } from './Button.types';

const Button: FC<IButtonProps> = (props) => {
  const { children, variant = 'Brand', className, ...rest } = props;

  return (
    <button {...rest} className={classNames(styles.button, styles[`button${variant}`], className)}>
      {children}
    </button>
  );
};

export default Button;
