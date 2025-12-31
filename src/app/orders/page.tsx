'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/client-auth/authContext';
import Header from '@/components/header';

export default function Orders() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('order page', { session });
    if (!authLoading && session === null) {
      router.push('/signin');
    }
  }, [session, authLoading, router]);

  const handleLoadOrders = async () => {
    setLoading(true);

    const response = await fetch('/api/orders', {
      headers: {
        Authorization: session?.access_token ?? '',
      },
    });

    const data = await response.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    if (authLoading || !session) return;

    handleLoadOrders();
  }, [authLoading, session]);

  if (authLoading || loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center text-2xl mt-4">
        <h1 className="text-2xl text-primary">your orders</h1>
        <br />
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="grid grid-cols-3">
              <div className="col-span-1">items: {order.items}</div>
              <div className="col-span-1">total: {order.total}</div>
              <div className="col-span-1">date: {order.date}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
