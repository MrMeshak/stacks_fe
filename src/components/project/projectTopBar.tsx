import { RiAppsFill } from 'react-icons/ri';
import ProjectTopBarSelectWithData from './projectTopBarSelectWithData';

export interface IProjectTopBarProps {
  projectId: string;
}

export default function ProjectTopBar({ projectId }: IProjectTopBarProps) {
  return (
    <div className="shadow-md">
      <div className="flex items-center gap-2 px-2 py-2">
        <RiAppsFill className="h-10 w-10" />
        <ProjectTopBarSelectWithData projectId={projectId} />
      </div>
      <div></div>
    </div>
  );
}
