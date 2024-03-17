import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './loginForm';

export interface ILoginCardProps {}

export default function LoginCard() {
  return (
    <Card className="m-4 flex h-fit w-full max-w-96 flex-col justify-between">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            className="font-semibold text-foreground hover:underline"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
