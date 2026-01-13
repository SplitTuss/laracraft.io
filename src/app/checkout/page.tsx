'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/client-auth/authContext';

export default function Checkout() {
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && session === null) {
      toast.info('please sign in to check out');
      router.push('/signin');
    }
  }, []);

  return <div>checkout</div>;
}
