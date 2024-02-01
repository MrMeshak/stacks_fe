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
    <ScrollArea className="h-[calc(100vh-3.3rem)] w-full bg-slate-50">
      <div className=" flex space-x-4 p-4 ">
        {stacks.map((stack) => (
          <StackCardWithData key={stack.id} stackId={stack.id} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
