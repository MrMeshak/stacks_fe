import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { useMutation } from '@tanstack/react-query';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { httpClient } from '@/axios';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const signupFormSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Required')
    .min(8, 'At least 8 characters')
    .refine(
      (password) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/.test(password),
      (password) => {
        const strArr: string[] = ['Requires'];
        if (!/(?=.*\d)/.test(password)) {
          strArr.push(' • number');
        }
        if (!/(?=.*[a-z])/.test(password)) {
          strArr.push(' • lowercase');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
          strArr.push(' • uppercase');
        }
        if (!/(?=.*[\W])/.test(password)) {
          strArr.push(' • symbol');
        }
        return { message: strArr.join('') };
      },
    ),
});

type SignupFormSchema = z.infer<typeof signupFormSchema>;

export interface ISignupFormProps {}

export default function SignupForm() {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormSchema) => {
      return await httpClient.post('/auth/signup', data);
    },
    onSuccess: () => {
      navigate('/signup-success');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError('root', { message: error.response?.data.message });
        return;
      }

      setError('root', { message: 'Oops, something went wrong' });
    },
  });

  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  const onSubmit = (values: SignupFormSchema) => {
    signupMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field}></Input>
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
                <Input type="password" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex flex-col gap-2">
          <Button type="submit">Signup</Button>
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
