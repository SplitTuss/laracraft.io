import { useState, useEffect } from 'react';
import { Button } from '@/components/shadcn/Button';
import { useCart, CartItem } from '@/cartContext';
import { ProductData } from '@/app/page';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/Select';

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
  }, []);

  if (!product) {
    return <div>loading...</div>;
  }

  const itemTotal = product?.price * item.quantity;

  return (
    <div className="border-2 rounded-lg">
      <div className="flex justify-center font-bold text-lg">{product.title}</div>
      <div className="flex flex-row items-center justify-between m-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.title} height="auto" width={50} />
        <div className="flex flex-row justify-center items-center gap-2">
          <Button
            size="icon-sm"
            onClick={() => updateCart({ productId: item.productId, quantity: item.quantity - 1 })}
          >
            -
          </Button>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={item.quantity} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="13">13</SelectItem>
              <SelectItem value="14">14</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="17">17</SelectItem>
              <SelectItem value="18">18</SelectItem>
              <SelectItem value="19">19</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="icon-sm"
            onClick={() => updateCart({ productId: item.productId, quantity: item.quantity + 1 })}
          >
            +
          </Button>
        </div>
        <div className="mr-2">$ {itemTotal}</div>
      </div>
    </div>
  );
}
