import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import ProjectEditFormWithData from './projectEditFormWIthData';

export interface IProjectEditDialogProps {
  projectId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectEditDialog({
  projectId,
  isDialogOpen,
  setIsDialogOpen,
}: IProjectEditDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ProjectEditFormWithData
          projectId={projectId}
          onSuccess={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
