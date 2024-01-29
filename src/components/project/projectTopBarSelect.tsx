import { useState } from 'react';
import { Project } from '@/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface IProjectTopBarSelectProps {
  projectId: string;
  projects: Project[];
}

export default function ProjectTopBarSelect({
  projectId,
  projects,
}: IProjectTopBarSelectProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSelect = (projectId: string) => {
    setOpen(false);
    navigate(`/projects/${projectId}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex w-fit items-center justify-between border-none text-lg font-bold shadow-none"
        >
          {projects.find((project) => project.id === projectId)?.title ||
            'Select project...'}
          <span className="ml-2 rounded-sm text-slate-400 ">
            {open ? (
              <RiArrowUpSLine className="h-6 w-6" strokeWidth={2} />
            ) : (
              <RiArrowDownSLine className="h-6 w-6" strokeWidth={2} />
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="mt-4 w-fit p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandGroup>
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                value={project.title}
                onSelect={() => handleSelect(project.id)}
              >
                {project.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
