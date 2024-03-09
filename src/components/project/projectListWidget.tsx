import { Project } from '@/axios';
import { Link } from 'react-router-dom';

export interface IProjectListWidgetProps {
  projectId: string;
  projectsData: Project[];
}

export default function ProjectListWidget({
  projectId,
  projectsData,
}: IProjectListWidgetProps) {
  return (
    <div className="w-full px-4 py-2">
      <ul>
        {projectsData.map((project) => (
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
