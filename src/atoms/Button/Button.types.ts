import React from 'react';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: EButtonVariants;
  className?: string;
}

export enum EButtonVariants {
  Brand = 'Brand',
  Transparent = 'Transparent',
}
