import SignupCard from '@/components/signup/signupCard';

export interface ISignupPageProps {}

export default function SignupPage(props: ISignupPageProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignupCard />
    </div>
  );
}
