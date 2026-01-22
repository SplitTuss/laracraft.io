'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const refresh = searchParams.get('refresh');

  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);

  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
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
    if (refresh) {
      setTimeout(handleLoadOrders, 3000);
    }
  }, [authLoading, session, refresh, handleLoadOrders]);

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
      <div className="flex flex-col items-center text-2xl m-4">
        <h1 className="text-center text-2xl text-primary">orders for {session?.user.email}</h1>
        <ul className="m-2 sm:text-2xl text-sm flex flex-col mt-6">
          {orders.map((order) => (
            <Dialog key={order.id}>
              <DialogTrigger>
                <li
                  key={order.id}
                  className="rounded-xl border-2 border-accent p-4 m-4 hover:cursor-pointer"
                >
                  <div className="flex flex-row gap-6">
                    <div>date: {new Date(order.created_at).toLocaleDateString()}</div>
                    <div>order number: #{order.id}</div>
                    <div>total: ${order.total}</div>
                    <div>items: {getTotalItems(order)}</div>
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
                    <div key={product.id} className="flex flex-row gap-4 mt-2 mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.item.imageUrl}
                        alt={product.item.title}
                        height="auto"
                        width={40}
                      />

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
