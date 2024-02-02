import { Project } from '@/axios';
import { Button } from '../ui/button';
import { RiAddLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export interface IProjectWidgetProps {
  projectId: string;
  projects: Project[];
}

export default function ProjectWidget({
  projectId,
  projects,
}: IProjectWidgetProps) {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between pb-4">
        <h3 className="font-semibold text-slate-300">Projects</h3>
        <Button variant="ghost" className="h-6 w-6 px-0 py-0">
          <RiAddLine className="h-5 w-5 text-slate-300" />
        </Button>
      </div>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={`rounded-sm  px-3 py-2 pb-2 font-light ${project.id === projectId ? ' bg-slate-100  text-slate-400' : 'text-slate-300'}`}
          >
            <Link
              className="transition-colors hover:text-slate-400"
              to={`/projects/${project.id}`}
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
