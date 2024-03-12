import { useEffect } from 'react';

export interface IProjectBoardNotFoundProps {}

export default function ProjectBoardNotFound() {
  useEffect(() => {}, []);
  return (
    <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center p-6">
        <h3 className="text-2xl text-slate-300">Project Not Found</h3>
        <p className="text-slate-300">
          Sorry, this project could not be found please select another project
        </p>
      </div>
    </div>
  );
}
