import { MouseEvent } from 'react';
import { Task, httpClient } from '@/axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RiCheckLine } from 'react-icons/ri';

export interface ITaskControlBarProps {
  taskData: Task;
}

export default function TaskControlBar({ taskData }: ITaskControlBarProps) {
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

  const handleCompleteButton = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    taskCompleteMutation.mutate();
  };

  return (
    <div className="px-3 py-3">
      <button
        onClick={handleCompleteButton}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${taskData.completed ? 'border-solid border-green-600 bg-green-600 text-white' : 'border-dotted border-slate-300 text-slate-300 hover:bg-slate-50'}`}
      >
        <RiCheckLine />
      </button>
    </div>
  );
}
