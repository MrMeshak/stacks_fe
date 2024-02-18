import { fetchStackById } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import StackEditForm from './stackEditForm';

export interface IStackEditFormWithDataProps {
  stackId: string;
  onSuccess: () => void;
}

export default function StackEditFormWithData({
  stackId,
  onSuccess,
}: IStackEditFormWithDataProps) {
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
    stackData && <StackEditForm stackData={stackData} onSuccess={onSuccess} />
  );
}
