import { PlusIcon } from 'lucide-react';
import { Button } from './shadcn/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/shadcn/Dialog';
import { useCart } from '@/cartContext';

interface ProductProps {
  productId: number;
  imageUrl: string;
  title: string;
  price: number;
  description: string;
}

export default function ProductCard({
  productId,
  imageUrl,
  title,
  price,
  description,
}: ProductProps) {
  const { cart, updateCart } = useCart();

  const existingQuantity = cart.find((cartItem) => productId === cartItem.productId)?.quantity ?? 0;

  return (
    <Dialog>
      <div className="m-2">
        <li className="h-full flex flex-col items-center border-2 rounded-xl border-accent">
          <DialogTrigger className="hover:cursor-pointer">
            <div className="h-55 sm:h-68 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={title} height="auto" width={200} className="p-2" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-bold text-xl text-primary">{title}</div>
              <div className="m-2">{description}</div>
              <div className="flex justify-end mr-4">${price}</div>
            </div>
          </DialogTrigger>
          <Button
            onClick={() => updateCart({ productId: productId, quantity: existingQuantity + 1 })}
            size="icon-sm"
            className="hover:cursor-pointer mb-2"
          >
            <PlusIcon />
          </Button>
        </li>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-center text-2xl font-bold">{title}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} height="auto" width={200} className="p-2" />
          <DialogDescription>
            <div className="text-center m-4">{description}</div>
          </DialogDescription>
          <div className="flex flex-row w-full relative justify-center mt-auto">
            <Button
              onClick={() => updateCart({ productId: productId, quantity: existingQuantity + 1 })}
              size="icon-sm"
              className="hover:cursor-pointer"
            >
              <PlusIcon />
            </Button>
            <div className="absolute right-6">$ {price}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
