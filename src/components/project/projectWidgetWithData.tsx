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

  if (projectsQuery.isLoading) {
    return;
  }

  if (projectsQuery.isError) {
    return;
  }

  const projectsData = projectsQuery.data?.data;

  return (
    projectsData && (
      <ProjectWidget projectId={projectId} projects={projectsData} />
    )
  );
}
