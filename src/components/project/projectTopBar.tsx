import { RiAppsFill } from 'react-icons/ri';
import ProjectTopBarSelectWithData from './projectTopBarSelectWithData';

export interface IProjectTopBarProps {
  projectId: string;
}

export default function ProjectTopBar({ projectId }: IProjectTopBarProps) {
  return (
    <div className="absolute left-0 right-0 z-30 border-b-[1px] bg-white">
      <div className="flex items-center gap-2 px-2 py-2">
        <ProjectTopBarSelectWithData projectId={projectId} />
      </div>
      <div></div>
    </div>
  );
}
