import { UserIcon, BookTextIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './shadcn/Button';
import Cart from './cart';

export default function Header() {
  return (
    <div className="flex flex-row justify-between bg-accent p-2 h-25">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/favicon.ico" alt="laracraft.io logo" className="w-20 h-20 rounded-lg" />
      </div>

      <div className="mt-6 text-center text-3xl text-primary">
        <Link href="/">laracraft.io</Link>
      </div>

      <div className="flex flex-row gap-2 mt-8">
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
        <Cart />
      </div>
    </div>
  );
}
