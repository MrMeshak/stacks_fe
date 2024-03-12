import LoginCard from '@/components/login/loginCard';

export interface ILoginPageProps {}

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <LoginCard />
    </div>
  );
}
