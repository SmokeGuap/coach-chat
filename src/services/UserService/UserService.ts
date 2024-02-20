import { isAxiosError } from 'axios';

import agent from 'src/agent';

import { IAuthRequestBodyUser, IAuthRequestBodyCoach, ITokenObtainUser, ITokenObtainCoach } from './UserService.types';

export const signInUser = async (authBody: IAuthRequestBodyUser): Promise<ITokenObtainUser> => {
  try {
    const response = await agent.POST<IAuthRequestBodyUser, ITokenObtainUser>('/auth/student', authBody);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Server error');
    }
  }
};

export const signInCoach = async (authBody: IAuthRequestBodyCoach): Promise<ITokenObtainCoach> => {
  try {
    const response = await agent.POST<IAuthRequestBodyCoach, ITokenObtainCoach>('auth/trainer', authBody);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Server error');
    }
  }
};
