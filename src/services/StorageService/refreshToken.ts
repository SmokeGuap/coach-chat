import { isAxiosError } from 'axios';

import agent from 'src/agent';
import { updateToken } from 'src/utils';

const refreshToken = async (refreshToken: string) => {
  try {
    const response = await agent.POST('/auth/refresh', { refresh: refreshToken });
    updateToken(response.data.access);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    } else {
      throw new Error('Server error');
    }
  }
};

export default refreshToken;
