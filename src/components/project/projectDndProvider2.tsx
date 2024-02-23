import { Project, Stack, Task, httpClient } from '@/axios';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import StackCard from '../stack/stackCard';
import TaskCard from '../task/taskCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export interface IProjectDndProviderProps {
  children: ReactNode;
  projectId: string;
}

export default function ProjectDndProvider({
  children,
  projectId,
}: IProjectDndProviderProps) {
  const [overlayStackData, setOverlayStackData] = useState<Stack | undefined>();
  const [overlayTaskData, setOverlayTaskData] = useState<Task | undefined>();

  const queryClient = useQueryClient();

  const moveStackOnStackMutation = useMutation({
    mutationFn: async ({
      activeStackId,
      overStackId,
      projectId,
    }: {
      activeStackId: string;
      overStackId: string;
      projectId: string;
    }) => {
      await httpClient.post(
        `/stacks/dnd/moveStackOnStack?activeStackId=${activeStackId}&overStackId=${overStackId}&projectId=${projectId}`,
      );
    },
    onMutate: ({ activeStackId, overStackId }) => {
      const preProjectQueryRes = queryClient.getQueryData([
        'projects',
        projectId,
      ]);

      queryClient.setQueryData(
        ['projects', projectId],
        (projectQueryRes: AxiosResponse<Project>) => {
          const stackOrder = [...projectQueryRes.data.stackOrder];
          if (!stackOrder) return;
          if (activeStackId === overStackId) return;

          const activeStackIndex = stackOrder.findIndex(
            (stackId) => stackId === activeStackId,
          );
          const overStackIndex = stackOrder.findIndex(
            (stackId) => stackId === overStackId,
          );

          if (activeStackIndex === -1 || overStackIndex === -1) return;

          stackOrder.splice(activeStackIndex, 1);
          stackOrder.splice(overStackIndex, 0, activeStackId);

          return {
            ...projectQueryRes,
            data: {
              ...projectQueryRes.data,
              stackOrder: stackOrder,
            },
          };
        },
      );

      return { preProjectQueryRes };
    },
    onError: (error, _data, context) => {
      console.log(error.message);
      queryClient.setQueryData(
        ['projects', projectId],
        context?.preProjectQueryRes,
      );
    },
  });

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current?.type === 'Stack') {
      setOverlayStackData(active.data.current.stackData);
    }
    if (active.data.current?.type === 'Task') {
      setOverlayTaskData(active.data.current.taskData);
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {};

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    if (active.id === over.id) return;

    console.log('active id', active.data.current?.type);
    console.log('over id', over.data.current?.type);

    //Move Stack
    if (
      active.data.current?.type === 'Stack' &&
      over.data.current?.type === 'Stack'
    ) {
      moveStackOnStackMutation.mutate({
        activeStackId: active.id.toString(),
        overStackId: over.id.toString(),
        projectId,
      });
      return;
    }

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task'
    ) {
      //taskMoveToTaskMutation.mutate({activeTaskId, overTaskId})
      //taskMoveToStackMutation.mutate({activeTaskId}, overStackId)
      return;
    }
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {children}
      {createPortal(
        <DragOverlay dropAnimation={null}>
          {overlayStackData && <StackCard stackData={overlayStackData} />}
          {overlayTaskData && <TaskCard taskData={overlayTaskData} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
