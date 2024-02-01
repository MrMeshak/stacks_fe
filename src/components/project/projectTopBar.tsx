import { RiAppsFill } from 'react-icons/ri';
import ProjectTopBarSelectWithData from './projectTopBarSelectWithData';

export interface IProjectTopBarProps {
  projectId: string;
  isSideBarOpen: boolean;
}

export default function ProjectTopBar({
  projectId,
  isSideBarOpen,
}: IProjectTopBarProps) {
  return (
    <div className="  border-b-[1px] bg-white ">
      <div
        className={`flex items-center gap-2 py-2 ${isSideBarOpen ? 'pl-4' : 'pl-10'}`}
      >
        <ProjectTopBarSelectWithData projectId={projectId} />
      </div>
      <div></div>
    </div>
  );
}
