'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/client-auth/authContext';
import Header from '@/components/header';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/Dialog';

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
      <div className="flex flex-col text-2xl mt-4">
        <h1 className="text-center text-2xl text-primary">your orders</h1>
        <br />
        <ul>
          {orders.map((order) => (
            <Dialog key={order.id}>
              <DialogTrigger>
                <li
                  key={order.id}
                  className="flex justify-center rounded-xl border-2 border-accent"
                >
                  <div className="flex flex-row gap-6">
                    <div>items: {getTotalItems(order)}</div>
                    <div>total: {order.total}</div>
                    <div>date: {new Date(order.created_at).toLocaleDateString()}</div>
                  </div>
                </li>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Order #{order.id}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                  <div>total items: {getTotalItems(order)}</div>
                  <div>total price: ${order.total}</div>
                  <div>ordered on: {new Date(order.created_at).toLocaleDateString()}</div>
                </div>
                <div>
                  items ordered:
                  {order.products.map((product) => (
                    <div key={product.id} className="flex flex-row gap-4 mb-2">
                      <img src={product.item.imageUrl} height="auto" width={40} />
                      <div>{product.item.title}</div>
                      <div>${product.item.price}</div>
                      <div>x{product.quantity}</div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </ul>
      </div>
    </>
  );
}
