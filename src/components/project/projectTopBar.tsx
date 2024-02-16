import { RiMore2Fill } from 'react-icons/ri';
import { useProjectPageIsSideBarOpen } from '@/store/projectPageStore/projectPageStore';
import { Button } from '../ui/button';
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
      className={`flex h-14 items-center justify-between border-b-[1px] bg-white pr-3 ${isSideBarOpen ? 'pl-6' : 'pl-14'}`}
    >
      <ProjectTopBarInfoWithData projectId={projectId} />
      <div className="">
        <ProjectDropDownMenu projectId={projectId} />
        <StackCreateDialog projectId={projectId} />
      </div>
    </div>
  );
}
