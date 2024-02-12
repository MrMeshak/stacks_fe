import { fetchStackById, httpClient } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import StackCard from './stackCard';

export interface IStackCardWithDataProps {
  stackId: string;
}

export default function StackCardWithData({
  stackId,
}: IStackCardWithDataProps) {
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

  return stackData && <StackCard stackData={stackData} />;
}
