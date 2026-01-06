import { PlusIcon } from 'lucide-react';
import { Button } from './shadcn/Button';
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
    <li className="m-2 h-full flex border-2 rounded-xl border-accent">
      <div className="flex flex-col items-center w-full">
        <div className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} height="auto" width={200} className="p-2" />
        </div>

        <div className="flex flex-col grid-rows-1 gap-4 text-xl">
          <div className="text-center font-bold">{title}</div>
          <div className="m-4">{description}</div>
        </div>

        <div className="flex flex-row w-full relative justify-center mt-auto mb-2">
          <Button
            onClick={() => updateCart({ productId: productId, quantity: existingQuantity + 1 })}
            size="icon-sm"
            className="hover:cursor-pointer"
          >
            <PlusIcon />
          </Button>
          <div className="absolute right-6">${price}</div>
        </div>
      </div>
    </li>
  );
}
