import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/axios';
import { AxiosError } from 'axios';

const createProjectFormSchema = z.object({
  title: z.string().min(1, 'required'),
});

type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>;

export interface IProjectCreateFormProps {
  onSuccess: () => void;
}

export default function ProjectCreateForm({
  onSuccess,
}: IProjectCreateFormProps) {
  const queryClient = useQueryClient();
  const createProjectMutation = useMutation({
    mutationFn: async (data: CreateProjectFormSchema) => {
      return await httpClient.post('/projects', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
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

  const form = useForm<CreateProjectFormSchema>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: CreateProjectFormSchema) => {
    createProjectMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
