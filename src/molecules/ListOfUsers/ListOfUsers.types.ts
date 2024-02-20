import React from 'react';

export type TListOfUsersProps = React.DOMAttributes<HTMLDivElement>

export type TUser = {
  user__id: number;
  nickname: string;
};
