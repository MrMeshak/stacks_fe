import { Task, httpClient } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import TaskEditControlBar from './taskEditControlBar';

export interface ITaskEditControlBarWithDataProps {
  taskId: string;
}

export default function TaskEditControlBarWithData({
  taskId,
}: ITaskEditControlBarWithDataProps) {
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

  return taskData && <TaskEditControlBar taskData={taskData} />;
}
