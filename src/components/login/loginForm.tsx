import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { httpClient } from '@/axios';

const loginFormSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(1, 'Required'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export interface ILoginFormProps {}

export default function LoginForm(props: ILoginFormProps) {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormSchema) => {
      return await httpClient.post('/auth/login', data);
    },
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.log(error);

      if (error instanceof AxiosError) {
        setError('root', { message: error.response?.data.message });
        return;
      }

      setError('root', { message: 'Oops, something went wrong' });
    },
  });

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: LoginFormSchema) => {
    loginMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex flex-col gap-2">
          <Button type="submit">Login</Button>
          {errors.root && (
            <Alert className="text-muted-forground bg-slate-100">
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  );
}
