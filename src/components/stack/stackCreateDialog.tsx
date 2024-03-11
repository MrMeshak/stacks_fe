import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { RiAddLine } from 'react-icons/ri';
import StackCreateForm from './stackCreateForm';
import { useState } from 'react';

export interface IStackCreateDialogProps {
  projectId: string;
}

export default function StackCreateDialog({
  projectId,
}: IStackCreateDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-9 w-9 px-0 py-0">
          <RiAddLine className="h-6 w-6" strokeWidth={0.5} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Stack</DialogTitle>
        </DialogHeader>
        <StackCreateForm
          projectId={projectId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
