import { useParams } from 'react-router-dom';
import ProjectTopBar from '@/components/project/projectTopBar';
import ProjectSideBar from '@/components/project/projectSideBar';
import { useProjectPageIsSideBarOpen } from '@/store/projectPageStore/projectPageStore';
import Project from '@/components/project/project';

export interface IProjectPageProps {}

export default function ProjectPage() {
  const { projectId } = useParams();
  const isSideBarOpen = useProjectPageIsSideBarOpen();

  return (
    <div className="">
      <div
        className={`grid ${isSideBarOpen ? 'grid-cols-[minmax(15rem,15rem)_minmax(0,_10fr)]' : 'grid-cols-[minmax(0rem,0rem)_minmax(0,_10fr)]'} transition-all`}
      >
        <ProjectSideBar projectId={projectId} />
        <div>
          <ProjectTopBar projectId={projectId} />
          <Project projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
