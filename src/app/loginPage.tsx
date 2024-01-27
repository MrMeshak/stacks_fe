import LoginCard from '@/components/login/loginCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import * as React from 'react';

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginCard />
    </div>
  );
}
