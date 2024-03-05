import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { RiMoreFill, RiDeleteBin7Line } from 'react-icons/ri';

export interface ITaskEditMenuProps {}

export default function TaskEditMenu(props: ITaskEditMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-sm px-0 py-0">
          <RiMoreFill className="h-5 w-5 text-slate-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="flex">
        <DropdownMenuItem>
          <RiDeleteBin7Line className="text-slate-400" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
