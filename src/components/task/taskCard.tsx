import { Task } from '@/axios';

export interface ITaskCardProps {
  taskData: Task;
}

export default function TaskCard({ taskData }: ITaskCardProps) {
  return (
    <div className="mb-4 rounded-sm border-[1px] bg-white">
      <div>
        <h3 className="p-3">{taskData.title}</h3>
      </div>
      <div className="p-3 text-sm font-light">
        <p>{taskData.description}</p>
      </div>
    </div>
  );
}
