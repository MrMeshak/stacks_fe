import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/axios';
import ProjectTopBarSelect from './projectTopBarSelect';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface IProjectTopBarSelectWithDataProps {
  projectId: string;
}

export default function ProjectTopBarSelectWithData({
  projectId,
}: IProjectTopBarSelectWithDataProps) {
  const navigate = useNavigate();
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  if (projectsQuery.isLoading) {
    return;
  }

  if (projectsQuery.isError) {
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
      <ProjectTopBarSelect projectId={projectId} projects={projectsData} />
    )
  );
}
