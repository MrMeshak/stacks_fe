import { fetchProjectById } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import ProjectBoard from './projectBoard';
import ProjectDndProvider from './projectDndProvider';

export interface IProjectBoardProps {
  projectId: string;
}

export default function ProjectBoardWithData({
  projectId,
}: IProjectBoardProps) {
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

  return projectData && <ProjectBoard projectData={projectData} />;
}
