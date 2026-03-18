import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/shadcn/Dialog';

interface DiamondArtComponentProps {
  productId: number;
  imageUrl: string;
  title: string;
  description: string;
  notes: string;
}

export default function DiamondArtComponent({
  productId,
  imageUrl,
  title,
  description,
  notes,
}: DiamondArtComponentProps) {
  return (
    <Dialog>
      <div className="m-2">
        <li className="h-full flex flex-col items-center border-2 rounded-xl border-accent bg-accent/40">
          <DialogTrigger className="hover:cursor-pointer">
            <div className="h-55 sm:h-68 flex items-center justify-center m-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={title}
                height="auto"
                width={200}
                className="p-2 rounded-2xl"
              />
              {description}
            </div>

            <div className="font-bold text-xl text-primary">{title}</div>
          </DialogTrigger>
        </li>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-center text-2xl font-bold">{title}</div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} height="auto" width={300} className="p-2 rounded-2xl" />
          <DialogDescription className="m-6">
            {description} {notes}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}
