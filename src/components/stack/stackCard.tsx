import { Stack } from '@/axios';
import { RiAddFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="w-80"></div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-80 flex-col justify-between"
    >
      <div {...attributes} {...listeners} className="w-full">
        <div className=" flex w-full justify-between rounded-sm border-[1px] border-slate-200 bg-white px-2 py-2">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: stackData.color }}
              className="h-3 w-3 rounded-sm text-xs"
            />
            <h4 className="font-semibold">{stackData.title}</h4>
            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-slate-100 text-xs">
              {stackData.tasks.length}
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <Button variant="ghost" className="h-6 w-6 rounded-sm px-0 py-0">
              <RiAddFill className="h-5 w-5 text-primary" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="h-full">
        <div>{stackData.id}</div>
        <div>Task 1</div>
        <div>Task 2</div>
      </ScrollArea>
    </div>
  );
}
