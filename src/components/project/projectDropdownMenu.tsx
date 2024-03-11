import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { RiDeleteBin7Line, RiEdit2Line, RiMore2Fill } from 'react-icons/ri';
import { useState } from 'react';
import ProjectDeleteDialog from './projectDeleteDialog';
import ProjectEditDialog from './projectEditDialog';

export interface IProjectDropDownMenuProps {
  projectId: string;
}

export default function ProjectDropDownMenu({
  projectId,
}: IProjectDropDownMenuProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" h-9 w-9 px-0 py-0">
            <RiMore2Fill className="h-6 w-6 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-1 my-2">
          <DropdownMenuItem
            onClick={() => setIsEditDialogOpen(true)}
            className="w-fit "
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
      <ProjectDeleteDialog
        projectId={projectId}
        isDialogOpen={isDeleteDialogOpen}
        setIsDialogOpen={setIsDeleteDialogOpen}
      />
      <ProjectEditDialog
        projectId={projectId}
        isDialogOpen={isEditDialogOpen}
        setIsDialogOpen={setIsEditDialogOpen}
      />
    </>
  );
}
