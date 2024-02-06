import { z } from 'zod';
import { Project, httpClient } from '@/axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export interface IProjectDeleteFormProps {
  projectData: Project;
}

export default function ProjectDeleteForm({
  projectData,
}: IProjectDeleteFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteProjectFormSchema = z
    .object({
      title: z.string().min(1, 'required'),
    })
    .refine((data) => data.title === projectData.title, {
      message: 'Project title did not match',
      path: ['title'],
    });
  type DeleteProjectFormSchema = z.infer<typeof deleteProjectFormSchema>;

  const deleteProjectMutation = useMutation({
    mutationFn: async (data: DeleteProjectFormSchema) => {
      return await httpClient.delete(`/projects/${projectData.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', projectData.id],
      });
      navigate('/projects');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError('root', { message: error.response?.data.message });
        return;
      }
      setError('root', { message: 'Oops, something went wrong' });
    },
  });

  const form = useForm<DeleteProjectFormSchema>({
    resolver: zodResolver(deleteProjectFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: DeleteProjectFormSchema) => {
    deleteProjectMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                To confirm, type "{projectData.title}" in the box below
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="destructive">Delete</Button>
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
