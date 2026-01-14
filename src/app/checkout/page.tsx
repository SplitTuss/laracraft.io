'use client';

import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/client-auth/authContext';

const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!STRIPE_PUBLISHABLE_KEY) throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');

const stripeClient = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && session === null) {
      toast.info('please sign in to check out');
      router.push('/signin');
    }
  }, [session, authLoading, router]);

  const clientSecret = useMemo(() => {
    return fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        Authorization: session?.access_token ?? '',
      },
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [session]);

  return (
    <CheckoutProvider stripe={stripeClient} options={{ clientSecret }}>
      <div>checkout</div>
    </CheckoutProvider>
  );
}
