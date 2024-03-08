import { fetchProjectById } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectBarInfo from './projectTopBarInfo';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface IProjectTopBarInfoWithDataProps {
  projectId: string;
}

export default function ProjectTopBarInfoWithData({
  projectId,
}: IProjectTopBarInfoWithDataProps) {
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
    }
    return;
  }

  const projectData = projectQuery.data?.data;

  return projectData && <ProjectBarInfo projectData={projectData} />;
}
