import { api } from '@/lib/axios';
import { setToken } from '@/utils/token';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export type LoginInput = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

const loginMutation = async (data: LoginInput): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res as unknown as Promise<LoginResponse>;
};

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginInput): Promise<LoginResponse> => loginMutation(data),
    onSuccess: (data: LoginResponse) => {
      setToken({ name: 'accessToken', value: data.token });
      router.replace('/(tabs)');
    },
    onError: (error) => {
      Alert.alert('Login Failed', 'Failed to login, please check your credentials and try again.');
    },
  });
}
