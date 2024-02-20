import React from 'react';

export interface IWebSocketContextProps extends React.DOMAttributes<HTMLDivElement> {
  roomId: string;
  token: string;
}

export interface IWebSocketContext {
  socket: WebSocket | null;
  data: TWebSocketData;
  isReady: boolean;
}

export type TWebSocketData = {
  current_round: number;
  is_allowed_to_send_message: null;
  max_round_time: number;
  max_rounds_count: number;
  max_students_count: number;
  messages: TMessage[];
  training_start_status: string;
  type: string;
  users: TUser[];
  student_id?: number;
  message?: TMessage;
  results?: TResultOfUser[];
};

type TUser = {
  nickname: string;
  user__id: number;
};

export type TMessage = {
  created_at: string;
  id: number;
  is_locked: boolean;
  is_selected: boolean;
  role: 'trainer' | 'student';
  text: string;
  username: string;
};

export type TResultOfUser = {
  nickname: string;
  place: number;
  points: number;
};
