import { TASK_STATUS } from '@/constants';
import { api } from '@/lib/axios';
import { QUERY_CLIENT } from '@/providers/QueryProvider';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

const changeTaskStatusMutation = async (taskId: string, status: TASK_STATUS) => {
  const response = await api.patch(`/tasks/${taskId}`, { status });
  return response.data;
};

export const useChangeTaskStatus = () => {
  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TASK_STATUS }) =>
      changeTaskStatusMutation(taskId, status),
    onSuccess: () => {
      QUERY_CLIENT.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      Alert.alert('Error', 'Failed to change task status');
    },
  });
};
