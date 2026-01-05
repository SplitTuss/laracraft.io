import { ShoppingCartIcon } from 'lucide-react';

import { Button } from './shadcn/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/Dialog';

export default function Cart() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer" size="icon-sm">
          <ShoppingCartIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-2xl font-bold">
            Your shopping cart
          </DialogTitle>
        </DialogHeader>
        <ul>
          <li>
            <div className="flex justify-center font-bold text-lg">item title</div>
            <div className="flex flex-row justify-center gap-2">
              <Button>-</Button>
              <div>amount</div>
              <Button>+</Button>
              <div>$ total</div>
            </div>
          </li>
          <li>
            <div className="flex justify-center font-bold text-lg">item title</div>
            <div className="flex flex-row justify-center gap-2">
              <Button>-</Button>
              <div>amount</div>
              <Button>+</Button>
              <div>$ total</div>
            </div>
          </li>
        </ul>
        <DialogFooter>
          <Button type="submit">checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
