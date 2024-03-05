import { Task, httpClient } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import TaskEditFormTextFields from './taskEditFormTextFields';

export interface ITaskEditFormTextFieldsWithDataProps {
  taskId: string;
}

export default function TaskEditFormTextFieldsWithData({
  taskId,
}: ITaskEditFormTextFieldsWithDataProps) {
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

  return taskData && <TaskEditFormTextFields taskData={taskData} />;
}
