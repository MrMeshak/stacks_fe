import { fetchProjects } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectWidget from './projectListWidget';

export interface IProjectListWidgetWithDataProps {
  projectId: string;
}

export default function ProjectListWidgetWithData({
  projectId,
}: IProjectListWidgetWithDataProps) {
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
      <ProjectWidget projectId={projectId} projectsData={projectsData} />
    )
  );
}
