import React from 'react';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError?: boolean;
  isShowPasswordButton?: boolean;
  className?: string;
  classNameWrapper?: string;
}
