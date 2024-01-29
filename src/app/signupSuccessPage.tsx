import SignupSuccessCard from '@/components/signupSucces/signupSuccessCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ISignupSuccessPageProps {}

export default function SignupSuccessPage(props: ISignupSuccessPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  });

  return (
    <div className="flex h-screen w-full items-center justify-center p-8">
      <SignupSuccessCard />
    </div>
  );
}
