import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { RiDeleteBin7Line, RiEdit2Line, RiMore2Fill } from 'react-icons/ri';
import { useState } from 'react';
import StackDeleteDialog from './stackDeleteDialog';
import StackEditDialog from './stackEditDialog';

export interface IStackDropdownMenuProps {
  stackId: string;
  projectId: string;
}

export default function StackDropdownMenu({
  stackId,
  projectId,
}: IStackDropdownMenuProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-6 w-6 rounded-sm px-0 py-0">
            <RiMore2Fill className="h-5 w-5 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-1 my-2">
          <DropdownMenuItem
            onClick={() => setIsEditDialogOpen(true)}
            className="w-fit"
          >
            <RiEdit2Line className="h-4 w-4 text-slate-400" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="w-fit"
          >
            <RiDeleteBin7Line className="h-4 w-4 text-slate-400" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StackEditDialog
        stackId={stackId}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />

      <StackDeleteDialog
        stackId={stackId}
        projectId={projectId}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
