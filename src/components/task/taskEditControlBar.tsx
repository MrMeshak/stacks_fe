import { Task, httpClient } from '@/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RiCheckLine } from 'react-icons/ri';

export interface ITaskEditControlBarProps {
  taskData: Task;
}

export default function TaskEditControlBar({
  taskData,
}: ITaskEditControlBarProps) {
  const queryClient = useQueryClient();
  const taskCompleteMutation = useMutation({
    mutationFn: async () => {
      await httpClient.patch(`/tasks/${taskData.id}`, {
        completed: !taskData.completed,
      });
    },
    onMutate: () => {
      queryClient.setQueryData(
        ['tasks', taskData.id],
        (taskQueryRes: AxiosResponse<Task> | undefined) => {
          if (!taskQueryRes) return;
          return {
            ...taskQueryRes,
            data: { ...taskQueryRes.data, completed: !taskData.completed },
          };
        },
      );
    },
    onError: async () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', taskData.id],
        exact: true,
      });
    },
  });

  const handleCompleteButton = () => {
    taskCompleteMutation.mutate();
  };

  return (
    <div className="py-3 pl-9 pr-3">
      <button
        onClick={handleCompleteButton}
        className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] ${taskData.completed ? 'border-solid border-green-600 bg-green-600 text-white' : 'border-dotted border-slate-300 text-slate-300 hover:bg-slate-50'}`}
      >
        <RiCheckLine className="h-6 w-6" />
      </button>
    </div>
  );
}
