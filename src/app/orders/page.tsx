'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/client-auth/authContext';

export default function Orders() {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('order page', { session });
    if (!loading && session === null) {
      router.push('/signin');
    }
  }, [session, loading, router]);

  return <div>hallo</div>;
}
