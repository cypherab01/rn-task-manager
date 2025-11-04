import { TASK_STATUS } from '@/constants';
import { api } from '@/lib/axios';
import { QUERY_CLIENT } from '@/providers/QueryProvider';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

const deleteTaskMutation = async (taskId: string) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: (taskId: string) => deleteTaskMutation(taskId),
    onSuccess: () => {
      QUERY_CLIENT.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to delete task');
    },
  });
};
