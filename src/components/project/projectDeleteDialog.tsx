import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import ProjectDeleteFormWithData from './projectDeleteFormWithData';

export interface IProjectDeleteDialogProps {
  projectId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectDeleteDialog({
  projectId,
  isDialogOpen,
  setIsDialogOpen,
}: IProjectDeleteDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this project?
          </DialogDescription>
        </DialogHeader>
        <ProjectDeleteFormWithData projectId={projectId} />
      </DialogContent>
    </Dialog>
  );
}
