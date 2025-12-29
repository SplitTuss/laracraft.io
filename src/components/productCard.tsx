import { PlusIcon } from 'lucide-react';
import { Button } from './shadcn/Button';

interface ProductProps {
  //image: [src: imageSource, alt: alt]
  title: string;
  price: number;
  description: string;
}

export default function ProductCard({ title, price, description }: ProductProps) {
  return (
    <li>
      <div className="flex flex-col items-center gap-4 border-2 rounded-xl border-accent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://s3.us-east-1.amazonaws.com/laracraft.io/jamaica-leaf-blanket/finishedBlanket.jpeg"
          alt="jamaica flag with leaf"
          height="auto"
          width={200}
        />
        <div className="flex flex-row gap-4">
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
