import { fetchProjects } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectWidget from './projectWidget';

export interface IProjectWidgetWithDataProps {
  projectId: string;
}

export default function ProjectWidgetWithData({
  projectId,
}: IProjectWidgetWithDataProps) {
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  const { isLoading, isError } = projectsQuery;

  if (isLoading) {
    return;
  }

  if (isError) {
    return;
  }

  const projectsData = projectsQuery.data?.data;

  return (
    projectsData && (
      <ProjectWidget projectId={projectId} projects={projectsData} />
    )
  );
}
