import { useQuery } from '@tanstack/react-query';
import { fetchProjectById } from '@/axios';
import ProjectDeleteForm from './projectDeleteForm';

export interface IProjectDeleteFormWithDataProps {
  projectId: string;
}

export default function ProjectDeleteFormWithData({
  projectId,
}: IProjectDeleteFormWithDataProps) {
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

  return projectData && <ProjectDeleteForm projectData={projectData} />;
}
