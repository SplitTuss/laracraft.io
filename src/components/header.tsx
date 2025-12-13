import { ShoppingCartIcon, UserIcon, BookTextIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './shadcn/Button';

export default function Header() {
  return (
    <div className="bg-accent p-2">
      <h1 className="flex justify-center text-2xl text-primary bg-accent">
        welcome to laracraft.io
      </h1>
      <div className="flex flex-row gap-2 justify-end">
        <Button className="hover:cursor-pointer">
          <Link href="/profile" className="underline hover:text-primary">
            <UserIcon />
          </Link>
        </Button>
        <Button className="hover:cursor-pointer">
          <Link href="/orders" className="underline hover:text-primary">
            <BookTextIcon />
          </Link>
        </Button>
        <Button className="hover:cursor-pointer">
          <ShoppingCartIcon />
        </Button>
      </div>
    </div>
  );
}
