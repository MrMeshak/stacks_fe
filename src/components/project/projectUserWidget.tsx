import { User, httpClient } from '@/axios';
import { RiAccountCircleFill, RiLogoutCircleLine } from 'react-icons/ri';
import { Button } from '../ui/button';
import { QueryCache, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export interface IProjectUserWidgetProps {
  userData: User;
}

export default function ProjectUserWidget({
  userData,
}: IProjectUserWidgetProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await httpClient.post('/auth/logout');
    },
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    },
    onError: () => {},
  });

  const handleLogoutButton = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex h-[3.5rem] items-center justify-between border-t-[1px] px-4 text-primary">
      <RiAccountCircleFill className="h-6 w-6" />
      <p className="">{userData.firstName}</p>
      <Button
        onClick={handleLogoutButton}
        variant="ghost"
        className="h-8 w-8 px-0 py-0"
      >
        <RiLogoutCircleLine className="h-6 w-6" />
      </Button>
    </div>
  );
}
