import { Task } from '@/axios';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface ITaskCardProps {
  taskData: Task;
}

export default function TaskCard({ taskData }: ITaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskData.id,
    data: { type: 'Task', taskData },
    animateLayoutChanges: () => false,
  });

  const style = {
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return <div id={`task-place-holder`}>Dragging</div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 rounded-sm border-[1px] bg-white"
    >
      <div>
        <h3 className="p-3">{taskData.title}</h3>
        <p>{taskData.id}</p>
      </div>
      <div className="p-3 text-sm font-light">
        <p>{taskData.description}</p>
      </div>
    </div>
  );
}
