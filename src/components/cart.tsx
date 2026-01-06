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

export default function Cart() {
  const { cart, updateCart } = useCart();

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
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="border-2 rounded-xl mb-2">
              <div className="flex justify-center font-bold text-lg mb-2">item title</div>
              <div className="flex flex-row justify-center gap-2 mb-2">
                <Button
                  size="icon-sm"
                  onClick={() =>
                    updateCart({ productId: item.productId, quantity: item.quantity - 1 })
                  }
                >
                  -
                </Button>
                <div>amount</div>
                <Button
                  size="icon-sm"
                  onClick={() =>
                    updateCart({ productId: item.productId, quantity: item.quantity + 1 })
                  }
                >
                  +
                </Button>
                <div>$ total</div>
              </div>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button type="submit">checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
