import { User, httpClient } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectUserWidget from './projectUserWidget';

export interface IProjectUserWidgetWithDataProps {}

export default function ProjectUserWidgetWithData(
  props: IProjectUserWidgetWithDataProps,
) {
  const meQuery = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => {
      return await httpClient.get<User>('/users/me');
    },
  });

  if (meQuery.isLoading) {
    return;
  }

  if (meQuery.isError) {
    return;
  }

  const userData = meQuery.data?.data;

  return userData && <ProjectUserWidget userData={userData} />;
}
