export const storage = {
  setItem: (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage Set Error:', error);
    }
  },
  getItem: <T>(key: string): T | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error('LocalStorage Get Error:', error);
      return undefined;
    }
  },
};