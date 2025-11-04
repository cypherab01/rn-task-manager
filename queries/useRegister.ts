import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = {
  user: {
    id: string;
    email: string;
  };
};

const registerMutation = async (data: RegisterInput): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>('/auth/register', data);
  return res as unknown as Promise<RegisterResponse>;
};

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterInput): Promise<RegisterResponse> => registerMutation(data),

    onSuccess: (data: RegisterResponse) => {
      Alert.alert('Register Successful', 'You can now login to your account.', [
        {
          text: 'OK',
          onPress: () => router.replace('/login'),
        },
      ]);
    },

    onError: (error) => {
      Alert.alert(
        'Register Failed',
        'Failed to register, please check your credentials and try again.'
      );
    },
  });
}
