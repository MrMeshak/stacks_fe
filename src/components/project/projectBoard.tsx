import { Project } from '@/axios';
import StackCardWithData from '../stack/stackCardWithData';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import ProjectTopBar from './projectTopBar';

export interface IProjectBoardProps {
  projectData: Project;
}

export default function ProjectBoard({ projectData }: IProjectBoardProps) {
  const stacks = projectData.stacks;

  return (
    <div className="">
      <ScrollArea className="h-80 h-screen bg-slate-50">
        <div className=" flex h-screen  space-x-4  p-4 pt-[4rem]">
          {stacks.map((stack) => (
            <StackCardWithData key={stack.id} stackId={stack.id} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
