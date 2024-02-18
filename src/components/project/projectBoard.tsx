import { Project } from '@/axios';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import StackCardWithData from '../stack/stackCardWithData';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

export interface IProjectBoardProps {
  projectData: Project;
}

export default function ProjectBoard({ projectData }: IProjectBoardProps) {
  const { stackOrder } = projectData;

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)] w-full bg-slate-50">
      <div className=" flex h-[calc(100vh-3.5rem)] items-start space-x-4 p-4 ">
        <SortableContext
          items={stackOrder}
          strategy={horizontalListSortingStrategy}
        >
          {stackOrder.map((stackId) => (
            <StackCardWithData key={stackId} stackId={stackId} />
          ))}
        </SortableContext>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
