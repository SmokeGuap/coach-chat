const setTempItem = (name: string, item: string) => {
  sessionStorage.setItem(name, item);
};

const setConstItem = (name: string, item: string) => {
  localStorage.setItem(name, item);
};

export default {
  GET: (name: string) => {
    if (sessionStorage.getItem(name)) {
      const value = sessionStorage.getItem(name);
      if (value) return JSON.parse(value);
      return;
    }
    const value = localStorage.getItem(name);
    if (value) return JSON.parse(value);
    return;
  },
  SET: (name: string, item: string, type: 'const' | 'temp') => {
    const stringifiedItem = JSON.stringify(item);
    if (type === 'const') setConstItem(name, stringifiedItem);
    if (type === 'temp') setTempItem(name, stringifiedItem);
  },
  DELETE: (name: string) => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};
