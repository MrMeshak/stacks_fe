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

export default function LoginCard(props: ILoginCardProps) {
  return (
    <Card className="flex h-fit flex-col justify-between">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Don't have an account?{' '}
          <Link
            className="text-foreground font-semibold hover:underline"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
