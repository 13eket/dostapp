'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/signup');
    }
  }, [token, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
