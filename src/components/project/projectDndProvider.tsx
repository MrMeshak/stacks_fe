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
import StackCard from '../stack/stackCard';
import { Project, Stack, Task, httpClient } from '@/axios';
import { createPortal } from 'react-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { arrayMove } from '@dnd-kit/sortable';
import TaskCard from '../task/taskCard';

export interface IProjectDndProviderProps {
  children: ReactNode;
  projectId: string;
}

export default function ProjectDndProvider({
  children,
  projectId,
}: IProjectDndProviderProps) {
  const [activeStackDataStart, setActiveStackDataStart] = useState<
    Stack | undefined
  >(undefined);
  const [activeTaskDataStart, setActiveTaskDataStart] = useState<
    Task | undefined
  >(undefined);

  const [currentStackId, setCurrentStackId] = useState<string | undefined>(
    undefined,
  );
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>(
    undefined,
  );
  const [overTaskId, setOverTaskId] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();

  const stackOrderMutation = useMutation({
    mutationFn: async ({
      stackOrder,
      projectId,
    }: {
      stackOrder: string[];
      projectId: string;
    }) => {
      await httpClient.patch(`/projects/${projectId}`, { stackOrder });
    },
    onMutate: ({ stackOrder, projectId }) => {
      const prevQueryData = queryClient.getQueryData(['projects', projectId]);

      queryClient.setQueryData(
        ['projects', projectId],
        (projectQueryRes: AxiosResponse<Project>) => ({
          ...projectQueryRes,
          data: {
            ...projectQueryRes.data,
            stackOrder: stackOrder,
          },
        }),
      );
      return { prevQueryData };
    },
    onError: (_error, _data, context) => {
      queryClient.setQueryData(['projects', projectId], context?.prevQueryData);
    },
  });

  const taskMoveMutation = useMutation({
    mutationFn: async ({
      activeTaskId,
      overTaskId,
    }: {
      activeTaskId: string;
      overTaskId: string;
    }) => {
      await httpClient.post(
        `/tasks/move?activeTaskId=${activeTaskId}&overTaskId=${overTaskId}`,
      );
    },
    onSuccess: () => {
      console.log('taskMoveSuccess');
      if (activeStackDataStart)
        queryClient.invalidateQueries({
          queryKey: ['stacks', activeStackDataStart.id],
        });
    },
    onError: (error) => {
      console.log('taskMoveError', error.message);
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
      setActiveStackDataStart(active.data.current.stackData);
    }
    if (active.data.current?.type === 'Task') {
      setActiveTaskDataStart(active.data.current.taskData);
      setCurrentStackId(active.data.current.taskData.stackId);
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    if (active.id === over.id) return;
    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task'
    ) {
      const activeTaskData: Task =
        queryClient.getQueryData<AxiosResponse<Task>>([
          'tasks',
          active.id.toString(),
        ])?.data || active.data.current.taskData;

      const overTaskData: Task = over.data.current.taskData;
      setActiveTaskId(activeTaskData.id);
      setOverTaskId(overTaskData.id);

      if (currentStackId === overTaskData.stackId) {
        queryClient.setQueryData(
          ['stacks', overTaskData.stackId],
          (stackQueryRes: AxiosResponse<Stack>) => {
            const taskOrder = stackQueryRes.data.taskOrder;
            const activeTaskIndex = taskOrder.findIndex(
              (taskId) => taskId === activeTaskData.id,
            );
            const overTaskIndex = taskOrder.findIndex(
              (taskId) => taskId === overTaskData.id,
            );
            return {
              ...stackQueryRes,
              data: {
                ...stackQueryRes.data,
                taskOrder: arrayMove(taskOrder, activeTaskIndex, overTaskIndex),
              },
            };
          },
        );

        return;
      }

      //Delete task from current stack
      queryClient.setQueryData(
        ['stacks', currentStackId],
        (stackQueryRes: AxiosResponse<Stack>) => {
          const taskOrder = stackQueryRes.data.taskOrder.filter(
            (taskId) => taskId !== activeTaskData.id,
          );
          return {
            ...stackQueryRes,
            data: { ...stackQueryRes.data, taskOrder: taskOrder },
          };
        },
      );

      //Add task to over stack
      queryClient.setQueryData(
        ['stacks', overTaskData.stackId],
        (stackQueryRes: AxiosResponse<Stack>) => {
          const taskOrder = [...stackQueryRes.data.taskOrder];
          const overTaskIndex = taskOrder.findIndex(
            (taskId) => taskId === overTaskData.id,
          );
          taskOrder.splice(
            overTaskIndex,
            1,
            activeTaskData.id,
            overTaskData.id,
          );
          return {
            ...stackQueryRes,
            data: { ...stackQueryRes.data, taskOrder: taskOrder },
          };
        },
      );

      //update task stack Id
      queryClient.setQueryData(
        ['tasks', overTaskData.id],
        (taskQueryRes: AxiosResponse<Task>) => {
          return (
            taskQueryRes && {
              ...taskQueryRes,
              data: { ...taskQueryRes, stackId: overTaskData.stackId },
            }
          );
        },
      );

      setCurrentStackId(overTaskData.stackId);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveStackDataStart(undefined);
    setActiveTaskDataStart(undefined);
    setCurrentStackId(undefined);
    const { active, over } = event;

    console.log('activeTaskIdUseState', activeTaskId);
    console.log('overTaskIdUseState', overTaskId);
    if (!over) return;

    //Dragging Stack
    if (active.data.current?.type === 'Stack') {
      const queryData = queryClient.getQueryData<AxiosResponse<Project>>([
        'projects',
        projectId,
      ]);

      const stackOrder = queryData?.data.stackOrder;
      if (!stackOrder) return;

      const activeIndex = stackOrder.findIndex(
        (stackId) => stackId === active.id,
      );
      const overIndex = stackOrder.findIndex((stackId) => stackId === over.id);

      stackOrderMutation.mutate({
        projectId,
        stackOrder: arrayMove(stackOrder, activeIndex, overIndex),
      });
    }

    if (
      active.data.current?.type === 'Task' &&
      over.data.current?.type === 'Task'
    ) {
      if (activeTaskId && overTaskId) {
        taskMoveMutation.mutate({
          activeTaskId: activeTaskId,
          overTaskId: overTaskId,
        });
      }
    }

    //Dragging Task
    // if (
    //   active.data.current?.type === 'Task' &&
    //   over.data.current?.type === 'Task'
    // ) {
    //   const activeTaskData: Task = active.data.current.taskData;
    //   const overTaskData: Task = over.data.current.taskData;

    //   if (currentStackId === overTaskData.stackId) {
    //     const stackQueryRes = queryClient.getQueryData<AxiosResponse<Stack>>([
    //       'stacks',
    //       activeTaskData.stackId,
    //     ]);
    //     const taskOrder = stackQueryRes.data.taskOrder;
    //     if (!taskOrder) return;

    //     const activeIndex = taskOrder.findIndex(
    //       (taskId) => taskId === active.id,
    //     );
    //     const overIndex = taskOrder.findIndex((taskId) => taskId === over.id);

    //     taskOrderMutation.mutate({
    //       taskOrder: arrayMove(taskOrder, activeIndex, overIndex),
    //       stackId: activeTaskData.stackId,
    //     });
    //   }
    // }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {children}
      {createPortal(
        <DragOverlay dropAnimation={null}>
          {activeStackDataStart && (
            <StackCard stackData={activeStackDataStart} />
          )}
          {activeTaskDataStart && <TaskCard taskData={activeTaskDataStart} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
