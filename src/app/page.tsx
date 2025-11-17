import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center">homepage coming soon...</h1>
      <Link href="/login">go to login</Link>
      <br></br>
      <Link href="/signup">go to signup</Link>
      <br></br>
      <Link href="/dashboard">go to dashboard</Link>
    </>
  );
}
