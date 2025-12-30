import { PlusIcon } from 'lucide-react';
import { Button } from './shadcn/Button';

interface ProductProps {
  image: { imageSource: string; alt: string };
  title: string;
  price: number;
  description: string;
}

export default function ProductCard({
  image: { imageSource, alt },
  title,
  price,
  description,
}: ProductProps) {
  return (
    <li className="mb-2">
      <div className="flex flex-col items-center gap-4 border-2 rounded-xl border-accent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSource} alt={alt} height="auto" width={200} />
        <div className="flex flex-row gap-4 text-xl">
          <div className="font-bold">{title}</div>
          <div className="">{price}</div>
        </div>
        <div>{description}</div>

        <Button size="icon-sm">
          <PlusIcon />
        </Button>
      </div>
    </li>
  );
}
