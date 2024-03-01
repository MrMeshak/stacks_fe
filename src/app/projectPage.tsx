import { useParams } from 'react-router-dom';
import ProjectTopBar from '@/components/project/projectTopBar';
import ProjectBoardWithData from '@/components/project/projectBoardWithData';
import ProjectSideBar from '@/components/project/projectSideBar';
import { useProjectPageIsSideBarOpen } from '@/store/projectPageStore/projectPageStore';
import ProjectDndProvider from '@/components/project/projectDndProvider';

export interface IProjectPageProps {}

export default function ProjectPage(props: IProjectPageProps) {
  const { projectId } = useParams();
  const isSideBarOpen = useProjectPageIsSideBarOpen();

  if (!projectId) {
    return;
  }

  return (
    <div className="">
      <div
        className={`grid ${isSideBarOpen ? 'grid-cols-[minmax(15rem,15rem)_minmax(0,_10fr)]' : 'grid-cols-[minmax(0rem,0rem)_minmax(0,_10fr)]'} transition-all`}
      >
        <ProjectSideBar projectId={projectId} />
        <div>
          <ProjectTopBar projectId={projectId} />
          <ProjectDndProvider projectId={projectId}>
            <ProjectBoardWithData projectId={projectId} />
          </ProjectDndProvider>
        </div>
      </div>
    </div>
  );
}
