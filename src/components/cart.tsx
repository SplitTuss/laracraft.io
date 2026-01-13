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
import CartItemComponent from './cartItem';

export default function Cart() {
  const { cart } = useCart();
  const router = useRouter();

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
          <Button onClick={() => router.push('/checkout')} type="submit">
            checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
