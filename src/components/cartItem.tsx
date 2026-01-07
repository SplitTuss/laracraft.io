import { useState, useEffect } from 'react';
import { Button } from '@/components/shadcn/Button';
import { useCart, CartItem } from '@/cartContext';
import { ProductData } from '@/app/page';

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const { updateCart } = useCart();

  const [product, setProduct] = useState<ProductData>();

  const handleLoadProduct = async () => {
    const result = await fetch(`/api/products/${item.productId}`);

    if (!result.ok) {
      console.log('product not ok');
      return;
    }

    const data = await result.json();
    setProduct(data);
  };

  useEffect(() => {
    handleLoadProduct();
  });

  if (!product) {
    return <div>loading...</div>;
  }

  return (
    <div className="border-2 rounded-xl mb-2">
      <div className="flex justify-center font-bold text-lg mb-2">{product.title}</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.imageUrl} alt={product.title} height="auto" width={40} />
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
        <div>$ {product.price}</div>
      </div>
    </div>
  );
}
