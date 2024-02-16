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

export interface IStackCreateDialogProps {}

export default function StackCreateDialog(props: IStackCreateDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-100 h-20 w-80 border-2 border-dotted px-2 py-2 text-slate-300 shadow-none"
        >
          <RiAddLine className="h-8 w-8" /> Add a new stack
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Stack</DialogTitle>
        </DialogHeader>
        <StackCreateForm />
      </DialogContent>
    </Dialog>
  );
}
