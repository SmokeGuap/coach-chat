import { storage } from 'src/services/StorageService';

export const setToken = (tokens: { access: string; refresh: string } | string) => {
  if (typeof tokens === 'string') {
    storage.SET('access', tokens, 'temp');
  } else {
    storage.SET('access', tokens.access, 'temp');
    storage.SET('refresh', tokens.refresh, 'const');
  }
};
export const updateToken = (access: string) => {
  storage.SET('access', access, 'temp');
};
