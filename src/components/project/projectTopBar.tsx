import { useProjectPageIsSideBarOpen } from '@/store/projectPageStore/projectPageStore';
import ProjectTopBarInfoWithData from './projectTopBarInfoWithData';
import ProjectDropDownMenu from './projectDropdownMenu';
import StackCreateDialog from '../stack/stackCreateDialog';

export interface IProjectTopBarProps {
  projectId: string;
}

export default function ProjectTopBar({ projectId }: IProjectTopBarProps) {
  const isSideBarOpen = useProjectPageIsSideBarOpen();

  return (
    <div
      className={`flex h-14 flex-row-reverse items-center justify-between border-b-[1px] bg-white pr-3 ${isSideBarOpen ? 'pl-6' : 'pl-14'}`}
    >
      <div className="flex">
        <ProjectDropDownMenu projectId={projectId} />
        <StackCreateDialog projectId={projectId} />
      </div>
      <ProjectTopBarInfoWithData projectId={projectId} />
    </div>
  );
}
