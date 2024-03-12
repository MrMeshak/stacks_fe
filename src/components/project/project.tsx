import { useNavigate } from 'react-router-dom';
import ProjectBoardWithData from './projectBoardWithData';
import ProjectDndProvider from './projectDndProvider';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, Project } from '@/axios';

export interface IProjectProps {
  projectId: string | undefined;
}

export default function Project({ projectId }: IProjectProps) {
  const navigate = useNavigate();
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: () => fetchProjects(),
  });

  useEffect(() => {
    const projects = projectsQuery.data?.data;
    if (
      !projectId &&
      projectsQuery.isSuccess &&
      projects &&
      projects.length !== 0
    ) {
      navigate(projects[0].id);
    }
  }, [projectsQuery]);

  return (
    projectId && (
      <ProjectDndProvider projectId={projectId}>
        <ProjectBoardWithData projectId={projectId} />
      </ProjectDndProvider>
    )
  );
}
