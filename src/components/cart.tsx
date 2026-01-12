import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './shadcn/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/Dialog';
import { useCart } from '@/cartContext';
import { useState } from 'react';
import { supabase } from '@/client-auth/supabase-client';
import { useAuth } from '@/client-auth/authContext';
import CartItemComponent from './cartItem';

export default function Cart() {
  const { cart } = useCart();
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();
  const [newOrder, setNewOrder] = useState({
    quantity: '',
    productId: '',
  });

  // i want to be able to see the cart.quantity for each item.

  //OrderID is an object with userID, orderId number and CartItem: item id, item total
  const AddOrderFunction = async () => {
    const { error } = await supabase.from('order_products').insert(newOrder);
    if (!authLoading && session === null) {
      router.push('/signin');
    }
    if (error) {
      console.log('an error occured adding the order:', error.message);
    }
    setNewOrder({ quantity: '', productId: '4' });
    console.log(newOrder);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer" size="icon-sm">
          <ShoppingCartIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-2xl font-bold">
            Your shopping cart
          </DialogTitle>
        </DialogHeader>

        {cart.map((item) => (
          <CartItemComponent key={item.productId} item={item} />
        ))}

        <DialogFooter>
          <Button onClick={AddOrderFunction} type="submit">
            checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
