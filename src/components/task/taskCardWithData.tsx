import { Stack, Task, httpClient } from '@/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TaskCard from './taskCard';
import { AxiosResponse } from 'axios';

export interface ITaskCardWithDataProps {
  stackId: string;
  taskId: string;
}

export default function TaskCardWithData({
  taskId,
  stackId,
}: ITaskCardWithDataProps) {
  const queryClient = useQueryClient();
  const taskQuery = useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      return await httpClient.get<Task>(`/tasks/${taskId}`);
    },
  });

  if (taskQuery.isLoading) {
    return;
  }

  if (taskQuery.isError) {
    return;
  }
  const taskData = taskQuery.data?.data;
  return taskData && <TaskCard taskData={taskData} />;
}
