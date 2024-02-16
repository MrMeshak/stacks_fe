import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import FormColorPicker from '../utils/form/FormColorPicker';
import { colorPickerColors } from '../utils/form/FormColorPicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/axios';
import { AxiosError } from 'axios';

const createStackFormSchema = z.object({
  title: z.string().min(1, 'required'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'invalid hex color'),
});

type CreateStackFormSchema = z.infer<typeof createStackFormSchema>;

export interface ICreateStackFromProps {
  projectId: string;
  onSuccess: () => void;
}

export default function CreateStackFrom({
  projectId,
  onSuccess,
}: ICreateStackFromProps) {
  const queryClient = useQueryClient();
  const createStackMutation = useMutation({
    mutationFn: async (data: CreateStackFormSchema) => {
      return await httpClient.post(`stacks/${projectId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId],
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

  const form = useForm({
    resolver: zodResolver(createStackFormSchema),
    defaultValues: {
      title: '',
      color: colorPickerColors[0],
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: CreateStackFormSchema) => {
    createStackMutation.mutate(values);
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
              <FormLabel>Stack title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormColorPicker
              onChange={field.onChange}
              defaultValue={field.value}
            />
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
