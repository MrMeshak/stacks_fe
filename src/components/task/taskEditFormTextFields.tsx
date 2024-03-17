import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task, httpClient } from '@/axios';
import { AutosizeTextarea } from '../ui/auto-size-text-area';
import { RiEdit2Line } from 'react-icons/ri';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AxiosError } from 'axios';

const editTaskFormTextFieldsSchema = z.object({
  title: z.string().min(1, 'required'),
  description: z.string(),
});

type EditTaskFormTextFieldsSchema = z.infer<
  typeof editTaskFormTextFieldsSchema
>;

export interface ITaskEditFormTextFieldsProps {
  taskData: Task;
}

export default function TaskEditFormTextFields({
  taskData,
}: ITaskEditFormTextFieldsProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const queryClient = useQueryClient();

  const editTaskTextFieldsMutation = useMutation({
    mutationFn: async (data: EditTaskFormTextFieldsSchema) => {
      await httpClient.patch(`/tasks/${taskData.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', taskData.id],
        exact: true,
      });
      setIsDisabled(true);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError('root', { message: error.message });
        return;
      }
      setError('root', { message: 'Oops, something went wrong' });
    },
  });

  const form = useForm({
    resolver: zodResolver(editTaskFormTextFieldsSchema),
    defaultValues: {
      title: taskData.title,
      description: taskData.description,
    },
  });

  const {
    formState: { errors, isDirty },
    setError,
  } = form;

  const onsubmit = (values: EditTaskFormTextFieldsSchema) => {
    console.log(form.formState.dirtyFields);
    editTaskTextFieldsMutation.mutate(values);
  };

  const handleEditButton = () => {
    if (isDisabled) {
      setIsDisabled(false);
      return;
    }
    if (!isDirty) {
      setIsDisabled(true);
      return;
    }

    editTaskTextFieldsMutation.mutate(form.getValues());
  };

  return (
    <>
      <div className="flex flex-row-reverse pl-6">
        <div className="px-2">
          <Button
            variant="ghost"
            onClick={handleEditButton}
            className="h-8 w-8 px-0 py-0"
          >
            <RiEdit2Line className="h-5 w-5 text-slate-300" />
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex w-full flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AutosizeTextarea
                      {...field}
                      className="cursor-pointer resize-none text-3xl font-bold shadow-none disabled:cursor-default disabled:border-none disabled:opacity-100"
                      tabIndex={-1}
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AutosizeTextarea
                      {...field}
                      className="resize-none text-xl font-light text-slate-400 hover:border disabled:cursor-default disabled:border-none disabled:opacity-100"
                      tabIndex={-1}
                      disabled={isDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isDisabled && (
              <div className="flex gap-2">
                <Button disabled={isDisabled}>save</Button>
                {errors.root && (
                  <Alert className=" bg-slate-100 py-2 text-muted-foreground">
                    <AlertDescription className="">
                      {errors.root.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
