import * as React from 'react';
import {
  RiAddLine,
  RiAppsFill,
  RiArrowLeftSLine,
  RiMenuFill,
} from 'react-icons/ri';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

export interface IProjectSideBarProps {
  isSideBarOpen: boolean;
  handleSideBarButton: () => void;
}

export default function ProjectSideBar({
  isSideBarOpen,
  handleSideBarButton,
}: IProjectSideBarProps) {
  return (
    <div className="relative w-full border-r-[1px]  bg-white">
      <div className="w-full overflow-hidden">
        <div className="flex h-[3.3rem] items-center justify-center gap-2 border-b-[1px]">
          <RiAppsFill className="h-10 w-10 text-slate-900" />
        </div>
        <div className="border-b-[1px] p-4">
          <div className="flex justify-between">
            <h3 className="font-medium leading-none text-slate-300">
              Projects
            </h3>
            <RiAddLine />
          </div>

          <ul className="flex flex-col gap-2 py-4">
            <li>Project</li>
            <li>Project</li>
            <li>Project</li>
            <li>Project</li>
            <li>Project</li>
            <li>Project</li>
            <li>Project</li>
          </ul>
        </div>
      </div>

      <Button
        variant={isSideBarOpen ? 'outline' : 'ghost'}
        className={`absolute right-0 top-[0.7rem] z-30 h-8 w-8 ${isSideBarOpen ? 'translate-x-1/2' : 'translate-x-10'}  px-0 py-0 transition-all`}
        onClick={() => handleSideBarButton()}
      >
        {isSideBarOpen ? (
          <RiArrowLeftSLine className="h-8 w-8 text-muted-foreground" />
        ) : (
          <RiMenuFill
            className="h-6 w-6 text-muted-foreground"
            strokeWidth={1}
          />
        )}
      </Button>
    </div>
  );
}
