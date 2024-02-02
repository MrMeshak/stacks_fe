import LoginCard from '@/components/login/loginCard';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginCard />
    </div>
  );
}
