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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import StackCard from '../stack/stackCard';
import TaskCard from '../task/taskCard';
import { AxiosResponse } from 'axios';
import { arrayMove } from '@dnd-kit/sortable';

export interface stackMoveDto {
  projectId: string;
  stackOrder: string[];
}

export interface taskMoveDto {
  taskId: string;
  fromStackId: string;
  fromStackTaskOrder: string[];
  toStackId: string;
  toStackTaskOrder: string[];
}

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
  const [fromTaskStackId, setFromTaskStackId] = useState<string | undefined>();
  const [activeTaskStackId, setActiveTaskStackId] = useState<
    string | undefined
  >();
  const queryClient = useQueryClient();

  const taskMoveMutation = useMutation({
    mutationFn: async (data: taskMoveDto) => {
      await httpClient.post('/dnd/taskMove', data);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['stacks'] });
    },
  });

  const stackMoveMutation = useMutation({
    mutationFn: async (data: stackMoveDto) => {
      await httpClient.post('/dnd/stackMove', data);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },
  });

  const onDragStart = ({ active }: DragStartEvent) => {
    if (active.data.current?.type === 'Stack') {
      setOverlayStackData(active.data.current.stackData);
    }

    if (active.data.current?.type === 'Task') {
      setOverlayTaskData(active.data.current.taskData);
      setActiveTaskStackId(active.data.current.taskData.stackId);
      setFromTaskStackId(active.data.current.taskData.stackId);
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    console.log('dragOverActiveId', active.id);
    console.log('dragOverOverId', over.id);

    if (active.id === over.id) return;

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task'
    ) {
      if (activeTaskStackId !== over.data.current.taskData.stackId) {
        //remove task from stack
        queryClient.setQueryData(
          ['stacks', activeTaskStackId],
          (stackQueryRes: AxiosResponse<Stack> | undefined) => {
            if (!stackQueryRes) return;
            const updatedTaskOrder = stackQueryRes.data.taskOrder.filter(
              (taskId) => taskId !== active.id.toString(),
            );

            return {
              ...stackQueryRes,
              data: { ...stackQueryRes.data, taskOrder: updatedTaskOrder },
            };
          },
        );

        //add task to stack
        queryClient.setQueryData(
          ['stacks', over.data.current.taskData.stackId],
          (stackQueryRes: AxiosResponse<Stack> | undefined) => {
            console.log(stackQueryRes);
            if (!stackQueryRes) return;
            const updatedTaskOrder = [...stackQueryRes.data.taskOrder];
            updatedTaskOrder.push(active.id.toString());
            return {
              ...stackQueryRes,
              data: { ...stackQueryRes.data, taskOrder: updatedTaskOrder },
            };
          },
        );

        setActiveTaskStackId(over.data.current.taskData.stackId);
        return;
      }
    }

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Stack'
    ) {
      if (activeTaskStackId !== over.id.toString()) {
        //Remove from active stack
        queryClient.setQueryData(
          ['stacks', activeTaskStackId],
          (stackQueryRes: AxiosResponse<Stack> | undefined) => {
            if (!stackQueryRes) return;
            const updatedTaskOrder = stackQueryRes.data.taskOrder.filter(
              (taskId) => taskId !== active.id.toString(),
            );
            return {
              ...stackQueryRes,
              data: { ...stackQueryRes.data, taskOrder: updatedTaskOrder },
            };
          },
        );
        //add to new stack
        queryClient.setQueryData(
          ['stacks', over.id.toString()],
          (stackQueryRes: AxiosResponse<Stack> | undefined) => {
            if (!stackQueryRes) return;
            const updatedTaskOrder = [...stackQueryRes.data.taskOrder];
            updatedTaskOrder.push(active.id.toString());
            return {
              ...stackQueryRes,
              data: { ...stackQueryRes.data, taskOrder: updatedTaskOrder },
            };
          },
        );

        setActiveTaskStackId(over.id.toString());
      }
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    console.log('dragEndActiveId :', active.id);
    console.log('dragEndOverId :', over?.id);

    setOverlayStackData(undefined);
    setOverlayTaskData(undefined);

    if (!over) return;

    /* stackMove */
    if (
      active.data.current?.type === 'Stack' &&
      over.data.current?.type === 'Stack' &&
      active.id !== over.id
    ) {
      queryClient.setQueryData(
        ['projects', projectId],
        (projectQueryRes: AxiosResponse<Project>) => {
          if (!projectQueryRes) return;
          const stackOrder = projectQueryRes.data.stackOrder;
          const activeIndex = stackOrder.findIndex(
            (stackId) => stackId === active.id.toString(),
          );
          const overIndex = stackOrder.findIndex(
            (stackId) => stackId === over.id.toString(),
          );
          const updatedStackOrder = arrayMove(
            stackOrder,
            activeIndex,
            overIndex,
          );

          stackMoveMutation.mutate({
            projectId: projectId,
            stackOrder: updatedStackOrder,
          });

          return {
            ...projectQueryRes,
            data: { ...projectQueryRes.data, stackOrder: updatedStackOrder },
          };
        },
      );

      return;
    }

    /* taskMove */
    if (active.data.current?.type === 'Task') {
      queryClient.setQueryData(
        ['tasks', active.id.toString()],
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

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task' &&
      active.id !== over.id
    ) {
      //Update stack.stackOrder
      queryClient.setQueryData(
        ['stacks', over.data.current.taskData.stackId],
        (stackQueryRes: AxiosResponse<Stack> | undefined) => {
          if (!stackQueryRes) return;
          const taskOrder = stackQueryRes.data.taskOrder;
          const activeIndex = taskOrder.findIndex(
            (taskId) => taskId === active.id.toString(),
          );
          const overIndex = taskOrder.findIndex(
            (taskId) => taskId === over.id.toString(),
          );
          if (activeIndex === -1 || overIndex === -1) return;

          const updatedTaskOrder = arrayMove(taskOrder, activeIndex, overIndex);
          return {
            ...stackQueryRes,
            data: { ...stackQueryRes.data, taskOrder: updatedTaskOrder },
          };
        },
      );

      const toStackData = queryClient.getQueryData<
        AxiosResponse<Stack> | undefined
      >(['stacks', over.data.current.taskData.stackId])?.data;
      if (!toStackData) return;

      if (!fromTaskStackId) return;
      const fromStackData = queryClient.getQueryData<
        AxiosResponse<Stack> | undefined
      >(['stacks', fromTaskStackId])?.data;
      if (!fromStackData) return;

      taskMoveMutation.mutate({
        taskId: active.id.toString(),
        toStackId: over.data.current.taskData.stackId,
        toStackTaskOrder: toStackData.taskOrder,
        fromStackId: fromTaskStackId,
        fromStackTaskOrder: fromStackData.taskOrder,
      });
      return;
    }

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task' &&
      active.id === over.id
    ) {
      if (!activeTaskStackId) return;
      const toStackData = queryClient.getQueryData<
        AxiosResponse<Stack> | undefined
      >(['stacks', activeTaskStackId])?.data;
      if (!toStackData) return;

      if (!fromTaskStackId) return;
      const fromStackData = queryClient.getQueryData<
        AxiosResponse<Stack> | undefined
      >(['stacks', fromTaskStackId])?.data;
      if (!fromStackData) return;

      taskMoveMutation.mutate({
        taskId: active.id.toString(),
        toStackId: activeTaskStackId,
        toStackTaskOrder: toStackData.taskOrder,
        fromStackId: fromTaskStackId,
        fromStackTaskOrder: fromStackData.taskOrder,
      });

      return;
    }

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Stack'
    ) {
      const toStackData = queryClient.getQueryData<
        AxiosResponse<Stack> | undefined
      >(['stacks', over.id.toString()])?.data;
      if (!toStackData) return;

      if (!fromTaskStackId) return;
      const fromStackData = queryClient.getQueryData<
        AxiosResponse<Stack> | undefined
      >(['stacks', fromTaskStackId])?.data;
      if (!fromStackData) return;

      taskMoveMutation.mutate({
        taskId: active.id.toString(),
        toStackId: over.id.toString(),
        toStackTaskOrder: toStackData.taskOrder,
        fromStackId: fromTaskStackId,
        fromStackTaskOrder: fromStackData.taskOrder,
      });
      return;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );
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
