import { useQuery } from '@tanstack/react-query';
import ProjectEditForm from './projectEditForm';
import { fetchProjectById } from '@/axios';

export interface IProjectEditFormWithDataProps {
  projectId: string;
  onSuccess: () => void;
}

export default function ProjectEditFormWithData({
  projectId,
  onSuccess,
}: IProjectEditFormWithDataProps) {
  const projectQuery = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => fetchProjectById(projectId),
  });

  if (projectQuery.isLoading) {
    return;
  }

  if (projectQuery.isError) {
    return;
  }

  const projectData = projectQuery.data?.data;

  return (
    projectData && (
      <ProjectEditForm projectData={projectData} onSuccess={onSuccess} />
    )
  );
}
