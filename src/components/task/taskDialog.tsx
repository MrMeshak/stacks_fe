import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import TaskEditFormTextFieldsWithData from './taskEditFormTextFieldsWithData';
import TaskEditControlBar from './taskEditControlBar';
import TaskEditControlBarWithData from './taskEditControlBarWithData';

export interface ITaskDialogProps {
  taskId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function TaskDialog({
  taskId,
  isDialogOpen,
  setIsDialogOpen,
}: ITaskDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="px-0">
        <DialogHeader></DialogHeader>
        <TaskEditFormTextFieldsWithData taskId={taskId} />
        <TaskEditControlBarWithData taskId={taskId} />
      </DialogContent>
    </Dialog>
  );
}
