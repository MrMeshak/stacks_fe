import { Stack } from '@/axios';
import { RiAddFill, RiSquareFill } from 'react-icons/ri';
import { Button } from '../ui/button';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Card } from '../ui/card';

export interface IStackCardProps {
  stackData: Stack;
}

export default function StackCard({ stackData }: IStackCardProps) {
  return (
    <div className="flex flex-col justify-between">
      <ScrollArea className="w-80">
        <div className=" flex w-full justify-between rounded-sm border-[1px] border-slate-200 bg-white px-2 py-2">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: stackData.color }}
              className="h-3 w-3 rounded-sm text-xs"
            />
            <h4 className="font-semibold">{stackData.title}</h4>
            <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-slate-100 text-xs">
              {stackData.tasks.length}
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <Button variant="ghost" className="h-6 w-6 rounded-sm px-0 py-0">
              <RiAddFill className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </ScrollArea>
      <Button
        variant="secondary"
        size="sm"
        className="w-full justify-start text-muted-foreground"
      >
        <RiAddFill className="h-4 w-4" />
        <p>Add task</p>
      </Button>
    </div>
  );
}
