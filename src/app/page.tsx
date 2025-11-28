import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <h1 className="flex justify-center text-2xl text-primary mt-4">welcome to laracraft.io</h1>
      <div className="flex flex-col items-center mt-4 gap-2">
        <Link href="/signin" className="underline hover:text-primary">
          go to signin
        </Link>
        <Link href="/signup" className="underline hover:text-primary">
          go to signup
        </Link>
        <Link href="/profile" className="underline hover:text-primary">
          go to profile page
        </Link>
      </div>
    </div>
  );
}
