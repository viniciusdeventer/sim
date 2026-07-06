import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@app:user';
const TOKEN_KEY = '@app:token';

export const authStorage = {
  async save(user: any, token: string) {
    await Promise.all([
      AsyncStorage.setItem(USER_KEY, JSON.stringify(user)),
      AsyncStorage.setItem(TOKEN_KEY, token),
    ]);
  },

  async getUser() {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  async getToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async clear() {
    await Promise.all([
      AsyncStorage.removeItem(USER_KEY),
      AsyncStorage.removeItem(TOKEN_KEY),
    ]);
  },
};