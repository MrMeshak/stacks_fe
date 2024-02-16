import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ReactNode, useState } from 'react';
import StackCard from '../stack/stackCard';
import { Project, Stack, httpClient } from '@/axios';
import { createPortal } from 'react-dom';
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
  const [activeStackData, setActiveStackData] = useState<Stack | null>(null);
  const queryClient = useQueryClient();

  const stackOrderMutation = useMutation({
    mutationFn: async (stackOrder: string[]) => {
      await httpClient.patch(`/projects/${projectId}`, { stackOrder });
    },
    onMutate: (stackOrder) => {
      const prevQueryData = queryClient.getQueryData(['projects', projectId]);

      queryClient.setQueryData(
        ['projects', projectId],
        (queryData: AxiosResponse<Project>) => ({
          ...queryData,
          data: {
            ...queryData.data,
            stackOrder: stackOrder,
          },
        }),
      );
      return { prevQueryData };
    },
    onError: (_error, _stackOrder, context) => {
      queryClient.setQueryData(
        ['projects', projectId],
        context?.prevQueryData,
        {},
      );
    },
  });

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Stack') {
      setActiveStackData(event.active.data.current.stackData);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const queryData = queryClient.getQueryData<AxiosResponse<Project>>([
      'projects',
      projectId,
    ]);
    if (!queryData) return;
    const { stackOrder } = queryData.data;

    const activeIndex = stackOrder.findIndex(
      (stackId) => stackId === active.id,
    );
    const overIndex = stackOrder.findIndex((stackId) => stackId === over.id);
    stackOrderMutation.mutate(arrayMove(stackOrder, activeIndex, overIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
      {createPortal(
        <DragOverlay dropAnimation={null}>
          {activeStackData && <StackCard stackData={activeStackData} />}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
