export interface IUserProps {
  username: User;
}

type User = {
  user__id: number;
  nickname: string;
};
