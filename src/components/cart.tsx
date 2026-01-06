import { ShoppingCartIcon } from 'lucide-react';

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
import CartItem from './cartItem';

export default function Cart() {
  const { cart } = useCart();

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
          <CartItem key={item.productId} item={item} />
        ))}

        <DialogFooter>
          <Button type="submit">checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
