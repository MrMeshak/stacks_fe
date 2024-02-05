import { fetchProjectById } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectBarInfo from './projectTopBarInfo';

export interface IProjectTopBarInfoWithDataProps {
  projectId: string;
}

export default function ProjectTopBarInfoWithData({
  projectId,
}: IProjectTopBarInfoWithDataProps) {
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

  return projectData && <ProjectBarInfo projectData={projectData} />;
}
