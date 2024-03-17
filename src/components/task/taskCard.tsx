import { Task } from '@/axios';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskControlBar from './taskControlBar';
import TaskDialog from './taskDialog';
import { useState } from 'react';

export interface ITaskCardProps {
  taskData: Task;
}

export default function TaskCard({ taskData }: ITaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="mb-4 rounded-sm border-[1px] opacity-0"
      >
        <div className="p-3">
          <h3 className=" font text-wrap font-medium">{taskData.title}</h3>
        </div>
        <div className="p-3 text-sm font-light">
          <p className="whitespace-normal text-wrap font-light text-slate-400">
            {taskData.description}
          </p>
        </div>
        <TaskControlBar taskData={taskData} />
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`mb-4 touch-none rounded-sm border-[1px] bg-white ${taskData.completed ? 'border-green-700' : ''} `}
      >
        <div className="p-3">
          <h3 className=" font text-wrap font-medium">{taskData.title}</h3>
        </div>
        <div className="p-3 text-sm font-light">
          <p className="whitespace-normal text-wrap font-light text-slate-400">
            {taskData.description}
          </p>
        </div>
        <TaskControlBar taskData={taskData} />
      </div>
      <TaskDialog
        taskId={taskData.id}
        stackId={taskData.stackId}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
}
