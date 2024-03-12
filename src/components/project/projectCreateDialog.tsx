import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '../ui/dialog';
import { RiAddLine } from 'react-icons/ri';
import { Button } from '../ui/button';
import ProjectCreateForm from './projectCreateForm';
import { useState } from 'react';

export interface IProjectCreateDialogProps {}

export default function ProjectCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="h-6 w-6 px-0 py-0">
            <RiAddLine className="h-5 w-5 " />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <ProjectCreateForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
