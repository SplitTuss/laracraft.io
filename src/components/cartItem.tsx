import { Button } from '@/components/shadcn/Button';
import { useCart, CartItem } from '@/cartContext';
import { ProductData } from '@/app/crochet/page';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/Select';

interface CartItemProps {
  item: CartItem & ProductData;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateCart } = useCart();

  const itemTotal = item.price * item.quantity;

  return (
    <div className="border-2 rounded-lg">
      <div className="flex justify-center font-bold text-lg mt-2">{item.title}</div>
      <div className="grid grid-cols-3 items-center m-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          height="auto"
          width={50}
          className="m-2 rounded-sm"
        />
        <div className="flex flex-row justify-center items-center gap-2">
          <Button
            size="icon-sm"
            title="remove one"
            onClick={() => updateCart({ productId: item.productId, quantity: item.quantity - 1 })}
          >
            -
          </Button>

          <Select
            onValueChange={(newValue) => {
              updateCart({ productId: item.productId, quantity: Number(newValue) });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={item.quantity} />
            </SelectTrigger>
            <SelectContent>
              {[...Array(20)].map((_, index) => (
                <SelectItem key={index} value={`${index + 1}`}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="icon-sm"
            title="add more"
            onClick={() => updateCart({ productId: item.productId, quantity: item.quantity + 1 })}
          >
            +
          </Button>
        </div>
        <div className="flex justify-end mr-6">$ {itemTotal}</div>
      </div>
    </div>
  );
}
