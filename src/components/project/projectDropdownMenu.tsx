import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { RiMore2Fill } from 'react-icons/ri';
import ProjectDeleteModal from './projectDeleteDialog';
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
            <RiMore2Fill className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-1 my-2">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
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
