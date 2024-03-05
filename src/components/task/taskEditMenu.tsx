import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { RiMoreFill, RiDeleteBin7Line } from 'react-icons/ri';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/axios';

export interface ITaskEditMenuProps {
  stackId: string;
  taskId: string;
}

export default function TaskEditMenu({ taskId, stackId }: ITaskEditMenuProps) {
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await httpClient.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', taskId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['stacks', stackId],
        exact: true,
      });
    },
  });

  const handleDelete = () => {
    deleteTaskMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-sm px-0 py-0">
          <RiMoreFill className="h-5 w-5 text-slate-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="flex">
        <DropdownMenuItem onClick={handleDelete}>
          <RiDeleteBin7Line className="text-slate-400" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
