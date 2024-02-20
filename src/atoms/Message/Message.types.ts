import { ReactNode } from 'react';

export interface IMessageProps {
  username: string;
  text: ReactNode;
  createdAt: string | number;
  isSelected: boolean;
  isLocked: boolean;
  isTrainerMessage?: boolean;
  messageId?: number;
}
