export interface IAuthRequestBodyUser {
  nickname: string;
  uuid: string;
}

export interface IAuthRequestBodyCoach {
  username: string;
  password: string;
}

export interface ITokenObtainCoach {
  username: string;
  role: string;
  tokens: TCoachToken;
  error: TErrorCoach;
}

export interface ITokenObtainUser {
  username: string;
  role: string;
  token: TUserToken;
  error: TErrorUser;
}

type TErrorUser = {
  uuid: [];
  nickname: [];
};

type TErrorCoach = {
  detail: string;
};

type TUserToken = string;
type TCoachToken = { access: string; refresh: string };
