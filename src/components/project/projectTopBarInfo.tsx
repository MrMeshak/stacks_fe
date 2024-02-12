import { Project } from '@/axios';

export interface IProjectBarInfoProps {
  projectData: Project;
}

export default function ProjectBarInfo({ projectData }: IProjectBarInfoProps) {
  return (
    <div className=" flex min-w-0 items-center">
      <h2 className="truncate px-2 text-xl font-bold">{projectData.title}</h2>
    </div>
  );
}
