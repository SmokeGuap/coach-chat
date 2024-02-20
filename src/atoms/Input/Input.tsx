import classNames from 'classnames';
import { FC, forwardRef, useId, useState } from 'react';

import { CloseEye, OpenEye } from 'src/assets/icons';

import styles from './Input.module.scss';
import { IInputProps } from './Input.types';

const Input: FC<IInputProps> = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { label, isError, isShowPasswordButton, className, classNameWrapper, ...rest } = props;
  const [isPassShown, setIsPassShown] = useState(true);

  const inputId = useId();

  return (
    <div className={classNames(styles.inputWrapper, classNameWrapper)}>
      <label htmlFor={inputId} className={styles.label}>
        {label} <span style={{ color: '#eb5940' }}>*</span>
      </label>
      <input
        ref={ref}
        type={isShowPasswordButton && isPassShown ? 'password' : 'text'}
        {...rest}
        className={classNames(styles.input, { [styles.inputError]: isError }, className)}
        id={inputId}
      />
      {isShowPasswordButton && (
        <button
          type="button"
          className={styles.showPassButton}
          onClick={() => {
            setIsPassShown(!isPassShown);
          }}
        >
          {isPassShown ? <CloseEye /> : <OpenEye />}
        </button>
      )}
    </div>
  );
});

export default Input;
