import z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, httpClient } from '@/axios';
import { AxiosError } from 'axios';

const createTaskFormSchema = z.object({
  title: z.string().min(1, 'required'),
  description: z.string(),
});

type CreateTaskFormSchema = z.infer<typeof createTaskFormSchema>;

export interface ITaskCreateFormProps {
  stackData: Stack;
  onSuccess: () => void;
}

export default function TaskCreateForm({
  stackData,
  onSuccess,
}: ITaskCreateFormProps) {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (data: CreateTaskFormSchema) => {
      await httpClient.post(`/tasks/${stackData.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stacks', stackData.id],
        exact: true,
      });
      onSuccess();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError('root', { message: error.response?.data.message });
        return;
      }
      setError('root', { message: 'Oops, something went wrong' });
    },
  });

  const form = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: CreateTaskFormSchema) => {
    createTaskMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className=" h-28 resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 flex items-center gap-2 text-muted-foreground">
          <p className=" ">In </p>
          <div className="flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1">
            <div
              style={{ backgroundColor: stackData.color }}
              className="h-3 w-3 min-w-3 rounded-sm text-xs"
            />
            <p className=" text-sm font-semibold">{stackData.title}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Button className="w-fit">Create</Button>
          {errors.root && (
            <Alert className="bg-slate-100 text-muted-foreground">
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  );
}
