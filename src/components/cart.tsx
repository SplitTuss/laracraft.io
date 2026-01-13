import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
import { useAuth } from '@/client-auth/authContext';
import CartItemComponent from './cartItem';

export default function Cart() {
  const { cart } = useCart();
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!authLoading && session === null) {
      toast.info('please sign in to check out');
      router.push('/signin');
    }
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
          <Button onClick={handleCheckout} type="submit">
            checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
