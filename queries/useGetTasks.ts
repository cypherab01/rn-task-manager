import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response as unknown as Task[];
};

export const useGetTasks = () => {
  return useQuery({ queryKey: ['tasks'], queryFn: getTasks });
};
