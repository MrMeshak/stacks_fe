import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/axios';
import ProjectTopBarSelect from './projectTopBarSelect';

export interface IProjectTopBarSelectWithDataProps {
  projectId: string;
}

export default function ProjectTopBarSelectWithData({
  projectId,
}: IProjectTopBarSelectWithDataProps) {
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  if (projectsQuery.isLoading) {
    return;
  }

  if (projectsQuery.isError) {
    console.log(projectsQuery.error.message);
    return;
  }

  const projectsData = projectsQuery.data?.data;

  return (
    projectsData && (
      <ProjectTopBarSelect projectId={projectId} projects={projectsData} />
    )
  );
}
