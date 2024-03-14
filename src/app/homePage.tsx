import { User, httpClient } from '@/axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IHomePageProps {}

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, []);

  return <div></div>;
}
