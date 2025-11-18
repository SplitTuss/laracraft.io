import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center text-2xl mt-4">homepage coming soon...</h1>
      <Link href="/signin">go to signin</Link>
      <br></br>
      <Link href="/signup">go to signup</Link>
      <br></br>
      <Link href="/profile">go to profile page</Link>
    </>
  );
}
