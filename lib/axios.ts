import { getToken, removeTokenAndLogout } from '@/utils/token';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken({ name: 'accessToken' });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Handle network errors (e.g., API not working, no internet)
    if (!error.response) {
      return Promise.reject({
        message: 'Network error: Unable to connect to the server.',
        original: error,
      });
    }

    // Handle unauthorized error
    if (error.response.status === 401) {
      // handle differently for login error
      if (error.config.url === '/auth/login') {
        console.log('error.config.url is login', error.config.url);
        return Promise.reject(error);
      } else {
        await removeTokenAndLogout({ name: 'accessToken' });
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);
