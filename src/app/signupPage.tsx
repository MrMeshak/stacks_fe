import SignupCard from '@/components/signup/signupCard';

export interface ISignupPageProps {}

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <SignupCard />
    </div>
  );
}
