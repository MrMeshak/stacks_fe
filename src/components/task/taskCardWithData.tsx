import { Task, httpClient } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import TaskCard from './taskCard';

export interface ITaskCardWithDataProps {
  stackId: string;
  taskId: string;
}

export default function TaskCardWithData({ taskId }: ITaskCardWithDataProps) {
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
