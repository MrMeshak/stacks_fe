import { fetchProject } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import ProjectBoard from './projectBoard';

export interface IProjectBoardProps {
  projectId: string;
}

export default function ProjectBoardWithData({
  projectId,
}: IProjectBoardProps) {
  const projectQuery = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => fetchProject(projectId),
  });

  if (projectQuery.isLoading) {
    return;
  }

  if (projectQuery.isError) {
    return;
  }

  const projectData = projectQuery.data?.data;

  return projectData && <ProjectBoard stacks={projectData.stacks} />;
}
