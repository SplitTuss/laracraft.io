import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/shadcn/Dialog';

interface DiamondArtComponentProps {
  imageUrl: string;
  title: string;
  description: string;
  notes: string;
}

export default function DiamondArtComponent({
  imageUrl,
  title,
  description,
  notes,
}: DiamondArtComponentProps) {
  return (
    <Dialog>
      <div className="mb-8">
        <li className="flex flex-col items-center">
          <DialogTrigger className="hover:cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <div className="font-bold text-2xl text-primary">{title}</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={title}
                height="auto"
                width={300}
                className="p-2 rounded-xl"
              />
              {description}
            </div>
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
          <DialogDescription className="m-6">{description}</DialogDescription>
          <div className="flex text-center w-full sm:w-2/3">{notes}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
