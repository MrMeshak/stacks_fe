import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectTopBar from '@/components/project/projectTopBar';
import ProjectBoardWithData from '@/components/project/projectBoardWithData';
import ProjectSideBar from '@/components/project/projectSideBar';
import { Button } from '@/components/ui/button';

export interface IProjectPageProps {}

export default function ProjectPage(props: IProjectPageProps) {
  const { projectId } = useParams();

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const toggleSideBarOpen = () => {
    console.log('clicked');
    setIsSideBarOpen(!isSideBarOpen);
  };

  if (!projectId) {
    return;
  }

  return (
    <div className="">
      <div
        className={`grid ${isSideBarOpen ? 'grid-cols-[minmax(15rem,15rem)_minmax(0,_10fr)]' : 'grid-cols-[minmax(0rem,0rem)_minmax(0,_10fr)]'} transition-all`}
      >
        <ProjectSideBar
          isSideBarOpen={isSideBarOpen}
          handleSideBarButton={toggleSideBarOpen}
        />
        <div>
          <ProjectTopBar projectId={projectId} />
          <ProjectBoardWithData projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
