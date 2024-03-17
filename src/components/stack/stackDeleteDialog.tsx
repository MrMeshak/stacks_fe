import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/axios';
import { Alert, AlertDescription } from '../ui/alert';
import { AxiosError } from 'axios';

export interface IStackDeleteDialogProps {
  stackId: string;
  projectId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function StackDeleteDialog({
  stackId,
  projectId,
  isDialogOpen,
  setIsDialogOpen,
}: IStackDeleteDialogProps) {
  const [error, setError] = useState<Error | undefined>(undefined);

  const queryClient = useQueryClient();
  const deleteStackMutation = useMutation({
    mutationFn: async () => {
      await httpClient.delete(`/stacks/${stackId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId],
        exact: true,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError({ name: error.name, message: error.response?.data.message });
      }
      setError(error);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent onPointerDown={(event) => event.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Delete Stack</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete this
            stack?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex sm:justify-start">
          <Button
            onClick={() => deleteStackMutation.mutate()}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
        {error && (
          <Alert className="bg-slate-100 text-muted-foreground">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
}
