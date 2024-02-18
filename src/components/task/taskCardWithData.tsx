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
    queryKey: ['stacks', taskId],
    queryFn: async () => {
      return await httpClient.get<Task>(`/tasks/${taskId}`);
    },
    initialData: () => {
      const task = queryClient
        .getQueryData<AxiosResponse<Stack>>(['stacks', stackId])
        ?.data.tasks.find((task) => task.id === taskId);

      return (
        task && {
          data: task,
        }
      );
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['stacks', stackId])?.dataUpdatedAt,
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
