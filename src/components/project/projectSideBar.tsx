import { RiAppsFill, RiArrowLeftSLine, RiMenuFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import ProjectListWidgetWithData from './projectListWidgetWithData';
import {
  useProjectPageActions,
  useProjectPageIsSideBarOpen,
} from '@/store/projectPageStore/projectPageStore';
import ProjectCreateDialog from './projectCreateDialog';
import ProjectUserWidgetWithData from './projectUserWidgetWithData';
import { ScrollBar, ScrollArea } from '../ui/scroll-area';

export interface IProjectSideBarProps {
  projectId: string | undefined;
}

export default function ProjectSideBar({ projectId }: IProjectSideBarProps) {
  const isSideBarOpen = useProjectPageIsSideBarOpen();
  const { toggleSideBarOpen } = useProjectPageActions();

  const handleSideBarButton = () => {
    toggleSideBarOpen();
  };

  return (
    <div className="relative  w-full  border-r-[1px] bg-white">
      <div className="flex h-[3.5rem] items-center justify-center gap-2 border-b-[1px]">
        <RiAppsFill className="h-10 w-10 text-slate-900" />
      </div>
      <div className=" flex  w-full flex-col justify-between overflow-x-hidden">
        <ScrollArea className="h-[calc(100vh-7rem)]">
          <div className=" h- w-60 border-b-[1px]">
            <div className="flex items-center justify-between px-4 py-4">
              <h3 className="font-semibold text-primary">Projects</h3>
              <ProjectCreateDialog />
            </div>
            {projectId && <ProjectListWidgetWithData projectId={projectId} />}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <div className="w-full overflow-x-hidden">
        <ProjectUserWidgetWithData />
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
