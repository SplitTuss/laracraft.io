'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/client-auth/authContext';

export default function Orders() {
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

    const response = await fetch('/api/orders');
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
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          items: {order.items}
          total: {order.total}
        </div>
      ))}
    </div>
  );
}
