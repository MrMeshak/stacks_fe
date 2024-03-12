import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import SignupForm from './signupForm';

export interface ISignupCardProps {}

export default function SignupCard() {
  return (
    <Card className="flex h-fit w-full max-w-96 flex-col justify-between">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <p className="text-muted-forground text-sm">
          Already have an account?{' '}
          <Link
            className="font-semibold text-foreground hover:underline"
            to="/login"
          >
            Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
