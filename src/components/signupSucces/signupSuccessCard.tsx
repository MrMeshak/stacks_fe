import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

export interface ISignupSuccessCardProps {}

export default function SignupSuccessCard(props: ISignupSuccessCardProps) {
  return (
    <Card className="flex h-fit w-full max-w-[30rem] flex-col justify-between">
      <CardHeader>
        <CardTitle>Success!</CardTitle>
        <CardDescription>
          Congratulations, your account has been successfully created
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
