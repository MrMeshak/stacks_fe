import { RiAppsFill, RiArrowLeftSLine, RiMenuFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import ProjectWidgetWithData from './projectWidgetWithData';
import {
  useProjectPageActions,
  useProjectPageIsSideBarOpen,
} from '@/store/projectPageStore/projectPageStore';

export interface IProjectSideBarProps {
  projectId: string;
}

export default function ProjectSideBar({ projectId }: IProjectSideBarProps) {
  const isSideBarOpen = useProjectPageIsSideBarOpen();
  const { toggleSideBarOpen } = useProjectPageActions();

  const handleSideBarButton = () => {
    toggleSideBarOpen();
  };

  return (
    <div className="relative w-full border-r-[1px]  bg-white">
      <div className="w-full overflow-hidden">
        <div className="flex h-14 items-center justify-center gap-2 border-b-[1px]">
          <RiAppsFill className="h-10 w-10 text-slate-900" />
        </div>
        <div className=" w-60 border-b-[1px]">
          <ProjectWidgetWithData projectId={projectId} />
        </div>
      </div>

      <Button
        variant={isSideBarOpen ? 'outline' : 'ghost'}
        className={` absolute right-0 top-[1.65rem] z-30 h-9 w-9 -translate-y-1/2 ${isSideBarOpen ? 'translate-x-1/2' : 'translate-x-12'}  px-0 py-0 transition-all`}
        onClick={() => handleSideBarButton()}
      >
        {isSideBarOpen ? (
          <RiArrowLeftSLine className="h-6 w-6 text-muted-foreground" />
        ) : (
          <RiMenuFill className="h-6 w-6 text-muted-foreground " />
        )}
      </Button>
    </div>
  );
}
