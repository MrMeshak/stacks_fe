import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import TaskEditFormTextFieldsWithData from './taskEditFormTextFieldsWithData';
import TaskEditControlBarWithData from './taskEditControlBarWithData';
import TaskEditMenu from './taskEditMenu';

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
        <DialogHeader className="px-7">
          <TaskEditMenu />
        </DialogHeader>
        <TaskEditFormTextFieldsWithData taskId={taskId} />
        <TaskEditControlBarWithData taskId={taskId} />
      </DialogContent>
    </Dialog>
  );
}
