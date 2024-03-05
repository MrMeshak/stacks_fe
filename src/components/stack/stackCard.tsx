import { Stack } from '@/axios';
import { RiAddFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import StackDropdownMenu from './stackDropdownMenu';
import TaskCardWithData from '../task/taskCardWithData';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import TaskCreateDialog from '../task/taskCreateDialog';

export interface IStackCardProps {
  stackData: Stack;
}

export default function StackCard({ stackData }: IStackCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: stackData.id,
    data: {
      type: 'Stack',
      stackData,
    },
    animateLayoutChanges: () => false,
  });

  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="w-80"></div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-80 flex-col justify-between"
    >
      <div {...attributes} {...listeners} className="mb-4 w-full">
        <div className=" flex w-full justify-between rounded-sm border-[1px] border-slate-200 bg-white px-2 py-2">
          <div className="flex min-w-0 items-center gap-3">
            <div
              style={{ backgroundColor: stackData.color }}
              className="h-3 w-3 min-w-3 rounded-sm text-xs"
            />
            <h4 className="truncate font-semibold">{stackData.title}</h4>
            <div className="flex h-5 w-5 min-w-5 items-center justify-center rounded-sm bg-slate-100 text-xs">
              {stackData.taskOrder.length}
            </div>
          </div>

          <div className=" flex items-center justify-center">
            <StackDropdownMenu
              stackId={stackData.id}
              projectId={stackData.projectId}
            />
            <TaskCreateDialog stackId={stackData.id} />
          </div>
        </div>
      </div>

      <ScrollArea className=" h-[calc(100vh-9rem)]">
        <SortableContext
          items={stackData.taskOrder}
          strategy={verticalListSortingStrategy}
        >
          {stackData.taskOrder.map((taskId) => (
            <TaskCardWithData
              key={taskId}
              taskId={taskId}
              stackId={stackData.id}
            />
          ))}

          <ScrollBar orientation="vertical" />
        </SortableContext>
      </ScrollArea>
    </div>
  );
}
