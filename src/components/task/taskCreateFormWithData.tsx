import { fetchStackById } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import TaskCreateForm from './taskCreateForm';

export interface ICreateTaskFormWithDataProps {
  stackId: string;
  onSuccess: () => void;
}

export default function CreateTaskFormWithData({
  stackId,
  onSuccess,
}: ICreateTaskFormWithDataProps) {
  const stackQuery = useQuery({
    queryKey: ['stacks', stackId],
    queryFn: () => fetchStackById(stackId),
  });

  if (stackQuery.isLoading) {
    return;
  }

  if (stackQuery.isError) {
    return;
  }

  const stackData = stackQuery.data?.data;

  return (
    stackData && <TaskCreateForm stackData={stackData} onSuccess={onSuccess} />
  );
}
