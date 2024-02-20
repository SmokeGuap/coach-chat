import axios from 'axios';

import { API_URL } from 'src/constants';
import { refreshToken, storage } from 'src/services/StorageService';

const agent = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

agent.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : 408;
    const url = error.request.responseURL;

    if (status >= 500) {
      window.console.error(error.toString());
    }

    if (url !== `${API_URL}auth/user` && status === 401 && storage.GET('refresh')) {
      refreshToken(storage.GET('refresh')).then(() => {
        error.config.headers['Authorization'] = 'Bearer ' + storage.GET('access');
        return agent.request(error.config);
      });
    }

    return Promise.reject(error);
  }
);

agent.interceptors.request.use(
  (config) => {
    const updConfig = { ...config };

    if (storage.GET('access') && updConfig.headers) {
      updConfig.headers.Authorization = `Bearer ${storage.GET('access')}`;
    }

    if (updConfig.url?.length && !updConfig.url.includes('?') && updConfig.url[updConfig.url.length - 1] !== '/') {
      updConfig.url += '/';
    }

    return updConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default agent;
