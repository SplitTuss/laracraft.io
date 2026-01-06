import { Button } from '@/components/shadcn/Button';
import { useCart, CartItem } from '@/cartContext';

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateCart } = useCart();

  return (
    <div className="border-2 rounded-xl mb-2">
      <div className="flex justify-center font-bold text-lg mb-2">item title</div>
      <div className="flex flex-row justify-center gap-2 mb-2">
        <Button
          size="icon-sm"
          onClick={() => updateCart({ productId: item.productId, quantity: item.quantity - 1 })}
        >
          -
        </Button>
        <div>{item.quantity}</div>
        <Button
          size="icon-sm"
          onClick={() => updateCart({ productId: item.productId, quantity: item.quantity + 1 })}
        >
          +
        </Button>
        <div>$ total</div>
      </div>
    </div>
  );
}
