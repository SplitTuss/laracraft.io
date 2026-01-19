import { useState, useEffect } from 'react';
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
import { ProductData } from '@/app/page';

export default function Cart() {
  const { cart } = useCart();
  const router = useRouter();
  const [productList, setProductList] = useState<Array<ProductData>>([]);

  const handleLoadProducts = async () => {
    const result = await fetch(`/api/products/`);

    if (!result.ok) {
      console.log('product not ok');
      return;
    }

    const data = await result.json();

    setProductList(data);
  };

  useEffect(() => {
    handleLoadProducts();
  }, []);

  let cartTotal = 0;

  cart.forEach((item) => {
    const product = productList.find((product) => {
      return item.productId === product.id;
    });
    if (!product) return;

    cartTotal += item.quantity * product.price;
  });

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

        {cart.map((item) => {
          const foundProduct = productList.find((product) => {
            return item.productId === product.id;
          });
          if (!foundProduct) return;

          return <CartItemComponent key={item.productId} item={{ ...item, ...foundProduct }} />;
        })}

        <DialogFooter>
          <div>total $ {cartTotal}</div>
          <Button onClick={() => router.push('/checkout')} type="submit">
            checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
