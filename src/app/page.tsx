'use client';
import Link from 'next/link';
import Header from '../components/header';
import { Button } from '@/components/shadcn/Button';

export default function Home() {
  return (
    <>
      <Header />
      <div className="rounded-lg mb-2 h-[450px] sm:h-[600px] bg-[url('https://s3.us-east-1.amazonaws.com/laracraft.io/diamond-paintings/SneakyCatDac.png')] bg-cover bg-center">
        <div className="mx-auto max-w-xs sm:max-w-2xl flex flex-col text-center justify-center">
          <div className="font-extrabold text-primary/70 text-6xl sm:text-8xl mt-10 mb-15">
            Welcome!
          </div>
          <div className="rounded-lg p-2 bg-accent-foreground/70 text-primary mb-4 mt-5 sm:mt-25">
            Look at my{' '}
            <Link href="/diamondArt" className="underline">
              Diamond art
            </Link>
          </div>

          <div>
            <Button className="mb-4 mt-15 sm:mt-35">
              <Link href="/profile" className="flex justify-center">
                Profile page
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-lg mb-2 h-[450px] sm:h-[600px] bg-[url('https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/DogPillow.jpg')] bg-cover bg-center">
        <div className="mx-auto max-w-xs sm:max-w-2xl flex flex-col text-center justify-center">
          <div className="rounded-lg p-2 bg-accent-foreground/40 text-primary mb-4 mt-5 sm:mt-25">
            Buy my{' '}
            <Link href="/crochet" className="underline">
              Crochet stuff
            </Link>{' '}
          </div>
        </div>
      </div>
    </>
  );
}
