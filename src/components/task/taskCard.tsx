import { Task } from '@/axios';

export interface ITaskCardProps {
  taskData: Task;
}

export default function TaskCard({ taskData }: ITaskCardProps) {
  return (
    <div className="rounded-sm border-[1px] bg-white p-3">
      <div>
        <h3>{taskData.title}</h3>
      </div>
    </div>
  );
}
