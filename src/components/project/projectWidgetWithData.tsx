import { fetchProjects } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectWidget from './projectWidget';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export interface IProjectWidgetWithDataProps {
  projectId: string;
}

export default function ProjectWidgetWithData({
  projectId,
}: IProjectWidgetWithDataProps) {
  const navigate = useNavigate();
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  const { isLoading, isError } = projectsQuery;

  if (isLoading) {
    return;
  }

  if (isError) {
    if (projectsQuery.error instanceof AxiosError) {
      if (projectsQuery.error.response?.status === 403) {
        navigate('/login');
      }
    }
    return;
  }

  const projectsData = projectsQuery.data?.data;

  return (
    projectsData && (
      <ProjectWidget projectId={projectId} projects={projectsData} />
    )
  );
}
