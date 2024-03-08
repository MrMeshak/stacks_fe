import { useQuery } from '@tanstack/react-query';
import ProjectEditForm from './projectEditForm';
import { fetchProjectById } from '@/axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface IProjectEditFormWithDataProps {
  projectId: string;
  onSuccess: () => void;
}

export default function ProjectEditFormWithData({
  projectId,
  onSuccess,
}: IProjectEditFormWithDataProps) {
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

  return (
    projectData && (
      <ProjectEditForm projectData={projectData} onSuccess={onSuccess} />
    )
  );
}
