import { api } from '@/lib/axios';
import { QUERY_CLIENT } from '@/providers/QueryProvider';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

type Task = {
  title: string;
  description: string;
  dueDate: Date;
};

const createTaskMutation = async (task: Task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (task: Task) => createTaskMutation(task),
    onSuccess: () => {
      QUERY_CLIENT.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to create task');
    },
  });
};
