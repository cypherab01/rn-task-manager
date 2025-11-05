import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export const setToken = async ({ name, value }: { name: string; value: string }): Promise<void> => {
  return await SecureStore.setItemAsync(name, value);
};

export const getToken = async ({ name }: { name: string }): Promise<string | null> => {
  return await SecureStore.getItemAsync(name);
};

export const removeTokenAndLogout = async ({ name }: { name: string }) => {
  await SecureStore.deleteItemAsync(name);
  return router.replace('/login');
};
