import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StackEditFormWithData from './stackEditFormWithData';
import { Dispatch, SetStateAction } from 'react';

export interface IStackEditDialogProps {
  stackId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function StackEditDialog({
  stackId,
  isDialogOpen,
  setIsDialogOpen,
}: IStackEditDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent onPointerDown={(event) => event.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Edit Stack</DialogTitle>
        </DialogHeader>
        <StackEditFormWithData
          stackId={stackId}
          onSuccess={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
