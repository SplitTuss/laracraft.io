'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/client-auth/authContext';
import Header from '@/components/header';

type OrderData = {
  id: number;
  created_at: string;
  userId: string;
  total: number;
  products: Array<{
    id: number;
    quantity: number;
    created_at: string;
    item: {
      id: number;
      price: number;
      title: string;
      description: string;
      imageUrl: string;
      created_at: string;
    };
  }>;
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);

  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('order page', { session });
    if (!authLoading && session === null) {
      router.push('/signin');
    }
  }, [session, authLoading, router]);

  const handleLoadOrders = useCallback(async () => {
    setLoading(true);

    const response = await fetch('/api/orders', {
      headers: {
        Authorization: session?.access_token ?? '',
      },
    });

    const data = await response.json();
    setOrders(data);
    setLoading(false);
  }, [session?.access_token]);

  useEffect(() => {
    if (authLoading || !session) return;

    handleLoadOrders();
  }, [authLoading, session, handleLoadOrders]);

  if (authLoading || loading) {
    return <div>loading...</div>;
  }

  const getTotalItems = (order: OrderData) => {
    let count = 0;
    order.products.forEach((product) => {
      count += product.quantity;
    });
    return count;
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center text-2xl mt-4">
        <h1 className="text-2xl text-primary">your orders</h1>
        <br />
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="grid grid-cols-3">
              <div className="col-span-1">items: {getTotalItems(order)}</div>
              <div className="col-span-1">total: {order.total}</div>
              <div className="col-span-1">
                date: {new Date(order.created_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
