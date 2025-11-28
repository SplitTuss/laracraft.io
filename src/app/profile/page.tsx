'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/shadcn/Button';
import { useAuth } from '@/client-auth/authContext';

export default function ProfilePage() {
  const { session, loading, signout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('profile page', { session });
    if (!loading && session === null) {
      router.push('/signin');
    }
  }, [session, loading, router]);

  const handleLogout = async () => {
    await signout();
    console.log('logging out...');
  };

  return (
    <div className="flex flex-col items-center text-2xl mt-4">
      <h1 className="text-2xl text-primary">Profile page</h1>
      <br></br>
      <h2>Welcome, {session?.user?.email}</h2>
      <Button onClick={handleLogout}>logout</Button>
      <br></br>
      <Link href="/" className="underline">
        go home!
      </Link>
    </div>
  );
}
