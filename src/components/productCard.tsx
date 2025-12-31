import { PlusIcon } from 'lucide-react';
import { Button } from './shadcn/Button';

interface ProductProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  price: number;
  description: string;
}

export default function ProductCard({
  imageUrl,
  imageAlt,
  title,
  price,
  description,
}: ProductProps) {
  return (
    <li className="m-2 h-full flex">
      <div className="flex flex-col items-center h-full w-full gap-4 border-2 rounded-xl border-accent">
        <div className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={imageAlt} height="auto" width={200} className="p-2" />
        </div>

        <div className="flex flex-col gap-4 text-xl">
          <div className="text-center font-bold">{title}</div>
          <div className="m-4">{description}</div>
        </div>

        <div className="flex flex-row mt-auto mb-2">
          <Button size="icon-sm" className="">
            <PlusIcon />
          </Button>
          <div className="justify-end">{price}</div>
        </div>
      </div>
    </li>
  );
}
