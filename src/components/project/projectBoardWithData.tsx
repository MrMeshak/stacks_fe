import { Project, fetchProjectById } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectBoard from './projectBoard';
import { AxiosError, AxiosResponse } from 'axios';
import ProjectBoardNotFound from './projectBoardNotFound';
import { useNavigate } from 'react-router-dom';

export interface IProjectBoardProps {
  projectId: string;
}

export default function ProjectBoardWithData({
  projectId,
}: IProjectBoardProps) {
  const navigate = useNavigate();
  const projectQuery = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => fetchProjectById(projectId),
  });

  if (projectQuery.isLoading) {
    return;
  }

  if (projectQuery.isError) {
    if (projectQuery.error instanceof AxiosError) {
      if (projectQuery.error.response?.status === 403) {
        navigate('/login');
      }
      if (projectQuery.error.response?.status === 404) {
        return <ProjectBoardNotFound />;
      }
    }

    return;
  }

  const projectData = projectQuery.data?.data;
  return projectData && <ProjectBoard projectData={projectData} />;
}
