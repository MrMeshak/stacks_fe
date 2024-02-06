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
import { Project, httpClient } from '@/axios';
import { AxiosError } from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

const editProjectFormSchema = z.object({
  title: z.string().min(1, 'required'),
});

type EditProjectFormSchema = z.infer<typeof editProjectFormSchema>;

export interface IProjectEditFormProps {
  projectData: Project;
  onSuccess: () => void;
}

export default function ProjectEditForm({
  projectData,
  onSuccess,
}: IProjectEditFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateProjectQuery = useMutation({
    mutationFn: async (data: EditProjectFormSchema) => {
      await httpClient.put(`/projects/${projectData.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['projects', projectData.id],
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

  const form = useForm<EditProjectFormSchema>({
    resolver: zodResolver(editProjectFormSchema),
    defaultValues: {
      title: projectData.title,
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: EditProjectFormSchema) => {
    updateProjectQuery.mutate(values);
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
          <Button className="w-fit">Save</Button>
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
