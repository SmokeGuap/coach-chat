// export { default as agent } from './agent';

import { AxiosResponse, AxiosRequestConfig } from 'axios';

import agent from './agent';

const timeout = 60000;

export default {
  POST<T = object, R = any>(path: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return agent.post(`${path}/`, data, { timeout, ...config });
  },

  PUT<T = object, R = any>(path: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return agent.put(`${path}/`, data, { timeout, ...config });
  },

  PATCH<T = object, R = any>(path: string, data?: T, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return agent.patch(`${path}/`, data, { timeout, ...config });
  },

  GET<R = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return agent.get(`${path}`, {
      timeout,
      ...config,
    });
  },

  DELETE<R = any>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<R>> {
    return agent.delete(`${path}`, {
      timeout,
      ...config,
    });
  },
};
