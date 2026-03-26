'use client';
import Link from 'next/link';
import Header from '../components/header';
import { Button } from '@/components/shadcn/Button';

export default function Home() {
  return (
    <>
      <Header />

      <div className="rounded-l mb-2 h-[450px] sm:h-[600px] bg-[url('https://s3.us-east-1.amazonaws.com/laracraft.io/crochetItems/DogPillow.jpg')] bg-cover bg-center">
        <div className="mx-auto max-w-xs sm:max-w-2xl flex flex-col text-center justify-center">
          <div className="font-extrabold text-primary/70 text-4xl sm:text-6xl mt-8">Welcome!</div>
          <div className="text-primary-foreground opacity-60 mt-20">
            I am Lara and I like to craft.
          </div>
          <div className="rounded-lg p-2 bg-accent-foreground/50 text-primary mt-5 sm:mt-10">
            <Link href="/crochet" className="underline">
              You can buy some of my crochet stuff here...
            </Link>
          </div>
          <div>
            <Button className="mt-15 sm:mt-35">
              <Link href="/profile" className="flex justify-center">
                Look at your profile page...
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-lg h-[450px] sm:h-[600px] bg-[url('https://s3.us-east-1.amazonaws.com/laracraft.io/diamond-paintings/SneakyCatDac.png')] bg-cover bg-center">
        <div className="mx-auto max-w-xs sm:max-w-2xl flex flex-col text-center justify-center">
          <div className="rounded-lg p-2 bg-accent-foreground/70 text-primary mb-4 mt-5 sm:mt-70">
            <Link href="/diamondArt" className="underline">
              Or look at some of the diamond art I have finished
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
