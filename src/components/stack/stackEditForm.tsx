import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, httpClient } from '@/axios';
import { Input } from '../ui/input';
import FormColorPicker from '../utils/form/FormColorPicker';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { AxiosError } from 'axios';

const editStackFormSchema = z.object({
  title: z.string().min(1, 'required'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'invalid hex color'),
});

type EditStackFormSchema = z.infer<typeof editStackFormSchema>;

export interface IStackEditFormProps {
  stackData: Stack;
  onSuccess: () => void;
}

export default function StackEditForm({
  stackData,
  onSuccess,
}: IStackEditFormProps) {
  const queryClient = useQueryClient();
  const editStackMutation = useMutation({
    mutationFn: async (data: EditStackFormSchema) => {
      await httpClient.put(`/stacks/${stackData.id}`, data);
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
        setError('root', { message: error.message });
        return;
      }
      setError('root', { message: 'Oops, something went wrong' });
    },
  });

  const form = useForm({
    resolver: zodResolver(editStackFormSchema),
    defaultValues: {
      title: stackData.title,
      color: stackData.color,
    },
  });

  const onSubmit = (values: EditStackFormSchema) => {
    editStackMutation.mutate(values);
  };

  const {
    formState: { errors },
    setError,
  } = form;

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
          name="color"
          render={({ field }) => (
            <FormColorPicker
              onChange={field.onChange}
              defaultValue={field.value}
            />
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
