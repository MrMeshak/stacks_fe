import { Project, Stack, Task, httpClient } from '@/axios';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import StackCard from '../stack/stackCard';
import TaskCard from '../task/taskCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { arrayMove } from '@dnd-kit/sortable';

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
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>();
  const [activeTaskStackId, setActiveTaskStackId] = useState<
    string | undefined
  >();
  const [overTaskId, setOverTaskId] = useState<string | undefined>();

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
        (projectQueryRes: AxiosResponse<Project> | undefined) => {
          if (!projectQueryRes) return;
          if (activeStackId === overStackId) return;

          const stackOrder = [...projectQueryRes.data.stackOrder];

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
      queryClient.setQueryData(
        ['projects', projectId],
        context?.preProjectQueryRes,
      );
    },
  });

  const moveTaskOnTaskMutation = useMutation({
    mutationFn: async ({
      activeTaskId,
      overTaskId,
    }: {
      activeTaskId: string;
      overTaskId: string;
    }) => {
      await httpClient.post(
        `/tasks/dnd/moveTaskOnTask?activeTaskId=${activeTaskId}&overTaskId=${overTaskId}`,
      );
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current?.type === 'Stack') {
      setOverlayStackData(active.data.current.stackData);
    }
    if (active.data.current?.type === 'Task') {
      setOverlayTaskData(active.data.current.taskData);
      setActiveTaskId(active.id.toString());
      setActiveTaskStackId(active.data.current.taskData.stackId);
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    if (active.id === over.id) return;
    console.log('onDragOver');
    console.log('activeId', active.id);
    console.log('overId', over.id);

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task'
    ) {
      setOverTaskId(over.id.toString());
      const overTaskData: Task = over.data.current.taskData;

      //moveTaskOnTask within stack (cache)
      if (activeTaskStackId === overTaskData.stackId) {
        queryClient.setQueryData(
          ['stacks', overTaskData.stackId],
          (stackQueryRes: AxiosResponse<Stack> | undefined) => {
            if (!stackQueryRes) return;
            const taskOrder = [...stackQueryRes.data.taskOrder];
            const activeTaskIndex = taskOrder.findIndex(
              (taskId) => taskId === active.id.toString(),
            );
            const overTaskIndex = taskOrder.findIndex(
              (taskId) => taskId === over.id.toString(),
            );
            if (activeTaskIndex === -1 || overTaskIndex === -1) return;

            taskOrder.splice(activeTaskIndex, 1);
            taskOrder.splice(overTaskIndex, 0, active.id.toString());

            return {
              ...stackQueryRes,
              data: { ...stackQueryRes.data, taskOrder: taskOrder },
            };
          },
        );
      }

      //moveTaskOnTask across stacks
      if (activeTaskStackId !== overTaskData.stackId) {
        //delete task from current stack
        queryClient.setQueryData(
          ['stacks', activeTaskStackId],
          (stackQueryRes: AxiosResponse<Stack> | undefined) => {
            if (!stackQueryRes) return;
            const taskOrder = stackQueryRes.data.taskOrder.filter(
              (taskId) => taskId !== active.id.toString(),
            );

            return {
              ...stackQueryRes,
              data: { ...stackQueryRes.data, taskOrder: taskOrder },
            };
          },
        );

        //add task to over stack
        queryClient.setQueryData(
          ['stacks', overTaskData.stackId],
          (stackQueryRes: AxiosResponse<Stack> | undefined) => {
            if (!stackQueryRes) return;
            // const taskOrder = [...stackQueryRes.data.taskOrder];
            // const overTaskIndex = taskOrder.findIndex(
            //   (taskId) => taskId === over.id.toString(),
            // );
            // if (overTaskIndex === -1) return;
            // taskOrder.splice(overTaskIndex, 0, active.id.toString());
            const taskOrder = [...stackQueryRes.data.taskOrder];
            taskOrder.push(active.id.toString());
            return {
              ...stackQueryRes,
              data: { ...stackQueryRes.data, taskOrder: taskOrder },
            };
          },
        );

        setActiveTaskStackId(overTaskData.stackId);
      }
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setOverlayStackData(undefined);
    setOverlayTaskData(undefined);
    setOverTaskId(undefined);

    if (!over) return;

    console.log('Drag end');
    console.log('active.Id', active);
    console.log('over.Id', over);
    console.log('activeTaskId', activeTaskId),
      console.log('overTaskId', overTaskId);

    //moveStackOnStack
    if (
      active.data.current?.type === 'Stack' &&
      over.data.current?.type === 'Stack'
    ) {
      if (active.id === over.id) return;
      moveStackOnStackMutation.mutate({
        activeStackId: active.id.toString(),
        overStackId: over.id.toString(),
        projectId,
      });
      return;
    }

    //moveTaskOnTask
    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task'
    ) {
      if (active.id === over.id) return;
      if (activeTaskId && overTaskId) {
        moveTaskOnTaskMutation.mutate({
          activeTaskId: activeTaskId,
          overTaskId: overTaskId,
        });

        queryClient.setQueryData(
          ['tasks', activeTaskId],
          (taskQueryRes: AxiosResponse<Task> | undefined) => {
            if (!taskQueryRes) return;
            return {
              ...taskQueryRes,
              data: {
                ...taskQueryRes.data,
                stackId: activeTaskStackId,
              },
            };
          },
        );
      }
      return;
    }

    //moveTaskOnStack
    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Stack'
    ) {
      return;
    }
  };

  return (
    <DndContext
      sensors={sensors}
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
