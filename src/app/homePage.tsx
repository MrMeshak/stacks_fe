import { User, httpClient } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IHomePageProps {}

export default function HomePage() {
  const navigate = useNavigate();

  const meQuery = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => {
      return await httpClient.get<User>('/users/me');
    },
  });

  useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <div>
      <h3>Home Page</h3>
    </div>
  );
}
