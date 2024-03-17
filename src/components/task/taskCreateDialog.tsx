import { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '../ui/dialog';
import CreateTaskFormWithData from './taskCreateFormWithData';

export interface ITaskCreateDialogProps {
  stackId: string;
}

export default function TaskCreateDialog({ stackId }: ITaskCreateDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 rounded-sm px-0 py-0">
          <RiAddFill className="h-5 w-5 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent onPointerDown={(event) => event.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <CreateTaskFormWithData
          stackId={stackId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
