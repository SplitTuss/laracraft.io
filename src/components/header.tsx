import { ShoppingCartIcon, UserIcon, BookTextIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './shadcn/Button';

export default function Header() {
  return (
    <div className="grid grid-cols-5 bg-accent p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/favicon.ico" alt="laracraft.io logo" className="col-span-1 w-20 h-20 rounded-lg" />

      <Link href="/" className="col-span-3 mt-6 text-xl sm:text-3xl text-center text-primary">
        laracraft.io
      </Link>

      <div className="col-span-1 flex flex-row flex-wrap justify-end gap-2 mt-7">
        <Button className="hover:cursor-pointer" size="icon-sm">
          <Link href="/profile" className="hover:text-primary">
            <UserIcon />
          </Link>
        </Button>
        <Button className="hover:cursor-pointer" size="icon-sm">
          <Link href="/orders" className="hover:text-primary">
            <BookTextIcon />
          </Link>
        </Button>
        <Button className="hover:cursor-pointer" size="icon-sm">
          <ShoppingCartIcon />
        </Button>
      </div>
    </div>
  );
}
