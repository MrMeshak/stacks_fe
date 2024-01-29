import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProjectTopBar from '@/components/project/projectTopBar';

export interface IProjectPageProps {}

export default function ProjectPage(props: IProjectPageProps) {
  const { projectId } = useParams();

  if (!projectId) {
    return;
  }

  return (
    <div>
      <ProjectTopBar projectId={projectId} />
    </div>
  );
}
